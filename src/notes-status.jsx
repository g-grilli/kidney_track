import React, { Component } from 'react';
import {Card, CardTitle, CardActions} from 'material-ui/Card';
import './App.css'
import {editNotes, deleteNotes, doNSearch, doNSort} from './actions.js';
import NotesCard from './notes-card';
import {connect} from 'react-redux';

class NotesStatus extends Component {

    render() {
    return (
      <div>
       <Card className="md-card">
        <CardTitle title="Notes" subtitle="Miscelanous Questions & Info"/>
       
         {this.props.filtered_notes.map((c, index) => {
          return (
          <NotesCard notes={c} expanded={c.expanded} index={index} key={c.note}/>
            )
          })}
        </Card>
        <Card className="md-card"> 
        <CardActions> 
          </CardActions>
        </Card>
       
      </div>
    );
  } 
}

function mapStateToProps (state) {
  return {
    notes: state.notes,
    filtered_notes: state.filtered_notes,
    term: state.term
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onSubmit: function (index, data) {
      dispatch(editNotes(index, data))
    },
    doDelete: function (index) {
      dispatch(deleteNotes(index))
    },
    doNSort: function () {
      dispatch(doNSort());
    },
    doNSearch: function(term) {
      dispatch(doNSearch(term));
    }
  }
}

NotesStatus =  connect(
  mapStateToProps, mapDispatchToProps)(NotesStatus);

export default NotesStatus