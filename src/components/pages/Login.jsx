import React from 'react';
import { Redirect } from 'react-router';
import './Login.scss';
import AuthData from '../../data/Auth';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      wantsToSignUp: false,
      redirectToReferrer: false,
    };
  }

  handleEmailChange(e) { this.setState({ email: e.target.value }); }

  handlePasswordChange(e) { this.setState({ password: e.target.value }); }

  handlePassConfirm(e) { this.setState({ confirmPassword: e.target.value }); }

  toggleSignUp() {
    this.state.wantsToSignUp
      ? this.setState({ wantsToSignUp: false })
      : this.setState({ wantsToSignUp: true });
  }

  authenticate(res) {
    if (res) {
      AuthData.authenticate();
      this.setState({ redirectToReferrer: true });
    }
  }

  handlePasswordChange(e) {
    const password = e.target.value;
    this.setState({ password });
  }

  handlePasswordConfirm(e) {
    const confirmPassword = e.target.value;
    this.setState({ confirmPassword });
  }

  handleSignUp() {
    const { email, password, confirmPassword } = this.state;
    if (password === confirmPassword) {
      AuthData.handleSignUp({ email, password })
        // proceed to sign in
        .then(() => this.handleSignIn());
    }
  }

  wantsToSignUp() {
    this.setState({ wantsToSignUp: true });
  }

  wantsToLogIn() {
    this.setState({ wantsToSignUp: false });
  }

  handleSignIn() {
    // TODO: complete logic
    const { email, password } = this.state;
    AuthData.signInWithEmailAndPassword({ email, password })
      .then(() => {
        AuthData.authenticate();
        this.setState({ redirectToReferrer: true });
      });
      // .then(res => console.log(res, 'asdfasdfasdf'));
  }

  render() {
    // const { from } = this.props.location.state || '/'
    const { redirectToReferrer } = this.state;

    return (
      <div>
        {redirectToReferrer && <Redirect to={'/notes'} />}
        <form className="auth-form" onSubmit={e => this.handleSubmit(e)}>
          <h1>{this.state.wantsToSignUp ? 'Sign up' : 'Sign in'}</h1>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
              onChange={e => this.handleEmailChange(e)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              onChange={e => this.handlePasswordChange(e)}
            />
          </div>
          {this.state.wantsToSignUp ? (
            <div>
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                onChange={e => this.handlePasswordConfirm(e)}
              />
              <button type="submit" className="signup-submit">Sign up</button>
              <p>
                Already have an account? {' '}
                <a href="#" onClick={() => this.wantsToLogIn()}>Log In</a>
              </p>
            </div>
          ) : (
            <div className="clearfix btn-group">
              <button type="submit">Sign in</button>
              <button type="button" onClick={() => this.wantsToSignUp()}>
                Sign up
              </button>
            </div>
          )}
          <hr />
          <div className="social-providers">
            <a href="#">
              <i className="fa fa-facebook-square" aria-hidden></i>
            </a>
            <a href="#">
              <i className="fa fa-twitter-square" aria-hidden></i>
            </a>
            <a href="#">
              <i className="fa fa-google-plus-square" aria-hidden></i>
            </a>
            <a href="#">
              <i className="fa fa-github-square" aria-hidden></i>
            </a>
          </div>
        </form>
      </div>
    );
  }
}
