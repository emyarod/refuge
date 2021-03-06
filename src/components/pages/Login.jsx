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

  /**
   * Sign in with 3rd party auth provider
   */
  signInWithProvider(e, provider) {
    e.preventDefault();
    AuthData.signInWithProvider(provider)
      .then(res => this.authenticate(res));
  }

  /**
   * Sign in with email and password
   */
  handleSignIn() {
    const { email, password } = this.state;
    AuthData.signInWithEmailAndPassword({ email, password }, alert => this.props.alertHandler(alert))
      .then(res => this.authenticate(res));
  }

  /**
   * Sign up with email and password
   */
  handleSignUp() {
    const { email, password, confirmPassword } = this.state;
    if (password === confirmPassword) {
      AuthData.handleSignUp({ email, password })
        // proceed to sign in
        .then(() => this.handleSignIn());
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.state.wantsToSignUp
      ? this.handleSignUp()
      : this.handleSignIn();
  }

  render() {
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
                onChange={e => this.handlePassConfirm(e)}
              />
              <button type="submit" className="signup-submit">Sign up</button>
              <p>
                Already have an account? {' '}
                <a href="#" onClick={() => this.toggleSignUp()}>Log In</a>
              </p>
            </div>
          ) : (
            <div className="clearfix btn-group">
              <button type="submit">Sign in</button>
              <button type="button" onClick={() => this.toggleSignUp()}>
                Sign up
              </button>
            </div>
          )}
          <hr />
          <div className="social-providers">
            <a href="#">
              <i
                className="fa fa-facebook-square"
                onClick={e => this.signInWithProvider(e, 'facebook')}
                aria-hidden></i>
            </a>
            <a href="#">
              <i
                className="fa fa-twitter-square"
                onClick={e => this.signInWithProvider(e, 'twitter')}
                aria-hidden></i>
            </a>
            <a href="#">
              <i
                className="fa fa-google-plus-square"
                onClick={e => this.signInWithProvider(e, 'google')}
                aria-hidden></i>
            </a>
            <a href="#">
              <i
                className="fa fa-github-square"
                onClick={e => this.signInWithProvider(e, 'github')}
                aria-hidden
              ></i>
            </a>
          </div>
        </form>
      </div>
    );
  }
}
