import React, {Component} from 'react';
import update from 'react/lib/update';
import {connect} from 'react-redux';
import Switch from '../Switch';
import {
  addNotification as notify,
  updateNotification
} from '../../../../src/index';

class NotificationCreator extends Component {
  constructor(props) {
    super(props);
    this._addNotification = this._addNotification.bind(this);
    this._onTitleChange = this._onTitleChange.bind(this);
    this._onMessageChange = this._onMessageChange.bind(this);
    this._onStatusChange = this._onStatusChange.bind(this);
    this._onDismissAfterChange = this._onDismissAfterChange.bind(this);
    this._onDismissibleChange = this._onDismissibleChange.bind(this);
    this._onAction1NameChange = this._onAction1NameChange.bind(this);
    this._onAction1PrimaryChange = this._onAction1PrimaryChange.bind(this);
    this._onAction2NameChange = this._onAction2NameChange.bind(this);
    this._onAction2PrimaryChange = this._onAction2PrimaryChange.bind(this);
    this.state = {
      showActions: false,
      notification: {
        title: 'Welcome on demo!',
        message: 'Hey buddy, here you can see what you can do with it.',
        status: 'info',
        dismissAfter: 5000,
        dismissible: true,
        actions: [{
          name: '',
          primary: true
        }, {
          name: '',
          primary: false
        }]
      }
    }
  }

  _addNotification(event) {
    event.preventDefault();
    const {notification, notification:{actions}} = this.state;
    const {notify} = this.props;
    let _actions = [];
    if (actions[0].name) {
      _actions.push(actions[0]);
    }
    if (actions[1].name) {
      _actions.push(actions[1]);
    }
    notify({
      title: notification.title,
      message: notification.message,
      status: notification.status,
      dismissible: notification.dismissible,
      dismissAfter: notification.dismissAfter,
      actions: _actions
    });
  }

  _onTitleChange(event) {
    const newState = update(this.state, {
      notification: {
        title: {$set: event.target.value}
      }
    });
    this.setState(newState);
  }

  _onMessageChange(event) {
    const newState = update(this.state, {
      notification: {
        message: {$set: event.target.value}
      }
    });
    this.setState(newState);
  }

  _onStatusChange(event) {
    const newState = update(this.state, {
      notification: {
        status: {$set: event.target.value}
      }
    });
    this.setState(newState);
  }

  _onDismissAfterChange(event) {
    const newState = update(this.state, {
      dismissAfter: {
        status: {$set: event.target.value}
      }
    });
    this.setState(newState);
  }

  _onDismissibleChange(event) {
    const newState = update(this.state, {
      dismissible: {
        status: {$set: event.target.checked}
      }
    });
    this.setState(newState);
  }

  _onAction1NameChange(event) {
    const newState = update(this.state, {
      notification: {
        actions: {
          0: {
            name: {$set: event.target.value}
          }
        }
      }
    });
    this.setState(newState);
  }

  _onAction1PrimaryChange(event) {
    const newState = update(this.state, {
      notification: {
        actions: {
          0: {
            primary: {$set: event.target.checked}
          }
        }
      }
    });
    this.setState(newState);
  }

  _onAction2NameChange(event) {
    const newState = update(this.state, {
      notification: {
        actions: {
          1: {
            name: {$set: event.target.value}
          }
        }
      }
    });
    this.setState(newState);
  }

  _onAction2PrimaryChange(event) {
    const newState = update(this.state, {
      notification: {
        actions: {
          1: {
            primary: {$set: event.target.checked}
          }
        }
      }
    });
    this.setState(newState);
  }

  _renderActions() {
    const {actions} = this.state.notification;
    console.log(actions);
    return (
      <div className="form-group">
        <div className="row">
          <div className="col-xs-5">
            <label>Name</label>
            <input className="form-control" type="text" name="action1-name"
                   onChange={this._onAction1NameChange}
                   value={actions[0].name}/>
          </div>
          <div className="col-xs-7">
            <label>Primary action</label>
            <Switch label="action1-primary"
                    variable={{name:'action1-primary',checked:actions[0].primary,onChange:this._onAction1PrimaryChange}}/>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-5">
            <label>Name</label>
            <input className="form-control" type="text" name="action2-name"
                   onChange={this._onAction2NameChange}
                   value={actions[1].name}/>
          </div>
          <div className="col-xs-7">
            <label>Primary action</label>
            <Switch label="action2-primary"
                    variable={{name:'action2-primary',checked:actions[1].primary,onChange:this._onAction2PrimaryChange}}/>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {title, message, dismissAfter, dismissible} = this.state.notification;
    return (
      <div>
        <form onSubmit={this._addNotification}>
          <div className="form-group">
            <label for="title">Title</label>
            <input className="form-control" type="text" id="title" name="title"
                   onChange={this._onTitleChange} value={title}/>
          </div>
          <div className="form-group">
            <label for="message">Message</label>
                    <textarea className="form-control" id="message" value={message}
                              onChange={this._onMessageChange}></textarea>
          </div>
          <div className="form-group">
            <label for="status">Status</label>
            <select className="form-control" id="status" name="status"
                    onChange={this._onStatusChange}>
              <option value="info">info</option>
              <option value="success">success</option>
              <option value="warning">warning</option>
              <option value="error">error</option>
            </select>
          </div>
          <div className="form-group">
            <label for="dismissAfter">Dismiss after (ms)</label>
            <input className="form-control" type="text" name="dismissAfter"
                   onChange={this._onDismissAfterChange}
                   value={dismissAfter}/>
          </div>
          <div className="form-group">
            <label for="dismissible">Dismissible (by clicking on it)</label>
            <Switch label="dismissible"
                    variable={{name:'dismissible',checked:dismissible,onChange:this._onDismissibleChange}}/>
          </div>
          {(this.state.showActions
            ? this._renderActions()
            : <button onClick={() => {this.setState({showActions: true})}}
                      className="btn btn-success btn-block">
            Add action buttons
          </button>)}
          <hr/>
          <button type="submit" className="btn btn-primary btn-block">
            Notify
          </button>
        </form>
      </div>
    );
  }
}

export default connect(null, {notify, updateNotification})(NotificationCreator);