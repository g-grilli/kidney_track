import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Schedule from './schedule'
import Contacts from './contact-card'
import Add from './add'
import Medication from './medication'

import { addContact } from './actions.js';
import { connect } from 'react-redux';


class Main extends Component {
  state = {
    open: false
    };
    
  handleExpandChange = (expanded) => {
  this.setState({expanded: expanded});
};
  
  render() {
    return (
      <div>
        <div>
          <Card className="md-card">
            <CardHeader
             title='Prescriptions'
             subtitle='Schedule'
             actAsExpander={true}
             showExpandableButton={true}/>
             <CardText expandable={true}>
              <Medication/>
              <table>
                <tr>
                 <th>Medication</th>
                 <th>Dosage</th>
                 <th>Morning</th>
                 <th>Afternoon</th>
                 <th>Evening</th>
                 <th>Bed Time</th>
                </tr>
                <tr>
                 <th>Asprin</th>
                 <th>500mg</th>
                 <th>true</th>
                 <th>false</th>
                 <th>false</th>
                 <th>false</th>
                </tr>
                <tr>
                 <th>Placebo</th>
                 <th>1mg</th>
                 <th>false</th>
                 <th>false</th>
                 <th>false</th>
                 <th>true</th>
                </tr>
              </table>
             </CardText>
          </Card>
          <Card className="md-card">
           <CardHeader
             title='Weight & Blood Pressure'
             subtitle='Entry & History'
             actAsExpander={true}
             showExpandableButton={true}/>
             <CardText expandable={true}>
              <table>
                <tr>
                 <th>Weight lbs.</th>
                 <th>Systolic</th>
                 <th>Diastolic</th>
                </tr>
                <tr>
                 <th>115</th>
                 <th>80</th>
                 <th>70</th>
                </tr>
                <tr>
                 <th>117</th>
                 <th>90</th>
                 <th>83</th>
                </tr>
              </table>
             </CardText>
          </Card>
          <Card className="md-card">
           <CardHeader
             title='Doctor & Clinic Visits'
             subtitle='Entry & History'
             actAsExpander={true}
             showExpandableButton={true}/>
             <CardText expandable={true}>
              <table>
                <tr>
                 <th>Doctor</th>
                 <th>Specialty</th>
                 <th>Date</th>
                </tr>
                <tr>
                 <th>Bob Smith</th>
                 <th>Vampire</th>
                 <th>7/28/2017</th>
                </tr>
                <tr>
                 <th>Sue Wanker</th>
                 <th>Ghost</th>
                 <th>7/30/2017</th>
                </tr>
                <tr>
                 <th>Abdul Jsecklas</th>
                 <th>Werewolf</th>
                 <th>8/15/2017</th>
                </tr>
              </table>
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
              <Add/>
             </CardText>
          </Card>
          <Card className="md-card">
           <CardHeader
             title='Doctor Questions'
             subtitle='Entry & History'
             actAsExpander={true}
             showExpandableButton={true}/>
             <CardText expandable={true}>
              <ul>
              <li>Where's Waldo</li>
              </ul>
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