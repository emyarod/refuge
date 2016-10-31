import React from 'react';
// import logo from './logo.svg';
import './App.scss';
import NoteForm from './components/notes/NoteForm';
import NotesWrapper from './components/notes/NotesWrapper';
import UpdateModal from './components/notes/UpdateModal';
import AlertsWrapper from './components/AlertsWrapper';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      modal: false,
    };
  }

  dismissModal() {
    this.setState({ modal: false, });
  }

  displayModal(note) {
    this.setState({ modal: true, note, });
  }

  handleAlert(alert) {
    this.refs.alerts.addAlert(alert)
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
