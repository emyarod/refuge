import React from 'react';
import firebase from 'firebase';
import './HeaderBar.scss';

export default class HeaderBar extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      searchQuery: '',
    };
  }

  processUser(user) {
    if (!user) {
      this.setState({ user: null });
      return;
    }

    const { providerData: [{ displayName, email, photoURL }] } = user;
    const userTitle = displayName || email || '';
    this.setState({ user: { userTitle, photoURL } })
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) this.processUser(user);
    });
  }

  render() {
    const { user } = this.state;
    return user
      ? (
        <header>
          <input placeholder="Search" />
          <div>
            <span>{user.userTitle}</span>
            <img src={user.photoURL} alt={user.userTitle} />
            <a href="#" onClick={this.props.signOutHandler}>
              <i className="fa fa-sign-out" aria-hidden></i>
            </a>
          </div>
        </header>
      )
      : null;
  }
}
