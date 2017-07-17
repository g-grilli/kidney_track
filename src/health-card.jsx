import React, {Component} from 'react';

import {Card, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';

import {editHealth, deleteHealth, doExpand} from './actions.js';
import {connect} from 'react-redux';

class HealthCard extends Component {
  
  handleSubmit(event) {
    console.log('submitted: ' + this.state.date +' '+ this.state.weight);
    event.preventDefault();
  }
  
  handleEditHealth = (index) => {
    console.log('submitted', this.state);
    this.props.onSubmit(index, this.props.health);
    this.setState({open: true});
  }

  handleDeleteHealth = (findex, oindex) => {
    console.log(this.props);
    console.log(findex, oindex)
    this.props.doDelete(findex, oindex);
  }

  handleField (event, field, findex, oindex) {
    console.log(event.target.value);
    var new_health = Object.assign(
      {},
      this.props.health,
      {[field]: event.target.value}
    );
    
    this.props.onSubmit(findex, new_health);
  }
  
  render () {
    
    
    
    return (
      <div>
      <Card className="md-card">
        <CardHeader
          title={this.props.health.date}
          subtitle={this.props.health.weight}
          actAsExpander={true}
          showExpandableButton={true}/>
        <CardText expandable={true}>
          <TextField floatingLabelText="Date" value={this.props.health.date} onChange={(event) => this.handleField(event, 'drugName', this.props.index, this.props.health.orig)}/><br/>
          <br/>
          <TextField floatingLabelText="Weight" value={this.props.health.weight} onChange={(event) => this.handleField(event, 'dosage', this.props.index, this.props.health.orig)}/><br/>
          <br/>
          <TextField floatingLabelText="Systolic" value={this.props.health.systolic} onChange={(event) => this.handleField(event, 'morning', this.props.index, this.props.health.orig)}/><br/>
          <br/>
          <TextField floatingLabelText="Diastolic" value={this.props.health.diastolic} onChange={(event) => this.handleField(event, 'noon', this.props.index, this.props.health.orig)}/><br/>
          <br/>
          <TextField floatingLabelText="Notes" value={this.props.health.notes} onChange={(event) => this.handleField(event, 'evening', this.props.index, this.props.health.orig)} />
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
      dispatch(editHealth(index, data))
    },
    doDelete: function (findex, oindex) {
      dispatch(deleteHealth(findex, oindex))
    }
  }
}

HealthCard =  connect(
  mapStateToProps, mapDispatchToProps)(HealthCard);
  
export default HealthCard