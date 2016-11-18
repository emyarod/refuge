import React from 'react';
import NoteForm from '../notes/NoteForm';
import NotesWrapper from '../notes/NotesWrapper';
import UpdateModal from '../notes/UpdateModal';

export default class Notes extends React.Component {
  constructor() {
    super();
    this.state = { modal: false, };
  }

  dismissModal() { this.setState({ modal: false, }); }

  displayModal(note) { this.setState({ modal: true, note, }); }

  render() {
    return (
      <div style={{ marginTop: '65px' }}>
        <NoteForm alertHandler={alert => this.props.alertHandler(alert)} />
        <NotesWrapper
          alertHandler={alert => this.props.alertHandler(alert)}
          modalHandler={note => this.displayModal(note)}
        />
        {this.state.modal
          ? <UpdateModal
              alertHandler={alert => this.props.alertHandler(alert)}
              note={this.state.note}
              onDismiss={() => this.dismissModal()}
            />
          : null}
      </div>
    );
  }
}
