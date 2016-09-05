import React, { Component } from 'react'
import Countdown from './Countdown.jsx'
import AdminPanel from './AdminPanel.jsx'

export default class MainPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      endDate : '',
      message : ''
    };

    this.adminPanelSave = this.adminPanelSave.bind(this);
  }

  componentDidMount() {

    fetch('/api/config', { method : 'GET' })
    .then(response => {
      return response.json();
    })
    .then(data => {
      this.setState({
        endDate : new Date(data.endDate),
        message : data.message
      });
    });

  }

  adminPanelSave(data) {

    fetch('/api/config', {
       method : 'POST',
       headers : { 'Content-Type' : 'application/json' },
       body: JSON.stringify({ endDate : data.endDate, message : data.message })
     });

    this.setState({
      endDate : new Date(data.endDate),
      message : data.message
    });

  }

  render() {

    let countdownOpts = {
      endDate : this.state.endDate,
      prefix : this.state.message
    }

    return (
      <div>
        <div className="title">Contador</div>
        <br /><br />
        <Countdown options={countdownOpts} />
        <br /><br />
        <AdminPanel onSave={this.adminPanelSave} endDate={this.state.endDate} message={this.state.message} />
      </div>
    )
  }
}
