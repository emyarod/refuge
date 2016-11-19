import React from 'react';
import { BrowserRouter, Match, Redirect } from 'react-router';
// import logo from './logo.svg';
import Auth from './data/Auth';
import AlertsWrapper from './components/AlertsWrapper';
import HeaderBar from './components/HeaderBar';
import Login from './components/pages/Login';
import Notes from './components/pages/Notes';
import './App.scss';

export default class Router extends React.Component {
  handleAlert(alert) { this.refs.alerts.addAlert(alert) }

  render() {
    const MatchWhenAuthorized = ({ component: Component, ...rest }) => (
      <Match
        {...rest}
        render={props => {
          props.alertHandler = alert => this.handleAlert(alert);
          return Auth.isAuthenticated
            ? <Component {...props} />
            : (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: props.location },
                }}
              />
            );
        }}
      />
    );

    return (
      <div>
        <AlertsWrapper ref="alerts" />
        <BrowserRouter>
          {({ router }) => (
            <div>
              {Auth.isAuthenticated
                ? <HeaderBar id="header" signOutHandler={() => (
                  Auth.signOut().then(() => router.transitionTo('/'))
                )} />
                : <Login />}
              <MatchWhenAuthorized pattern="/notes" component={Notes} />
            </div>
          )}
        </BrowserRouter>
      </div>
    );
  }
}
