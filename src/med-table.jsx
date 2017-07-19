import React, {Component} from 'react';
import {Card, CardHeader, CardActions, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class MedTable extends Component {
  handleExpandChange = (index, expanded) => {
    this.props.doMExpand(index, expanded);
    console.log(this.props);
    if (!expanded) {
      this.props.doMSort();
    }
  };
  
  handleSubmit(event) {
    console.log('submitted: ' + this.state.drugName +' '+ this.state.dosage);
    event.preventDefault();
  }
  
  handleEditMed = (index) => {
    console.log('submitted', this.state);
    this.props.onSubmit(index, this.props.meds);
    this.setState({open: true});
  }

  handleDeleteMed = (findex, oindex) => {
    console.log(this.props);
    console.log(findex, oindex)
    this.props.doDelete(findex, oindex);
  }

  handleField (event, field, findex, oindex) {
    console.log(event.target.value);
    var new_med = Object.assign(
      {},
      this.props.meds,
      {[field]: event.target.value}
    );
    
    this.props.onSubmit(findex, new_med);
  }
  
  render () {
    
    
    return (
      <div>
      <Card className="md-card" expanded={this.props.expanded} onExpandChange={(e) => this.handleExpandChange(this.props.index, e)}>
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
           <TableRowColumn>{this.props.meds.drugName}</TableRowColumn>
           <TableRowColumn>{this.props.meds.dosage}</TableRowColumn>
           <TableRowColumn><Checkbox/></TableRowColumn>
           <TableRowColumn><Checkbox/></TableRowColumn>
           <TableRowColumn><Checkbox/></TableRowColumn>
           <TableRowColumn><Checkbox/></TableRowColumn>
           <TableRowColumn>{this.props.meds.notes}</TableRowColumn>
          </TableBody>
        </Table> 
      </Card>
      </div>
    )
  }
}

export default MedTable



