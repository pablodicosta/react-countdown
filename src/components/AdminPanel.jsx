import React, { Component } from 'react';
import Datetime from 'react-datetime';

export default class AdminPanel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      endDate : '',
      message : '',
      opened : false
    };

    this.saveClick = this.saveClick.bind(this);
    this.editClick = this.editClick.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
    this.datePickerChange = this.datePickerChange.bind(this);
    this.messageChange = this.messageChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      endDate : nextProps.endDate,
      message : nextProps.message
    });
  }

  datePickerChange(moment) {
    this.setState({ endDate : moment.toDate() });
  }

  saveClick() {
    this.props.onSave({
      endDate : this.state.endDate,
      message : this.state.message
    });
    this.setState({ opened : false });
  }

  editClick() {
    this.setState({ opened : true });
  }

  cancelClick() {
    this.setState({
      endDate : this.props.endDate,
      message : this.props.message,
      opened : false
    });
  }

  messageChange(event) {
    this.setState({ message : event.target.value });
  }

  render() {

    let datePickerOpts = {
      value : this.state.endDate,
      input : false,
      onChange : this.datePickerChange
    };

    if(this.state.opened) {
      return (
        <div className="admin">
          Fecha final<br />
          <Datetime {...datePickerOpts} /><br />
          Mensaje:&nbsp;
          <input type="text" onChange={this.messageChange} value={this.state.message} />
          <br /><br />
          <input type="button" onClick={this.saveClick} value="Guardar" />
          <input type="button" onClick={this.cancelClick} value="Cancelar" />
        </div>
      );
    } else {
      return (
        <div className="admin">
          <input type="button" onClick={this.editClick} value="Editar" />
        </div>
      );
    }

  }
}
