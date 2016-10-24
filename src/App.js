import React, { Component } from 'react';
import * as firebase from 'firebase';
import logo from './logo.svg';
import './App.scss';
import Notes from './components/notes/Layout';

class App extends Component {
  constructor() {
    super();
    this.state = {
      speed: 10,
    };
  }

  componentDidMount() {
    const rootRef = firebase.database().ref().child('react');
    const speedRef = rootRef.child('speed');
    speedRef.on('value', snap => {
      this.setState({
        speed: snap.val(),
      });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Notes />
        <h1>{this.state.speed}</h1>
      </div>
    );
  }
}

export default App;
