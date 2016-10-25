import React from 'react';
// import logo from './logo.svg';
import './App.scss';
import NoteForm from './components/notes/NoteForm';
import Notes from './components/notes/Layout';

export default function App() {
  return (
    <div>
      <NoteForm />
      <Notes />
    </div>
  );
}
