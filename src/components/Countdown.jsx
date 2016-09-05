import DateBetween from '../utils/DateBetween'
import React, { Component } from 'react'

export default class Countdown extends Component {

  constructor (props) {
    super(props)
    this.state = { remaining: null }
  }

  componentDidMount() {
    this.tick()
    this.interval = setInterval(this.tick.bind(this), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  tick() {
    if(this.props.options.endDate != "") {
      let endDate = new Date(this.props.options.endDate)
      let remaining = DateBetween(new Date(), endDate)
      this.setState({ remaining: remaining })
    }
  }

  render() {
    if(this.state.remaining == null) {
      return (
        <div className="countdown">
          Cargando...
        </div>
      );
    } else {
      if(this.state.remaining != 0) {

        let days = this.state.remaining.days
        let hours = this.state.remaining.hours
        let minutes = this.state.remaining.minutes
        let seconds = this.state.remaining.seconds

        return (
          <div className="countdown">
            <span className="remaining">
              Faltan <b>{days}</b>d <b>{hours}</b>h <b>{minutes}</b>m <b>{seconds}s </b>
            </span>
            <span className="prefix">{this.props.options.prefix}</span>
          </div>
        );
      } else {
        return (
          <div className="countdown">
            Fecha cumplida!
          </div>
        );
      }
    }
  };
}
