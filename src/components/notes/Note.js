import React from 'react';
import './Note.css';

export default class Note extends React.Component {
  render() {
    const note = this.props;
    return (
      <div className="note">
        <h1>{note.title}</h1>
        <pre>{note.content}</pre>
      </div>
    );
  }
}
