import firebase from 'firebase';

export default {
  isAuthenticated: false,
  authenticate() {
    this.isAuthenticated = true;
  },
  signOut() {
    this.isAuthenticated = false;
    return firebase.auth().signOut();
  },
  /**
  * Handles the sign in button press.
  */
  signInWithEmailAndPassword({ email, password }) {
    // sign out if another user is currently already signed in
    if (firebase.auth().currentUser) this.signOut();

    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }

    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }

    // Sign in with email and pass.
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(error => {
        const { code, message } = error;
        code === 'auth/wrong-password'
          ? alert('Wrong password.')
          : alert(message);
      });
  },
  /**
   * Handles sign in with 3rd party provider
   */
  signInWithProvider(authProvider) {
    if (!firebase.auth().currentUser) this.signOut();

    let provider;
    switch (authProvider) {
      case 'facebook':
        provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('user_birthday');
        break;
      case 'github':
        provider = new firebase.auth.GithubAuthProvider();
        provider.addScope('repo');
        break;
      case 'google':
        provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        break;
      case 'twitter':
        provider = firebase.auth.TwitterAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        break;
      default:
        return;
    }

    return firebase.auth().signInWithPopup(provider)
      .catch(error =>  alert(error.message));
  },
  /**
  * Handles the sign up button press.
  */
  handleSignUp: ({ email, password }) => {
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }

    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }

    // Create user with email and password
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(error => {
        const { code, message } = error;
        code === 'auth/weak-password'
          ? alert('The password is too weak.')
          : alert(message);
      });
  }
}
