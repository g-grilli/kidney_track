import React, { Component } from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import database, {User} from './fsociety';
import { addMed } from './actions.js';
import { connect } from 'react-redux';

const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};

class Medication extends Component {
  state = {
    open: false
    };
    
 handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };
  constructor(props) {
    super(props);
    
    this.state = {
      drug_name: '',
      dosage: '',
      morning: false,
      afternoon: false,
      evening: false,
      bed_time:false,
      meds: []
    };
    
    this.state.display_contacts = this.state.contacts;
    
    this.read_data();
  }
  read_data () {
    if (User.user) {
      database.ref('meds/' + User.user.uid)
        .once('value').then((contacts) => {
          contacts = contacts.val();
          console.log(contacts);
          if (contacts) {
            this.state.contacts = contacts;
            this.setState({contacts: this.state.contacts});
            //this.state.contacts.sort(compare);
            this.state.display_contacts = this.state.contacts;
          }
        });
    } else {
      setTimeout(() => {
        this.read_data();
      }, 300);
    }
  }
  
update_state (event, key) {
console.log(event.target.value);
console.log(event.target);
this.setState({[key]: event.target.value});
var new_state = {};
new_state[key] = event.target.value;
this.setState({new_state});
}  

handleSubmit(event) {
  console.log('submitted: ' + this.state.firstName +' '+ this.state.email);
  event.preventDefault();
}

handleAddMed = () => {
  this.props.onSubmit({
    firstName: this.state.drug_name,
    lastName: this.state.dosage,
    practice: this.state.morning,
    specialty: this.state.afternoon,
    email: this.state.evening, 
    phone: this.state.bed_time, 
    isOpened: false
  });
  
  this.setState({open: true});
}

handleExpandChange = (expanded) => {
  this.setState({expanded: expanded});
};

handleExpandChange = (expanded) => {
  this.setState({expanded: expanded});
};
    render() {
      const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];
    return (
      <div>
       <form onSubmit={event => this.handleSubmit(event)}>
       <Card classfirstName="md-card">
        <CardTitle title="Add Medication"/>
          <CardText>
           <TextField floatingLabelText="Drug Name"
           value={this.state.drug_name}
           onChange={event => this.update_state(event, 'drugName')}/>
           <br/>
           <TextField floatingLabelText="Dosage"
           value={this.state.dosage}
           onChange={event => this.update_state(event, 'dosage')}/>
           <br/>
           <TextField floatingLabelText="Morning"
           value={this.state.morning}
           onChange={event => this.update_state(event, 'morning')}/>
           <br/>
           <TextField floatingLabelText="Afternoon"
           value={this.state.afternoon}
           onChange={event => this.update_state(event, 'afternoon')}/>
           <br/>
           <TextField floatingLabelText="Evening"
           value={this.state.evening}
           onChange={event => this.update_state(event, 'evening')}/>
           <br/>
            <TextField floatingLabelText="Bed Time"
           value={this.state.bed_time}
           onChange={event => this.update_state(event, 'bed_time')}/>
           <br/>
           <TextField floatingLabelText="Notes"
           value={this.state.notes}
           onChange={event => this.update_state(event, 'notes')}/>
           <br/>
          </CardText>
          <CardActions>
          <RaisedButton type="submit" label="Add Medication" primary={true} onTouchTap={this.handleMedicationContact}/>
           <Dialog
            title="Medication Contact"
            actions={actions}
            modal={true}
            contentStyle={customContentStyle}
            open={this.state.open}
            >
            A new prescription has been added.
           </Dialog>
           <RaisedButton label="View Contacts" primary={true} href='/contacts' />
          </CardActions> 
        </Card>
       </form>
      </div>
      
    );
  } 
}

//export default Medication
function mapStateToProps (state) {
  return {meds: state}
}

function mapDispatchToProps (dispatch) {
  return {
    onSubmit: function (data) {
      dispatch(addMed(data))
    }
  }
}

Medication = connect(mapStateToProps, mapDispatchToProps)(Medication)

export default Medication