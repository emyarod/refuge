import React from 'react';
import './Note.scss';
import noteRepository from '../../data/NoteRepository';

export default class Note extends React.Component {
  remove(e) {
    e.stopPropagation();
    noteRepository.remove(this.props, err => {
      if (err) return this.props.alertHandler({
        type: 'error',
        message: 'Failed to delete note',
      });
    });
  }

  render() {
    return (
      <div className="note" onClick={this.props.clickHandler}>
        <h1>{this.props.title}</h1>
        <pre>{this.props.content}</pre>
        <button type="button" onClick={e => this.remove(e)}>
          <i className="fa fa-trash-o" aria-hidden></i>
        </button>
        <button className="edit" type="button">
          <i className="fa fa-pencil" aria-hidden></i>
        </button>
      </div>
    );
  }
}

// TODO: see if stateless functional component can be reimplemented
// export default function Note({ title, content }) {
//   const remove = () => {
//     console.log('hi');
//   }
//
//   return (
//     <div className="note">
//       <h1>{title}</h1>
//       <pre>{content}</pre>
//       <button type="button" onClick={remove()}>
//         <i className="fa fa-trash-o" aria-hidden></i>
//       </button>
//       <button className="edit" type="button">
//         <i className="fa fa-pencil" aria-hidden></i>
//       </button>
//     </div>
//   );
// }
