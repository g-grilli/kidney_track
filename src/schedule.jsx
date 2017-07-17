import React, { Component } from 'react';
import {Card, CardTitle, CardActions} from 'material-ui/Card';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import './App.css'

import database, {User} from './fsociety';
import { addSchedule } from './actions';
import { connect } from 'react-redux';

const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};

class Schedule extends Component {
   constructor(props) {
    super(props);
    this.state = {
      value2: 1,
      time: '', 
      date: '',
      firstName: '',
      lastName: '',
      type: '',
      schedule: []
    };
    this.state.display_schedule = this.state.schedule;
    
    this.read_data();
    }
    
  read_data () {
    if (User.user) {
      database.ref('schedule/' + User.user.uid)
        .once('value').then((schedule) => {
          schedule = schedule.val();
          console.log(schedule);
          if (schedule) {
            this.state.schedule = schedule;
            this.setState({schedule: this.state.schedule});
            this.state.display_schedule = this.state.schedule;
          }
        });
    } else {
      setTimeout(() => {
        this.read_data();
      }, 300);
    }
  }
  
  update_state (event, key) {
  console.log(event.target.value);
  console.log(event.target);
  this.setState({[key]: event.target.value});
  var new_state = {};
  new_state[key] = event.target.value;
  this.setState({new_state});
  }

  handleChangeTime = (event, date) => {
    this.setState({time: date});
  };
  
  handleChangeDate = (event, date) => {
    this.setState({date: date});
  };
  
  handleSubmit(event) {
  console.log('submitted: ' + this.state.type +' '+ this.state.time +' '+ this.state.date +' '+ this.state.firstName +' '+ this.state.lastName);
  event.preventDefault();
  }
  
  handleAddSchedule = () => {
  this.props.onSubmit({
    time: this.state.time,
    date: this.state.date,
    practice: this.state.firstName,
    specialty: this.state.lastName,
    type: this.state.type, 
    isOpened: false
  });
  
    this.setState({open: true});
}

  handleExpandChange = (expanded) => {
  this.setState({expanded: expanded});
  };

  handleExpandChange = (expanded) => {
  this.setState({expanded: expanded});
  };

    render() {
      const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];
    return (
      <div>
       <form onSubmit={event => this.handleSubmit(event)}>
       <Card className="md-card">
        <CardTitle title="Add Appointment"/>
          <SelectField floatingLabelText="Appointment Type"
            value={this.state.type}
            value2={this.state.type}
            onChange={event => this.update_state(event, 'type')}
          >
            <MenuItem value2={1} primaryText="Clinic" />
            <MenuItem value2={2} primaryText="Initial" />
            <MenuItem value2={3} primaryText="Follow-up" />
            <MenuItem value2={4} primaryText="Check-up" />
            <MenuItem value2={5} primaryText="Labs" />
          </SelectField>
        <br/>
        <TimePicker
          format="ampm" hintText="Appointment Time" container='inline'
          value={this.state.time}
          onChange={this.handleChangeTime}
        /><br/>
        <DatePicker
        hintText="Appointment Date" container="inline"
        value={this.state.date}
        onChange={event => this.handleChangeDate(event, 'date')}
      />
      <TextField floatingLabelText="First Name"
           value={this.state.firstName}
           onChange={event => this.update_state(event, 'firstName')}/>
      <br/>
      <TextField floatingLabelText="Last Name"
        value={this.state.lastName}
        onChange={event => this.update_state(event, 'lastName')}/>
      <CardActions>
          <RaisedButton type="submit" label="Add New Appointment" primary={true} onTouchTap={this.handleAddSchedule}/>
           <Dialog
            title="Add Appointment"
            actions={actions}
            modal={true}
            contentStyle={customContentStyle}
            open={this.state.open}
            >
            A new appointment has been added.
           </Dialog>
          </CardActions>
      
      </Card>
      </form>
      </div>
    );
  }
}
function mapStateToProps (state) {
  return {schedule: state.schedule}
}

function mapDispatchToProps (dispatch) {
  return {
    onSubmit: function (data) {
      dispatch(addSchedule(data))
    }
  }
}

Schedule = connect(mapStateToProps, mapDispatchToProps)(Schedule)


export default Schedule