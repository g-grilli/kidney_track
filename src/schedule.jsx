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
   state = {
    value: 1,
  };
   
   
   constructor(props) {
    super(props);
    this.state = {
      scheduleTime: '', 
      scheduleDate: '',
      firstName: '',
      lastName: '',
      scheduleType: '',
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

  handleChangeTime = (event, scheduleTime) => {
    this.setState({scheduleTime: scheduleTime});
  };
  
  handleChangeDate = (event, scheduleDate) => {
    this.setState({scheduleDate: scheduleDate});
  };
  
  handleSubmit(event) {
  console.log('submitted: ' + this.state.scheduleType +' '+ this.state.scheduleTime +' '+ this.state.scheduleDate +' '+ this.state.firstName +' '+ this.state.lastName);
  event.preventDefault();
  }
  
  handleAddSchedule = () => {
  this.props.onSubmit({
    scheduleTime: this.state.scheduleTime,
    scheduleDate: this.state.scheduleDate,
    practice: this.state.firstName,
    specialty: this.state.lastName,
    scheduleType: this.state.scheduleType, 
    isOpened: false
  });
  
    this.setState({open: true});
}
  
  handleChange = (event, index, value) => {
  this.setState({value});
  };
  
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
            value={this.state.value}
            onChange={this.handleChange}
          >
            <MenuItem value={1} primaryText="Clinic" />
            <MenuItem value={2} primaryText="Initial" />
            <MenuItem value={3} primaryText="Follow-up" />
            <MenuItem value={4} primaryText="Check-up" />
            <MenuItem value={5} primaryText="Labs" />
          </SelectField>
        <br/>
        <TimePicker
          format="ampm" hintText="Appointment Time" container='inline'
          value={this.state.scheduleTime}
          onChange={this.handleChangeTime}
        /><br/>
        <DatePicker
        hintText="Appointment Date" container="inline"
        value={this.state.scheduleDate}
        onChange={this.handleChangeDate}
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