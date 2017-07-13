import React, { Component } from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import database, {User} from './fsociety';
import { addContact } from './actions.js';
import { connect } from 'react-redux';

const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};

class Add extends Component {
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
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      specialty: '',
      practice:'',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      contacts: []
    };
    
    this.state.display_contacts = this.state.contacts;
    
    this.read_data();
  }
  read_data () {
    if (User.user) {
      database.ref('contacts/' + User.user.uid)
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

handleAddContact = () => {
  this.props.onSubmit({
    firstName: this.state.firstName,
    lastName: this.state.lastName,
    practice: this.state.practice,
    specialty: this.state.specialty,
    email: this.state.email, 
    phone: this.state.phone, 
    address: this.state.address, 
    city: this.state.city, 
    state: this.state.state, 
    zipCode: this.state.zipCode,
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
        <CardTitle title="Add New Contact"/>
          <CardText>
           <TextField floatingLabelText="First Name"
           value={this.state.firstName}
           onChange={event => this.update_state(event, 'firstName')}/>
           <br/>
           <TextField floatingLabelText="Last Name"
           value={this.state.lastName}
           onChange={event => this.update_state(event, 'lastName')}/>
           <br/>
           <TextField floatingLabelText="Specialty"
           value={this.state.specialty}
           onChange={event => this.update_state(event, 'specialty')}/>
           <br/>
           <TextField floatingLabelText="Practice"
           value={this.state.practice}
           onChange={event => this.update_state(event, 'practice')}/>
           <br/>
           <TextField floatingLabelText="E-mail"
           value={this.state.email}
           onChange={event => this.update_state(event, 'email')}/>
           <br/>
            <TextField floatingLabelText="Phone"
           value={this.state.phone}
           onChange={event => this.update_state(event, 'phone')}/>
           <br/>
           <TextField floatingLabelText="Street Address"
           value={this.state.address}
           onChange={event => this.update_state(event, 'address')}/>
           <br/>
           <TextField floatingLabelText="City"
           value={this.state.city}
           onChange={event => this.update_state(event, 'city')}/>
           <br/>
           <TextField floatingLabelText="State"
           value={this.state.state}
           onChange={event => this.update_state(event, 'state')}/>
           <br/>
           <TextField floatingLabelText="Zip Code"
           value={this.state.zipCode}
           onChange={event => this.update_state(event, 'zipCode')}/>
          </CardText>
          <CardActions>
          <RaisedButton type="submit" label="Add Care Team Member" primary={true} onTouchTap={this.handleAddContact}/>
           <Dialog
            title="Add Contact"
            actions={actions}
            modal={true}
            contentStyle={customContentStyle}
            open={this.state.open}
            >
            A new contact has been added.
           </Dialog>
           <RaisedButton label="View Contacts" primary={true} href='/contacts' />
          </CardActions> 
        </Card>
       </form>
      </div>
      
    );
  } 
}

//export default Add
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

Add = connect(mapStateToProps, mapDispatchToProps)(Add)

export default Add