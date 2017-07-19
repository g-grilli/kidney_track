import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardHeader, CardActions, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';

import {editHealth, deleteHealth, doHExpand, doHSort, doHSearch} from './actions.js';
import {connect} from 'react-redux';

class HealthCard extends Component {
  
  handleExpandChange = (index, expanded) => {
    this.props.doHExpand(index, expanded);
    console.log(this.props);
    if (!expanded) {
      this.props.doHSort();
    }
  };
  
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };
  
  handleSubmit(event) {
    console.log(this.state.healthDate);
    
    console.log('submitted: ' + this.state.healthDate +' '+ this.state.weight +' '+ this.state.systolic +' '+ this.state.diastolic +' '+ this.state.notes);
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
      <Card className="md-card" expanded={this.props.expanded} onExpandChange={(e) => this.handleExpandChange(this.props.index, e)}>
        <CardHeader
          title={this.props.health.healthDate}
          subtitle={this.props.health.weight}
          actAsExpander={true}
          showExpandableButton={true}/>
        <CardText expandable={true}>
          <TextField floatingLabelText="Date" 
          value={this.props.health.healthDate} 
          onChange={(event) => this.handleField(event, 'healthDate', this.props.index, this.props.health.orig)}/><br/>
          <br/>
          <TextField floatingLabelText="Weight" 
          value={this.props.health.weight} 
          onChange={(event) => this.handleField(event, 'weight', this.props.index, this.props.health.orig)}/><br/>
          <br/>
          <TextField floatingLabelText="Systolic" 
          value={this.props.health.systolic} 
          onChange={(event) => this.handleField(event, 'systolic', this.props.index, this.props.health.orig)}/><br/>
          <br/>
          <TextField floatingLabelText="Diastolic" 
          value={this.props.health.diastolic} 
          onChange={(event) => this.handleField(event, 'diastolic', this.props.index, this.props.health.orig)}/><br/>
          <br/>
          <TextField floatingLabelText="Notes" 
          value={this.props.health.notes} 
          onChange={(event) => this.handleField(event, 'notes', this.props.index, this.props.health.orig)} />
         <CardActions>
           <FlatButton label="Favorite" primary={true} onTouchTap={this.handleMakeFavorite} />
           <FlatButton type="submit" label='DELETE' primary={true} onClick={() => this.handleDeleteHealth(this.props.index, this.props.health.orig)}/>
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
      dispatch(editHealth(index, data))
    },
    doDelete: function (findex, oindex) {
      dispatch(deleteHealth(findex, oindex))
    },
    doHSort: function () {
      dispatch(doHSort());
    },
    doHSearch: function(term2) {
      dispatch(doHSearch(term2));
    },
    doHExpand: function(index, expanded) {
      dispatch(doHExpand(index, expanded));
    }
  }
}

HealthCard =  connect(
  mapStateToProps, mapDispatchToProps)(HealthCard);
  
export default HealthCard