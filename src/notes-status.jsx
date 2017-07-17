import React, { Component } from 'react';
import {Card, CardTitle, CardActions} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import './App.css'
import {editNotes, deleteNotes} from './actions.js';
import NotesCard from './notes-card';
import {connect} from 'react-redux';

class NotesStatus extends Component {

    render() {
    return (
      <div>
       <Card className="md-card">
        <CardTitle title="Notes" subtitle="Miscelanous Questions & Info"/>
       
       {this.props.notes.map((c, index) => {
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
            <NotesCard notes={c} expanded={c.expanded} index={index} key={c.date}/>
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
    notes: state.notes
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onSubmit: function (index, data) {
      dispatch(editNotes(index, data))
    },
    doDelete: function (index) {
      dispatch(deleteNotes(index))
    }
  }
}

NotesStatus =  connect(
  mapStateToProps, mapDispatchToProps)(NotesStatus);

export default NotesStatus