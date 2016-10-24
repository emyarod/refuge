import React from 'react';
import * as firebase from 'firebase';
import { config } from '../../config';
import Note from './Note';

export default class Index extends React.Component {
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

      // name object key after note title, assign note text to value
      note[key] = value;
      this.state.notes.unshift(note);
    });


    const rootRef = firebase.database().ref().child('react');
    const speedRef = rootRef.child('speed');
    speedRef.on('value', snap => {
      this.setState({
        speed: snap.val(),
      });
    });
  }

  // render() {
  //   return (
  //     <div>
  //       <ol>
  //         {/* iterate over notes array */}
  //         {this.state.notes.map((note, index) => {
  //           return (
  //             <li key={`note${index}`}>
  //               <pre>{note}</pre>
  //             </li>
  //           );
  //         })}
  //       </ol>
  //     </div>
  //   );
  // }

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