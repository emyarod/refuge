import React from 'react';
import * as firebase from 'firebase';
import { config } from '../../config';
import Note from './Note';
import './Layout.scss';

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: [],
    };
  }

  componentDidMount() {
    firebase.initializeApp(config);
    const notesRef = firebase.database().ref('notes');
    notesRef.on('child_added', snapshot => {
      // name object key after note title, assign note content to keyvalue
      const { content, title } = snapshot.val();
      const note = {};
      note[title] = content;

      // update state
      const newState = this.state.notes;
      newState.unshift(note);
      this.setState(newState)
    });
  }

  render() {
    return (
      <div className="notes">
        {this.state.notes.map((note, index) => {
          const [title] = Object.keys(note);
          return (
            <Note key={`note${index}`} title={title} content={note[title]} />
          );
        })}
      </div>
    );
  }
}
