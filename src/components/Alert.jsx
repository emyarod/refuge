import React from 'react';
import './Alert.scss';

export default class Alert extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      removed: false,
      className: 'enter',
    };

    this.alertTimer = null;
  }

  showAlert() {
    this.setState({
      visible: true,
      className: '',
    });
  }

  hideAlert() {
    if (this.alertTimer) this.alertTimer = null;
    this.setState({
      visible: false,
      removed: true,
      className: 'exit',
    });
  }

  detachAlert() {
    if (this.state.removed) this.props.onDetach(this.props.alert.id);
  }

  componentDidMount() {
    // event listener for transition end
    const { alert } = this.refs;
    alert.addEventListener('transitionend', () => this.detachAlert());

    // dismiss alert after 2s
    this.alertTimer = setTimeout(() => { this.hideAlert(); }, 2000);

    // display alert
    setTimeout(() => { this.showAlert(); }, 50);
  }

  componentWillUnmount() {
    // event listener for transition end
    const { alert } = this.refs;
    alert.removeEventListener('transitionend', () => this.detachAlert());
  }

  render() {
    const { alert: { type } } = this.props;
    const { className } = this.state;
    return (
      <div className={ `alert ${type} ${className}` } ref="alert">
        <p>{ this.props.alert.message }</p>
      </div>
    );
  }
}
