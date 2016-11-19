import React  from 'react';
import shortid  from 'shortid';
import Alert from './Alert';
import './AlertsWrapper.scss';

export default class AlertsWrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      alerts: [],
    };
  }

  /**
   * Callback for detaching `transitionend` event handler
   * @param {string} id - the unique id of an alert object
   */
  detachHandler(id) {
    const alerts = this.state.alerts.slice(0).filter(toCheck =>
      toCheck.id !== id
    );

    this.setState({ alerts });
  }

  /**
   * Push a new alert object to the state and return the new alert object
   * @param {string} alert - an alert object
   */
  addAlert(alert) {
    const _alert = Object.assign({}, alert);
    const alerts = this.state.alerts.slice(0);
    _alert.id = shortid.generate();
    alerts.push(_alert);
    this.setState({ alerts });
    return _alert;
  }

  render() {
    return (
      <div className={'alerts-wrapper'}>
        {this.state.alerts.map(alert =>
          <Alert
            key={alert.id}
            alert={alert}
            onDetach={e => this.detachHandler(e)}
          />
        )}
      </div>
    );
  }
}
