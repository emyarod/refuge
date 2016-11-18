import React from 'react';
import Masonry from 'masonry-layout';
import Note from './Note';
import './NotesWrapper.scss';
import noteRepository from '../../data/NoteRepository';

export default class NotesWrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      masonry: {},
    };
  }

  selectNote(note) { return this.props.modalHandler(note); }

  componentDidMount() {
    /**
     * TODO: update description
     * https://facebook.github.io/react/docs/refs-and-the-dom.html
     *
     * Masonry is initialized here because it needs the name of the DOM element
     * that will be turned into a Masonry grid.
     * This data comes from the ref callback attribute
     */
    this.setState({
      masonry: new Masonry(this.refs.notes, {
        itemSelector: '.note',
        columnWidth: 240,
        gutter: 16,
        fitWidth: true,
      }),
    });

    noteRepository.on('added', note => {
      // update state
      const notes = this.state.notes.slice(0);
      notes.unshift(note);
      this.setState({ ...this.state, notes });
      this.state.masonry.reloadItems();
      this.state.masonry.layout();
    });

    noteRepository.on('changed', ({ key, title, content }) => {
      const notes = this.state.notes.slice(0);
      const outdatedNote = noteRepository.find(notes, key);
      outdatedNote.title = title;
      outdatedNote.content = content;
      this.setState({ ...this.state, notes });
    });

    noteRepository.on('removed', ({ key }) => {
      const noteToRemove = noteRepository.find(this.state.notes, key);
      const notes = this.state.notes.filter(note => note !== noteToRemove);
      this.setState({ ...this.state, notes });
    })
  }

  componentDidUpdate() {
    // lay out items again after changes
    this.state.masonry.reloadItems();
    this.state.masonry.layout();
  }

  render() {
    return (
      <div className="notes" ref="notes">
        {this.state.notes.map(({ key, title, content }) => {
          return (
            <Note
              key={key}
              id={key}
              title={title}
              content={content}
              clickHandler={() => this.selectNote({ key, title, content })}
              alertHandler={alert => this.props.alertHandler(alert)}
            />
          );
        })}
      </div>
    );
  }
}
