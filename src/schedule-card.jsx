import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardHeader, CardActions, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import {editSchedule, deleteSchedule, doExpand} from './actions.js';
import {connect} from 'react-redux';

class ScheduleCard extends Component {
  
  handleSubmit(event) {
    console.log('submitted: ' + this.state.date +' '+ this.state.weight);
    event.preventDefault();
  }
  
  handleEditSchedule = (index) => {
    console.log('submitted', this.state);
    this.props.onSubmit(index, this.props.schedule);
    this.setState({open: true});
  }

  handleDeleteSchedule = (findex, oindex) => {
    console.log(this.props);
    console.log(findex, oindex)
    this.props.doDelete(findex, oindex);
  }

  handleField (event, field, findex, oindex) {
    console.log(event.target.value);
    var new_schedule = Object.assign(
      {},
      this.props.schedule,
      {[field]: event.target.value}
    );
    
    this.props.onSubmit(findex, new_schedule);
  }
  
  render () {
    
    
    
    return (
      <div>
      <Card className="md-card">
        <CardHeader
          title={this.props.schedule.lastName}
          subtitle={this.props.schedule.date}
          actAsExpander={true}
          showExpandableButton={true}/>
        <CardText expandable={true}>
          <TextField floatingLabelText="First Name" value={this.props.schedule.firstName} onChange={(event) => this.handleField(event, 'firstName', this.props.index, this.props.schedule.orig)}/><br/>
          <br/>
          <TextField floatingLabelText="Last Name" value={this.props.schedule.lastNameame} onChange={(event) => this.handleField(event, 'lastName', this.props.index, this.props.schedule.orig)}/><br/>
          <br/>
          <TextField floatingLabelText="Specialty" value={this.props.schedule.specialty} onChange={(event) => this.handleField(event, 'specialty', this.props.index, this.props.schedule.orig)}/><br/>
          <br/>
          <TextField floatingLabelText="Date" value={this.props.schedule.date} onChange={(event) => this.handleField(event, 'date', this.props.index, this.props.schedule.orig)}/><br/>
          <br/>
          <TextField floatingLabelText="Time" value={this.props.schedule.time} onChange={(event) => this.handleField(event, 'time', this.props.index, this.props.schedule.orig)}/><br/>
          <br/>
          <TextField floatingLabelText="Notes" value={this.props.schedule.notes} onChange={(event) => this.handleField(event, 'notes', this.props.index, this.props.schedule.orig)} />
          <CardActions>
           <FlatButton label="Favorite" primary={true} onTouchTap={this.handleMakeFavorite} />
           <FlatButton type="submit" label='DELETE' primary={true} onClick={() => this.handleDeleteContact(this.props.index, this.props.contact.orig)}/>
           </CardActions>
          </CardText>
      </Card>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onSubmit: function (index, data) {
      dispatch(editSchedule(index, data))
    },
    doDelete: function (findex, oindex) {
      dispatch(deleteSchedule(findex, oindex))
    }
  }
}

ScheduleCard =  connect(
  mapStateToProps, mapDispatchToProps)(ScheduleCard);
  
export default ScheduleCard