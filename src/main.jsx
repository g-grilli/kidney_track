import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Schedule from './schedule'
import Contacts from './contacts'
import Add from './add'
import Medication from './medication'
import Health from './health'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import { addContact } from './actions.js';
import { connect } from 'react-redux';
import './main.css'

class Main extends Component {
  state = {
    open: false
    };
    
  handleExpandChange = (expanded) => {
  this.setState({expanded: expanded});
};
  
  render() {
    return (
      <div className="Main">
        <div>
          <Card className="md-card">
            <CardHeader
             title='Prescriptions'
             subtitle='Dosage & Schedule'
             actAsExpander={true}
             showExpandableButton={true}/>
             <CardText expandable={true}>
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
                <TableRow>
                 <TableHeaderColumn>Asprin</TableHeaderColumn>
                 <TableHeaderColumn>500mg</TableHeaderColumn>
                 <TableHeaderColumn>{<Checkbox/>}</TableHeaderColumn>
                 <TableHeaderColumn>{<Checkbox/>}</TableHeaderColumn>
                 <TableHeaderColumn>{<Checkbox/>}</TableHeaderColumn>
                 <TableHeaderColumn>{<Checkbox/>}</TableHeaderColumn>
                </TableRow>
                <TableRow>
                 <TableHeaderColumn>Placebo</TableHeaderColumn>
                 <TableHeaderColumn>1mg</TableHeaderColumn>
                 <TableHeaderColumn>{<Checkbox/>}</TableHeaderColumn>
                 <TableHeaderColumn>{<Checkbox/>}</TableHeaderColumn>
                 <TableHeaderColumn>{<Checkbox/>}</TableHeaderColumn>
                 <TableHeaderColumn>{<Checkbox/>}</TableHeaderColumn>
                </TableRow>
                </TableBody>
              </Table>
              <Medication/>
             </CardText>
          </Card>
          <Card className="md-card">
           <CardHeader
             title='Weight & Blood Pressure'
             subtitle='Daily Check'
             actAsExpander={true}
             showExpandableButton={true}/>
             <CardText expandable={true}>
              <Table>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow striped={true}>
                 <TableHeaderColumn>Date</TableHeaderColumn>
                 <TableHeaderColumn>Weight lbs.</TableHeaderColumn>
                 <TableHeaderColumn>Systolic</TableHeaderColumn>
                 <TableHeaderColumn>Diastolic</TableHeaderColumn>
                </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                <TableRow>
                 <TableHeaderColumn>7/14/2017</TableHeaderColumn>
                 <TableHeaderColumn>115</TableHeaderColumn>
                 <TableHeaderColumn>80</TableHeaderColumn>
                 <TableHeaderColumn>70</TableHeaderColumn>
                </TableRow>
                <TableRow>
                 <TableHeaderColumn>7/15/2017</TableHeaderColumn>
                 <TableHeaderColumn>117</TableHeaderColumn>
                 <TableHeaderColumn>90</TableHeaderColumn>
                 <TableHeaderColumn>83</TableHeaderColumn>
                </TableRow>
                </TableBody>
              </Table>
              <Health/>
             </CardText>
          </Card>
          <Card className="md-card">
           <CardHeader
             title='Doctor & Clinic Visits'
             subtitle='Scheduled Appointments'
             actAsExpander={true}
             showExpandableButton={true}/>
             <CardText expandable={true}>
              <Table>
               <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow striped={true}>
                 <TableHeaderColumn>Doctor</TableHeaderColumn>
                 <TableHeaderColumn>Specialty</TableHeaderColumn>
                 <TableHeaderColumn>Date</TableHeaderColumn>
                </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                <TableRow striped={true}>
                 <TableHeaderColumn>Bob Smith</TableHeaderColumn>
                 <TableHeaderColumn>Vampire</TableHeaderColumn>
                 <TableHeaderColumn>7/28/2017</TableHeaderColumn>
                </TableRow>
                <TableRow>
                 <TableHeaderColumn>Sue Wanker</TableHeaderColumn>
                 <TableHeaderColumn>Ghost</TableHeaderColumn>
                 <TableHeaderColumn>7/30/2017</TableHeaderColumn>
                </TableRow>
                <TableRow>
                 <TableHeaderColumn>Abdul Jsecklas</TableHeaderColumn>
                 <TableHeaderColumn>Werewolf</TableHeaderColumn>
                 <TableHeaderColumn>8/15/2017</TableHeaderColumn>
                </TableRow>
                </TableBody>
              </Table>
              <Schedule/>
             </CardText>
          </Card>
          <Card className="md-card">
           <CardHeader
             title='Healthcare Team'
             subtitle='Important Contacts & Information'
             actAsExpander={true}
             showExpandableButton={true}/>
             <CardText expandable={true}>
              <Contacts/>
              <Add/>
             </CardText>
          </Card>
          <Card className="md-card">
           <CardHeader
             title='Doctor Questions'
             subtitle='Question & Note & To Do'
             actAsExpander={true}
             showExpandableButton={true}/>
             <CardText expandable={true}>
              <List>
              <ListItem leftCheckbox={<Checkbox/>} primaryText='Hello there'/>
              <ListItem leftCheckbox={<Checkbox/>} primaryText='Can I have pie?'/>
              </List>
             </CardText>
          </Card>
        </div>
      </div>
    );
  }
}
function mapStateToProps (state) {
  return {contacts: state}
}

function mapDispatchToProps (dispatch) {
  return {
    onSubmit: function (data) {
      dispatch(addContact(data))
    }
  }
}

Main = connect(mapStateToProps, mapDispatchToProps)(Main)
export default Main