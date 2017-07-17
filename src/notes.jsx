import React, { Component } from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import database, {User} from './fsociety';
import { addNotes } from './actions';
import { connect } from 'react-redux';

const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};

class Notes extends Component {
  
 state = {
  open: false
 };
 
 handleChangeDate = (event, date) => {
    this.setState({date: date});
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
      date: '',
      note: '',
      notes: []
    };
    
    this.state.display_notes = this.state.notes;
    
    this.read_data();
  }
  read_data () {
    if (User.user) {
      database.ref('notes/' + User.user.uid)
        .once('value').then((notes) => {
          notes = notes.val();
          console.log(notes);
          if (notes) {
            this.state.notes = notes;
            this.setState({health: this.state.notes});
            this.state.display_notes = this.state.notes;
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
  console.log('submitted: ' + this.state.date +' '+ this.state.note);
  event.preventDefault();
}

handleAddNote = () => {
  this.props.onSubmit({
    date: this.state.date,
    note: this.state.note,
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
        <CardTitle title="Add Note"/>
          <CardText>
           <DatePicker floatingLabelText="Date"
            value={this.state.date}
            onChange={event => this.update_state(event, 'date')}/>
           <br/>
           <TextField floatingLabelText="Note"
            value={this.state.note}
            onChange={event => this.update_state(event, 'note')}/>
           <br/>
          </CardText>
          <CardActions>
          <RaisedButton type="submit" label="Add Note" primary={true} onTouchTap={this.handleAddNote}/>
           <Dialog
            title="Notes"
            actions={actions}
            modal={true}
            contentStyle={customContentStyle}
            open={this.state.open}
            >
            Great job! You succesfully added a new note.
           </Dialog>
          </CardActions> 
        </Card>
       </form>
      </div>
      
    );
  } 
}


function mapStateToProps (state) {
  return {notes: state.notes}
}

function mapDispatchToProps (dispatch) {
  return {
    onSubmit: function (data) {
      dispatch(addNotes(data))
    }
  }
}

Notes = connect(mapStateToProps, mapDispatchToProps)(Notes)


export default Notes