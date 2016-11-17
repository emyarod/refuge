import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Match, Redirect } from 'react-router';
import App from './App';
import Notes from './components/pages/Notes';
import Login from './components/pages/Login';
import Auth from './data/Auth.js';
import './index.scss';

const MatchWhenAuthorized = ({ component: Component, ...rest }) => (
  <Match
    {...rest}
    render={props => (
      Auth.isAuthenticated
      ? <Component {...props} />
      : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location },
          }}
        />
      )
    )}
  />
);

const Router = () => (
  <BrowserRouter>
    {({ router }) => (
      <div>
        {Auth.isAuthenticated ? (
          <p>
            {/* TODO: add headerbar */}
            Headerbar! {' '}
            <button onClick={() => (
              Auth.signOut().then(() => router.transitionTo('/'))
            )}>Sign out</button>
          </p>
        ) : (
          <div>
            {/* TODO: possibly remove App */}
            <App />
            <Login />
          </div>
        )}

        <MatchWhenAuthorized pattern="/notes" component={Notes}/>
      </div>
    )}
  </BrowserRouter>
)

ReactDOM.render(
  <Router />,
  document.getElementById('root')
);
