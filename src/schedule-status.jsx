import React, { Component } from 'react';
import {Card, CardTitle, CardActions} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import './App.css'
import {editSchedule, deleteSchedule, doSSort, doSSearch} from './actions.js';
import ScheduleCard from './schedule-card';
import {connect} from 'react-redux';

class ScheduleStatus extends Component {
  

    render() {
    return (
      <div>
       <Card className="md-card">
        <CardTitle title="Upcoming Appointments" subtitle="Doctors & Labs"/>
       
       {this.props.filtered_schedule.map((s, index) => {
        return (
            <ScheduleCard schedule={s} expanded={s.expanded} index={index} key={s.lastName}/>
            )
          })}
        </Card>
        <Card className="md-card"> 
        <CardActions> 
          </CardActions>
        </Card>
       
      </div>
    );
  } 
}

function mapStateToProps (state) {
  return {
    schedule: state.schedule,
    filtered_schedule: state.filtered_schedule,
    term: state.term
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onSubmit: function (index, data) {
      dispatch(editSchedule(index, data))
    },
    doDelete: function (index) {
      dispatch(deleteSchedule(index))
    },
    doSSort: function () {
      dispatch(doSSort());
    },
    doSSearch: function(term2) {
      dispatch(doSSearch(term2));
    }
  }
}

ScheduleStatus =  connect(
  mapStateToProps, mapDispatchToProps)(ScheduleStatus);

export default ScheduleStatus