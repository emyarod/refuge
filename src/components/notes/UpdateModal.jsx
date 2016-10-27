import React from 'react';
import noteRepository from '../../data/NoteRepository';

export default class UpdateModal extends React.Component {
  constructor() {
    super();
    this.state = {
      show: true,
      animating: true,
    };
  }

  remove() {
    noteRepository.remove(this.props.note, err => {
      // TODO: inform user
      if (err) throw err;
      this.dismissModal();
    });
  }

  update(e) {
    e.preventDefault();
    // console.log(this.props);
    // noteRepository.update(this.props, err => {
    //   // TODO: inform user
    //   if (err) throw err;
    //   this.dismissModal();
    // });

    console.log('update');
  }

  modal(className) {
    return (
      <div className={`backdrop modal-transition ${className}`} onClick={() => this.dismissModal()}>
        <form
          className="edit-note"
          onSubmit={(e) => this.update(e)}
          onClick={(e) => e.stopPropagation()}
        >
        <input name="title" defaultValue={this.props.note.title} placeholder="Title" />
        <textarea
          name="content"
          defaultValue={this.props.note.content}
          placeholder="Text goes here..."
          rows={8}
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

  dismissModal() {
    this.setState({ show: false, animating: true });
  }

  componentDidMount() {
    this.setState({ animating: false });
  }

  componentDidUpdate() {
    if (!this.state.show && this.state.animating) {
      window.setTimeout(() => this.setState({ animating: false }), 300);
    }
  }

  render() {
    if (this.state.show && this.state.animating) {
      return this.modal('modal-enter');
    } else if (this.state.show && !this.state.animating) {
      return this.modal('');
    } else if (!this.state.show && this.state.animating) {
      return this.modal('modal-leave');
    }

    return null;
  }
}
