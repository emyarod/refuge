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
  signInWithEmailAndPassword: ({ email, password }) => {
    // sign out if another user is currently already signed in
    if (firebase.auth().currentUser) {
      firebase.auth().signOut();
    }

    // TODO: error handling
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }

    // TODO: error handling
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }

    // Sign in with email and pass.
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(error => {
        // TODO: Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // TODO: ternary
        if (errorCode === 'auth/wrong-password') {
          // TODO: handle errors
          alert('Wrong password.');
        } else {
          // TODO: handle errors
          alert(errorMessage);
        }

        console.log(error);
        // TODO: disable/enable forms
        // document.getElementById('quickstart-sign-in').disabled = false;
        // [END_EXCLUDE]
      });

    // [END authwithemail]
    // TODO: disable/enable forms
    // document.getElementById('quickstart-sign-in').disabled = true;
  },
  /**
  * Handles the sign up button press.
  */
  handleSignUp: ({ email, password }) => {
    console.log('signup');
    if (email.length < 4) {
      // TODO: error handling
      alert('Please enter an email address.');
      return;
    }

    if (password.length < 4) {
      // TODO: error handling
      alert('Please enter a password.');
      return;
    }

    // Create user with email and pass.
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(error => {
        // TODO: Handle Errors here.
        const { code, message } = error;
        if (code === 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(message);
        }

        console.log(error);
      });
  }
}
