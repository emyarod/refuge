import React, { Component } from 'react';
import firebase from 'firebase';
// import logo from './logo.svg';
import './App.scss';
import NoteForm from './components/notes/NoteForm';
import Notes from './components/notes/Layout';

class App extends Component {
  render() {
    return (
      <div>
        <NoteForm />
        <Notes />
      </div>
    );
  }
}

export default App;
