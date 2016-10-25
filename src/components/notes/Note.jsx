import React from 'react';
import './Note.scss';
import noteRepository from '../../data/NoteRepository';

export default function Note({ title, content }) {
  return (
    <div className="note">
      <h1>{title}</h1>
      <pre>{content}</pre>
    </div>
  );
}
