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
    this.ref = firebase.database().ref('notes');
    this.attachFirebaseListeners();
  }

  // creates a note
  create({ title = '', content = '', }, onComplete) {
    this.ref.push({ title, content }, onComplete);
  }

  // updates a note
  update({ key, title = '', content = '' }, onComplete) {
    this.ref.child(key).update({ title, content }, onComplete);
  }

  remove({ key }, onComplete) {
    this.ref.child(key).remove(onComplete);
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
    this.ref.on('child_added', this.onAdded, this);
    this.ref.on('child_removed', this.onRemoved, this);
    this.ref.on('child_changed', this.onChanged, this);
  }
}

export default new NoteRepository();
