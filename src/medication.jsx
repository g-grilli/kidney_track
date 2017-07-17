import React, { Component } from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import database, {User} from './fsociety';
import { addMed } from './actions';
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
      drugName: '',
      dosage: '',
      morning: false,
      afternoon: false,
      evening: false,
      bedTime:false,
      meds: []
    };
    
    this.state.display_meds = this.state.meds;
    
    this.read_data();
  }
  read_data () {
    if (User.user) {
      database.ref('meds/' + User.user.uid)
        .once('value').then((meds) => {
          meds = meds.val();
          console.log(meds);
          if (meds) {
            this.state.meds = meds;
            this.setState({meds: this.state.meds});
            this.state.display_meds = this.state.meds;
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
  console.log('submitted: ' + this.state.drugName +' '+ this.state.dosage);
  event.preventDefault();
}

handleAddMed = () => {
  this.props.onSubmit({
    drugName: this.state.drugName,
    dosage: this.state.dosage,
    morning: this.state.morning,
    afternoon: this.state.afternoon,
    evening: this.state.evening, 
    bedTime: this.state.bedTime, 
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
           value={this.state.drugName}
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
           value={this.state.bedTime}
           onChange={event => this.update_state(event, 'bedTime')}/>
           <br/>
           <TextField floatingLabelText="Notes"
           value={this.state.notes}
           onChange={event => this.update_state(event, 'notes')}/>
           <br/>
          </CardText>
          <CardActions>
          <RaisedButton type="submit" label="Add Medication" primary={true} onTouchTap={this.handleAddMed}/>
           <Dialog
            title="Medication"
            actions={actions}
            modal={true}
            contentStyle={customContentStyle}
            open={this.state.open}
            >
            A new prescription has been added.
           </Dialog>
          </CardActions> 
        </Card>
       </form>
      </div>
      
    );
  } 
}

//export default Medication
function mapStateToProps (state) {
  return {meds: state.meds}
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