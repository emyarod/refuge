import React from 'react';
import noteRepository from '../../data/NoteRepository';
import './UpdateModal.scss';

export default class UpdateModal extends React.Component {
  constructor() {
    super();
    this.state = {
      show: true,
      animating: true,
    };
  }

  dismissModal() {
    this.setState({ show: false, animating: true });
  }

  remove() {
    noteRepository.remove(this.props.note, err => {
      // TODO: inform user
      if (err) throw err;
      this.dismissModal();
    });
  }

  // passes new note info to noteRepository `update` method
  update(e) {
    e.preventDefault();
    const { note: { key } } = this.props;
    const title = this.state.title
      ? this.state.title
      : this.props.note.title;
    const content = this.state.content
      ? this.state.content
      : this.props.note.content;
    noteRepository.update({ key, title, content }, err => {
      // TODO: inform user
      if (err) throw err;
      this.dismissModal();
    });
  }

  // modifies state while a note is being edited
  handleChange(e) {
    const property = {};
    const propName = e.target.name;
    property[propName] = e.target.value;
    this.setState(property);
  }

  modal(className) {
    return (
      <div
        className={`backdrop modal-transition ${className}`}
        onClick={() => this.dismissModal()}
      >
        <form
          className="edit-note"
          onSubmit={e => this.update(e)}
          onClick={e => e.stopPropagation()}
        >
          <input
            name="title"
            defaultValue={this.props.note.title}
            placeholder="Title"
            onChange={e => this.handleChange(e)}
          />
          <textarea
            name="content"
            defaultValue={this.props.note.content}
            placeholder="Text goes here..."
            rows={8}
            onChange={e => this.handleChange(e)}
          >
          </textarea>
          <button type="button" onClick={() => this.remove()}>
            <i className="fa fa-trash-o" aria-hidden></i>
          </button>
          <button type="submit">Done</button>
        </form>
      </div>
    );
  }

  componentDidMount() {
    this.setState({ animating: false });
  }

  componentDidUpdate() {
    if (!this.state.show && this.state.animating) {
      window.setTimeout(() => {
        this.setState({ animating: false });

        // callback to set `App.state.modal` to `false`
        this.props.onDismiss();
      }, 300);
    }
  }

  render() {
    if (this.state.show && this.state.animating) {
      return this.modal('modal-enter');
    } else if (this.state.show && !this.state.animating) {
      return this.modal('');
    } else if (!this.state.show && this.state.animating) {
      return this.modal('modal-exit');
    }

    return null;
  }
}
