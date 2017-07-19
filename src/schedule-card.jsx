import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardHeader, CardActions, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import {editSchedule, deleteSchedule, doSExpand, doSSearch, doSSort} from './actions.js';
import {connect} from 'react-redux';

class ScheduleCard extends Component {
  
  handleExpandChange = (index, expanded) => {
    this.props.doSExpand(index, expanded);
    console.log(this.props);
    if (!expanded) {
      this.props.doSSort();
    }
  };
  
  handleSubmit(event) {
    console.log('submitted: ' + this.state.scheduleTime +' '+ this.state.scheduleDate +' '+ this.state.visitType +' '+ this.state.lastName);
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
      <Card className="md-card" expanded={this.props.expanded} onExpandChange={(e) => this.handleExpandChange(this.props.index, e)}>
        <CardHeader
          title={this.props.schedule.firstName}
          subtitle={this.props.schedule.lastName}
          actAsExpander={true}
          showExpandableButton={true}/>
        <CardText expandable={true}>
          <TextField floatingLabelText="Time" 
          value={this.props.schedule.scheduleTime} 
          onChange={(event) => this.handleField(event, 'scheduleTime', this.props.index, this.props.schedule.orig)}/><br/>
          <br/>
          <TextField floatingLabelText="Date" 
          value={this.props.schedule.scheduleTime} 
          onChange={(event) => this.handleField(event, 'scheduleDate', this.props.index, this.props.schedule.orig)}/><br/>
          <br/>
          <TextField floatingLabelText="Visit Type" 
          value={this.props.schedule.visitType} 
          onChange={(event) => this.handleField(event, 'visitType', this.props.index, this.props.schedule.orig)}/><br/>
          <br/>
          <TextField floatingLabelText="LastName" 
          value={this.props.schedule.firstName} 
          onChange={(event) => this.handleField(event, 'firstName', this.props.index, this.props.schedule.orig)}/><br/>
          <br/>
          <TextField floatingLabelText="LastName" 
          value={this.props.schedule.lastName} 
          onChange={(event) => this.handleField(event, 'lastName', this.props.index, this.props.schedule.orig)}/><br/>
          <CardActions>
           <FlatButton type="submit" label='DELETE' primary={true} onClick={() => this.handleDeleteSchedule(this.props.index, this.props.schedule.orig)}/>
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
    },
    doSSort: function () {
      dispatch(doSSort());
    },
    doSSearch: function(term2) {
      dispatch(doSSearch(term2));
    },
    doSExpand: function(index, expanded) {
      dispatch(doSExpand(index, expanded));
    }
  }
}

ScheduleCard =  connect(
  mapStateToProps, mapDispatchToProps)(ScheduleCard);
  
export default ScheduleCard