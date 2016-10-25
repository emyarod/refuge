import React from 'react';
import './NoteForm.scss';
import noteRepository from '../../data/NoteRepository';

export default class NoteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
    };
  }

  // update state with data from form
  handleChange(e) {
    const { target: { name: key } } = e;
    const newState = {};
    newState[key] = e.target.value;
    this.setState(newState)
  }

  // add new note to database, then reset state to initial value
  createNote(e) {
    e.preventDefault();
    const { title, content } = this.state;
    if (title.trim() || content.trim()) {
      noteRepository.create({ title, content }, err => {
        // TODO: inform user
        if (err) throw err;

        // reset state to initial values
        this.setState({
          title: '',
          content: '',
        });
      })
      // // push new note to firebase database
      // const notesRef = firebase.database().ref('notes');
      // const newNoteRef = notesRef.push();
      // newNoteRef.set({
      //   title,
      //   content,
      // });
      //
      // // reset state to initial values
      // this.setState({
      //   title: '',
      //   content: '',
      // });
    }
  }

  render() {
    return (
      <form className="create-note" onSubmit={(e) => this.createNote(e)}>
        <input
          name="title"
          value={this.state.title}
          placeholder="Title"
          onChange={(e) => this.handleChange(e)}
        />
        <textarea
          name="content"
          value={this.state.content}
          placeholder="Text goes here..."
          rows={3}
          onChange={(e) => this.handleChange(e)}>
        </textarea>
        <button type="submit">+</button>
      </form>
    );
  }
}
