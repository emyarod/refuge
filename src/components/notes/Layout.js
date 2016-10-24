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
    const notesRef = firebase.database().ref().child('notes');
    notesRef.on('child_added', snapshot => {
      const { key } = snapshot;
      const value = snapshot.val();
      const note = {};

      // name object key after note title, assign note body to keyvalue
      note[key] = value;
      this.state.notes.unshift(note);
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
