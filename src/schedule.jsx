import React, { Component } from 'react';
import {Card, CardHeader, CardTitle, CardActions, CardText} from 'material-ui/Card';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import './App.css'

class Schedule extends Component {
   constructor(props) {
    super(props);
    this.state = {
      time: null, 
      date: null 
    }
  }

  handleChangeTime = (event, date) => {
    this.setState({time: date});
  };
  
  handleChangeDate = (event, date) => {
    this.setState({date: date});
  };

    render() {
    return (
      <div>
       <Card className="md-card">
       <form>
        <TimePicker
          format="ampm"
          hintText="Appointment Time"
          container='inline'
          value={this.state.time}
          onChange={this.handleChangeTime}
        />
        <DatePicker
        hintText="Appointment Date"
        value={this.state.date}
        onChange={event => this.handleChangeDate(event, 'date')}
      />
      <TextField floatingLabelText="First Name"
           value={this.state.name}
           onChange={event => this.update_state(event, 'name')}/>
      <TextField floatingLabelText="Last Name"
           value={this.state.name}
           onChange={event => this.update_state(event, 'name')}/>
      </form>
      </Card>
      </div>
    );
  }
}



export default Schedule