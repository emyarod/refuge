import React from 'react';
import './Note.scss';
import noteRepository from '../../data/NoteRepository';

export default class Note extends React.Component {
  remove() {
    noteRepository.remove(this.props, err => {
      // TODO: inform user
      if (err) throw err;
    });
  }

  render() {
    return (
      <div className="note" onClick={this.props.clickHandler}>
        <h1>{this.props.title}</h1>
        <pre>{this.props.content}</pre>
        <button type="button" onClick={() => this.remove()}>
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
