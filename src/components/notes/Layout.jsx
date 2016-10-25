import React from 'react';
import firebase from 'firebase';
import Masonry from 'masonry-layout';
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
      this.setState(newState);
    });
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
        {this.state.notes.map(({ title, content, id }) => {
          return <Note key={id} title={title} content={content} />;
        })}
      </div>
    );
  }
}
