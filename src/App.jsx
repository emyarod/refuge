import React from 'react';
// import logo from './logo.svg';
import './App.scss';
import NoteForm from './components/notes/NoteForm';
import Notes from './components/notes/Layout';
import UpdateModal from './components/notes/UpdateModal';
import './components/notes/UpdateModal.scss';

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

  render() {
    return (
      <div>
        <NoteForm />
        <Notes modalHandler={note => this.displayModal(note)} />
        {this.state.modal
          ? <UpdateModal
              note={this.state.note}
              onDismiss={() => this.dismissModal()}
            />
          : null}
      </div>
    );
  }
}

// export default function App() {
//   return (
//     <div>
//       <NoteForm />
//       <Notes />
//       <UpdateModal note={{ title: 'test', content: 'lorem ipsum' }} show />
//     </div>
//   );
// }
