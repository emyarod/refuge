import React from 'react';
import './NoteForm.scss';
import noteRepository from '../../data/NoteRepository';

// Class for note creation form
export default class NoteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
    };
  }

  /**
   * Update state with data from form
   */
  handleChange(e) {
    const { target: { name: key } } = e;
    const newState = {};
    newState[key] = e.target.value;
    this.setState(newState)
  }

  /**
   * Add a new note to the database, then reset state
   * @param {Object} e - Proxy object
   */
  createNote(e) {
    e.preventDefault();
    const { title, content } = this.state;
    if (title.trim() || content.trim()) {
      noteRepository.create({ title, content }, err => {
        if (err) return this.props.alertHandler({
          type: 'error',
          message: 'Failed to create note',
        });

        // reset state to initial values
        this.setState({ title: '', content: '' });

        return this.props.alertHandler({
          type: 'success',
          message: 'Note successfully created',
        });
      });
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
          onChange={(e) => this.handleChange(e)}
        >
        </textarea>
        <button type="submit">+</button>
      </form>
    );
  }
}
