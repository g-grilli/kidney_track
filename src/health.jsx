import React, { Component } from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import database, {User} from './fsociety';
import { addHealth } from './actions';
import { connect } from 'react-redux';

const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};

class Health extends Component {
  
 state = {
  open: false
 };
 
 handleChangeDate = (event, healthDate) => {
    this.setState({healthDate: healthDate});
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
      healthDate: '',
      weight: '',
      systolic: '',
      diastolic: '',
      notes: '',
      health: []
    };
    
    this.state.display_health = this.state.health;
    
    this.read_data();
  }
  read_data () {
    if (User.user) {
      database.ref('health/' + User.user.uid)
        .once('value').then((health) => {
          health = health.val();
          console.log(health);
          if (health) {
            this.state.health = health;
            this.setState({health: this.state.health});
            this.state.display_health = this.state.health;
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
  console.log(this.state.healthDate.getTime());
  console.log('submitted: ' + this.state.healthDate +' '+ this.state.weight + this.state.diastolic +' '+ this.state.systolic);
  event.preventDefault();
}

handleAddHealth = () => {
  this.props.onSubmit({
    healthDate: this.state.healthDate,
    weight: this.state.weight,
    systolic: this.state.systolic,
    diastolic: this.state.diastolic,
    notes: this.state.notes,
    isOpened: false
  });
  
  this.setState({open: true});
}

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
        <CardTitle title="Add Health"/>
          <CardText>
           <DatePicker hintText="Entry Date" mode="landscape"
            value={this.state.healthDate}
            onChange={this.handleChangeDate}/>
           <br/>
           <TextField floatingLabelText="Weight"
            value={this.state.weight}
            onChange={event => this.update_state(event, 'weight')}/>
           <br/>
           <TextField floatingLabelText="Systolic"
            value={this.state.systolic}
            onChange={event => this.update_state(event, 'systolic')}/>
           <br/>
           <TextField floatingLabelText="Diastolic"
            value={this.state.diastolic}
            onChange={event => this.update_state(event, 'diastolic')}/>
           <br/>
           <TextField floatingLabelText="Notes"
            value={this.state.notes}
            onChange={event => this.update_state(event, 'notes')}/>
           <br/>
          </CardText>
          <CardActions>
          <RaisedButton type="submit" label="Add Readings" primary={true} onTouchTap={this.handleAddHealth}/>
           <Dialog
            title="Health"
            actions={actions}
            modal={true}
            contentStyle={customContentStyle}
            open={this.state.open}
            >
            Great job! You succesfully added your health information.
           </Dialog>
          </CardActions> 
        </Card>
       </form>
      </div>
      
    );
  } 
}


function mapStateToProps (state) {
  return {health: state.health}
}

function mapDispatchToProps (dispatch) {
  return {
    onSubmit: function (data) {
      dispatch(addHealth(data))
    }
  }
}

Health = connect(mapStateToProps, mapDispatchToProps)(Health)


export default Health