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

  handleAlert(alert) { this.refs.alerts.addAlert(alert) }

  // FIXME: hard code alert to test
  componentDidMount() {
    const alerts = [
      {
        type: 'success',
        message: 'Note successfully created',
      },
      {
        type: 'error',
        message: 'Failed to create note',
      }
    ];

    alerts.forEach(alert => setTimeout(() => this.handleAlert(alert), 1000));
  }

  render() {
    return (
      <div>
        <AlertsWrapper ref="alerts" />
        <NoteForm alertHandler={alert => this.handleAlert(alert)} />
        <NotesWrapper
          alertHandler={alert => this.handleAlert(alert)}
          modalHandler={note => this.displayModal(note)}
        />
        {this.state.modal
          ? <UpdateModal
              alertHandler={alert => this.handleAlert(alert)}
              note={this.state.note}
              onDismiss={() => this.dismissModal()}
            />
          : null}
      </div>
    );
  }
}
