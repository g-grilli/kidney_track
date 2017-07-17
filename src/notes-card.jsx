import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardHeader, CardActions, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import {editNotes, deleteNotes, doExpand} from './actions.js';
import {connect} from 'react-redux';

class NotesCard extends Component {
  
  handleSubmit(event) {
    console.log('submitted: ' + this.state.date +' '+ this.state.note);
    event.preventDefault();
  }
  
  handleEditNotes = (index) => {
    console.log('submitted', this.state);
    this.props.onSubmit(index, this.props.notes);
    this.setState({open: true});
  }

  handleDeleteNotes = (findex, oindex) => {
    console.log(this.props);
    console.log(findex, oindex)
    this.props.doDelete(findex, oindex);
  }

  handleField (event, field, findex, oindex) {
    console.log(event.target.value);
    var new_notes = Object.assign(
      {},
      this.props.notes,
      {[field]: event.target.value}
    );
    
    this.props.onSubmit(findex, new_notes);
  }
  
  render () {
    
    
    
    return (
      <div>
      <Card className="md-card">
        <CardHeader
          title={this.props.notes.date}
          subtitle={this.props.notes.note}
          actAsExpander={true}
          showExpandableButton={true}/>
        <CardText expandable={true}>
          <TextField floatingLabelText="Date" value={this.props.notes.date} onChange={(event) => this.handleField(event, 'date', this.props.index, this.props.notes.orig)}/><br/>
          <br/>
          <TextField floatingLabelText="Note" value={this.props.notes.note} onChange={(event) => this.handleField(event, 'note', this.props.index, this.props.notes.orig)}/><br/>
          <CardActions>
           <FlatButton label="Favorite" primary={true} onTouchTap={this.handleMakeFavorite} />
           <FlatButton type="submit" label='DELETE' primary={true} onClick={() => this.handleDeleteContact(this.props.index, this.props.contact.orig)}/>
           </CardActions>
          </CardText>
      </Card>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onSubmit: function (index, data) {
      dispatch(editNotes(index, data))
    },
    doDelete: function (findex, oindex) {
      dispatch(deleteNotes(findex, oindex))
    }
  }
}

NotesCard =  connect(
  mapStateToProps, mapDispatchToProps)(NotesCard);
  
export default NotesCard