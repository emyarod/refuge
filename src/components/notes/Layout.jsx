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
      const { title, content } = snapshot.val();
      const id = snapshot.W.path.o.join('');
      const note = { title, content, id };

      // update state
      const newState = this.state.notes;
      newState.unshift(note);
      this.setState(newState)
    });
  }

  render() {
    return (
      <div className="notes">
        {this.state.notes.map(({ title, content, id }) => {
          return <Note key={id} title={title} content={content} />;
        })}
      </div>
    );
  }
}
