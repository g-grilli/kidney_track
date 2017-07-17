import React, { Component } from 'react';
import {Card, CardHeader, CardTitle, CardActions, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import './App.css'
import FlatButton from 'material-ui/FlatButton';
import {editContact, deleteContact, doSort, doSearch, editMed, deleteMed} from './actions.js';
import MedCard from './med-card';
import {connect} from 'react-redux';

class Meds extends Component {
  

    render() {
    return (
      <div>
       <Card className="md-card">
        <CardTitle title="Prescriptions" subtitle="Dosage & Schedule"/>
       
       {this.props.meds.map((c, index) => {
        return (
          <Table allRowsSelected={false}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
           <TableRow striped={true}>
            <TableHeaderColumn>Medication</TableHeaderColumn>
              <TableHeaderColumn>Dosage</TableHeaderColumn>
               <TableHeaderColumn>Morning</TableHeaderColumn>
               <TableHeaderColumn>Afternoon</TableHeaderColumn>
               <TableHeaderColumn>Evening</TableHeaderColumn>
               <TableHeaderColumn>Bed Time</TableHeaderColumn>
            </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
            <MedCard med={c} expanded={c.expanded} index={index} key={c.drugName}/>
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
    meds: state.meds
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onSubmit: function (index, data) {
      dispatch(editMed(index, data))
    },
    doDelete: function (index) {
      dispatch(deleteMed(index))
    }
  }
}

Meds =  connect(
  mapStateToProps, mapDispatchToProps)(Meds);

export default Meds