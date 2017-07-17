import React, {Component} from 'react';

import {Card, CardHeader, CardActions, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

import {editMed, deleteMed, doExpand} from './actions.js';
import {connect} from 'react-redux';

class MedCard extends Component {
  handleExpandChange = (index, expanded) => {
    this.props.doExpand(index, expanded);
    
    if (!expanded) {
    }
  };
  
  handleSubmit(event) {
    console.log('submitted: ' + this.state.drugName +' '+ this.state.dosage);
    event.preventDefault();
  }
  
  handleEditMed = (index) => {
    console.log('submitted', this.state);
    this.props.onSubmit(index, this.props.med);
    this.setState({open: true});
  }

  handleDeleteMed = (findex, oindex) => {
    console.log(this.props);
    console.log(findex, oindex)
    this.props.doDelete(findex, oindex);
  }

  handleField (event, field, findex, oindex) {
    console.log(event.target.value);
    var new_med = Object.assign(
      {},
      this.props.med,
      {[field]: event.target.value}
    );
    
    this.props.onSubmit(findex, new_med);
  }
  
  render () {
    
    
    
    return (
      <div>
      <Card className="md-card">
        <CardHeader
          title={this.props.med.drugName}
          subtitle={this.props.med.dosage}
          actAsExpander={true}
          showExpandableButton={true}/>
        <CardText expandable={true}>
          <TextField floatingLabelText="Drug Name" 
          value={this.props.med.drugName} 
          onChange={(event) => this.handleField(event, 'drugName', this.props.index, this.props.med.orig)}/><br/>
          Address:<br/>
          <TextField floatingLabelText="Dosage" value={this.props.med.dosage} onChange={(event) => this.handleField(event, 'dosage', this.props.index, this.props.med.orig)}/><br/>
          <Checkbox label="Morning" value={this.props.med.morning} onChange={(event) => this.handleField(event, 'morning', this.props.index, this.props.med.orig)}/><br/>
          <Checkbox label="Noon" value={this.props.med.noon} onChange={(event) => this.handleField(event, 'noon', this.props.index, this.props.med.orig)}/><br/>
          <Checkbox label="Evening" value={this.props.med.evening} onChange={(event) => this.handleField(event, 'evening', this.props.index, this.props.med.orig)} />
          <br/>
          <Checkbox label="Bed Time" value={this.props.med.bedTime} onChange={(event) => this.handleField(event, 'bedTime', this.props.index, this.props.med.orig)}/> 
          <TextField label="Notes" value={this.props.med.notes} onChange={(event) => this.handleField(event, 'notes', this.props.index, this.props.med.orig)}/> 
          <CardActions>
           <FlatButton label="Favorite" primary={true} onTouchTap={this.handleMakeFavorite} />
           <FlatButton type="submit" label='DELETE' primary={true} onClick={() => this.handleDeleteMed(this.props.index, this.props.med.orig)}/>
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
      dispatch(editMed(index, data))
    },
    doDelete: function (findex, oindex) {
      dispatch(deleteMed(findex, oindex))
    },
    doExpand: function(index, expanded) {
      dispatch(doExpand(index, expanded));
    }
  }
}

MedCard =  connect(
  mapStateToProps, mapDispatchToProps)(MedCard);
  
export default MedCard