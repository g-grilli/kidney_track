import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Schedule from './schedule'
import ScheduleStatus from './schedule-status'
import Contacts from './contacts'
import Add from './add'
import Medication from './medication'
import Meds from './meds'
import Health from './health'
import HealthStatus from './health-status'
import Notes from './notes'
import Home from './home'
import NotesStatus from './notes-status'
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
            <Meds/>
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
             <HealthStatus/>
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
              <ScheduleStatus/>
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
             <NotesStatus/>
             <Notes/>
            </CardText>
          </Card>
          <Card>
          <Home/>
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