import firebase from 'firebase';
import EventEmitter from 'events';
import { config } from '../config';

/**
 * extend EventEmitter so user of NoteRepository can react to
 * our custom events (ex: noteRepository.on('added'))
 */
class NoteRepository extends EventEmitter {
  constructor() {
    super();

    // Initialize Firebase
    firebase.initializeApp(config);

    // Firebase database reference to notes
    this.ref = firebase.database().ref('users');
    this.attachFirebaseListeners();
  }

  // get unique id for Firebase user
  getUID() {
    return firebase.auth().currentUser.uid;
  }

  // get user's notes ref
  getNotesRef() {
    return this.ref.child(`${this.getUID()}/notes`);
  }

  // creates a note
  create({ title = '', content = '', }, onComplete) {
    this.getNotesRef().push({ title, content }, onComplete);
  }

  // updates a note
  update({ key, title = '', content = '' }, onComplete) {
    this.getNotesRef().child(key).update({ title, content }, onComplete);
  }

  // removes a note
  remove(note, onComplete) {
    const key = note.id || note.key;
    this.getNotesRef().child(key).remove(onComplete);
  }

  // Finds the index of the note inside the 'notes' array by looking for its key
  findIndex(notes, key) {
    return notes.findIndex(note => note.key === key);
  }

  // Finds the note inside the 'notes' array by searching for its key
  find(notes, key) {
    return notes.find(note => note.key === key);
  }

  // process snapshot data and add unique Firebase key to each note
  snapshotToNote(snapshot) {
    const { key } = snapshot;
    const note = { ...snapshot.val(), key };
    return note;
  }

  /**
   * The event listeners process the data passed through from
   * the Firebase DataSnapshots and then propagate the events outward
   */
  onAdded(snapshot) {
    const note = this.snapshotToNote(snapshot);
    this.emit('added', note);
  }

  onRemoved(oldSnapshot) {
    const note = this.snapshotToNote(oldSnapshot);
    this.emit('removed', note);
  }

  onChanged(snapshot) {
    const note = this.snapshotToNote(snapshot);
    this.emit('changed', note);
  }

  // attach event listeners to Firebase
  attachFirebaseListeners() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.getNotesRef().on('child_added', this.onAdded, this);
        this.getNotesRef().on('child_removed', this.onRemoved, this);
        this.getNotesRef().on('child_changed', this.onChanged, this);
      }
    });
  }

  // detach listeners from Firebase
  detachFirebaseListeners() {
    this.getNotesRef().off('child_added', this.onAdded, this);
    this.getNotesRef().off('child_removed', this.onRemoved, this);
    this.getNotesRef().off('child_changed', this.onChanged, this);
  }
}

export default new NoteRepository();
