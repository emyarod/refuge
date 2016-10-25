import React from 'react';
import Masonry from 'masonry-layout';
import Note from './Note';
import './Layout.scss';
import noteRepository from '../../data/NoteRepository';

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: [],
    };
  }

  componentDidMount() {
    noteRepository.on('added', note => {
      // update state
      const newState = this.state.notes;
      newState.unshift(note);
      this.setState(newState);
    });

    noteRepository.on('changed', ({ key, title, content }) => {
      const newState = this.state.notes;
      const outdatedNote = noteRepository.find(newState, key);
      outdatedNote.title = title;
      outdatedNote.content = content;
      this.setState(newState);
    });

    noteRepository.on('removed', ({ key }) => {
      const newState = this.state.notes;
      const noteToRemove = noteRepository.find(newState, key);
      newState.splice(noteToRemove);
      this.setState(newState);
    })

    // firebase.initializeApp(config);
    // const notesRef = firebase.database().ref('notes');
    // notesRef.on('child_added', snapshot => {
    //   const { title, content } = snapshot.val();
    //   const id = snapshot.W.path.o.join('');
    //   const note = { title, content, id };
    //
    //   // update state
    //   const newState = this.state.notes;
    //   newState.unshift(note);
    //   this.setState(newState);
    // });
  }

  componentDidUpdate() {
    const masonry = new Masonry(this.refs.notes, {
      itemSelector: '.note',
      columnWidth: 240,
      gutter: 16,
      fitWidth: true,
    });

    masonry.reloadItems();
    masonry.layout();
  }

  render() {
    return (
      <div className="notes" ref="notes">
        {this.state.notes.map(({ title, content, key }) => {
          return <Note key={key} title={title} content={content} />;
        })}
      </div>
    );
  }
}
