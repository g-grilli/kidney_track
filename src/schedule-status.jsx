import React, { Component } from 'react';
import {Card, CardTitle, CardActions} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import './App.css'
import {editSchedule, deleteSchedule} from './actions.js';
import ScheduleCard from './schedule-card';
import {connect} from 'react-redux';

class ScheduleStatus extends Component {
  

    render() {
    return (
      <div>
       <Card className="md-card">
        <CardTitle title="Upcoming Appointments" subtitle="Doctors & Labs"/>
       
       {this.props.schedule.map((c, index) => {
        return (
          <Table allRowsSelected={false}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
           <TableRow striped={true}>
            <TableHeaderColumn>Doctor</TableHeaderColumn>
              <TableHeaderColumn>Specialty</TableHeaderColumn>
               <TableHeaderColumn>Date</TableHeaderColumn>
               <TableHeaderColumn>Time</TableHeaderColumn>
            </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
            <ScheduleCard schedule={c} expanded={c.expanded} index={index} key={c.date}/>
            </TableBody>
            </Table>
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
    schedule: state.schedule
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onSubmit: function (index, data) {
      dispatch(editSchedule(index, data))
    },
    doDelete: function (index) {
      dispatch(deleteSchedule(index))
    }
  }
}

ScheduleStatus =  connect(
  mapStateToProps, mapDispatchToProps)(ScheduleStatus);

export default ScheduleStatus