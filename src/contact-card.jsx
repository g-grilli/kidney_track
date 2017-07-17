import React, {Component} from 'react';

import {Card, CardHeader, CardActions, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import {editContact, deleteContact, doSort, doSearch, doExpand} from './actions.js';
import {connect} from 'react-redux';

class ContactCard extends Component {
  
  handleExpandChange = (index, expanded) => {
    this.props.doExpand(index, expanded);
    
    if (!expanded) {
      this.props.doSort();
    }
  };
  
  handleSubmit(event) {
    console.log('submitted: ' + this.state.lastName +' '+ this.state.email);
    event.preventDefault();
  }
  
  handleEditContact = (index) => {
    console.log('submitted', this.state);
    this.props.onSubmit(index, this.props.contact);
    this.setState({open: true});
  }

  handleDeleteContact = (findex, oindex) => {
    console.log(this.props);
    console.log(findex, oindex)
    this.props.doDelete(findex, oindex);
  }

  handleField (event, field, findex, oindex) {
    console.log(event.target.value);
    var new_contact = Object.assign(
      {},
      this.props.contact,
      {[field]: event.target.value}
    );
    
    this.props.onSubmit(findex, new_contact);
  }
  
  render () {
    
    
    
    return (
      <Card className="md-card" expanded={this.props.expanded} onExpandChange={(e) => this.handleExpandChange(this.props.index, e)}>
        <CardHeader
          title={this.props.contact.lastName}
          subtitle={this.props.contact.specialty}
          actAsExpander={true}
          showExpandableButton={true}/>
        <CardText expandable={true}>
          <TextField floatingLabelText="First Name" value={this.props.contact.firstName} onChange={(event) => this.handleField(event, 'firstName', this.props.index, this.props.contact.orig)}/><br/>
          Address:<br/>
          <TextField floatingLabelText="Last Name" value={this.props.contact.lastName} onChange={(event) => this.handleField(event, 'lastName', this.props.index, this.props.contact.orig)}/><br/>
          Address:<br/>
          <TextField floatingLabelText="Specialty" value={this.props.contact.specialty} onChange={(event) => this.handleField(event, 'specialty', this.props.index, this.props.contact.orig)}/><br/>
          Address:<br/>
          <TextField floatingLabelText="Practice" value={this.props.contact.practice} onChange={(event) => this.handleField(event, 'practice', this.props.index, this.props.contact.orig)}/><br/>
          Address:<br/>
          <TextField floatingLabelText="Address" value={this.props.contact.address} onChange={(event) => this.handleField(event, 'address', this.props.index, this.props.contact.orig)} />
          <br/>
          <TextField floatingLabelText="City" value={this.props.contact.city} onChange={(event) => this.handleField(event, 'city', this.props.index, this.props.contact.orig)}/> 
          <TextField floatingLabelText="State" value={this.props.contact.state} onChange={(event) => this.handleField(event, 'state', this.props.index, this.props.contact.orig)}/> 
          <TextField floatingLabelText="Zip Code" value={this.props.contact.zipCode}onChange={(event) => this.handleField(event, 'zipCode', this.props.index, this.props.contact.orig)}/>
          <br/><br/>
          <TextField floatingLabelText="Phone" value={this.props.contact.phone}onChange={(event) => this.handleField(event, 'phone', this.props.index, this.props.contact.orig)}/>
          <br/><br/>
          <TextField floatingLabelText="E-mail" value={this.props.contact.email}onChange={(event) => this.handleField(event, 'email', this.props.index, this.props.contact.orig)}/>
          <CardActions>
           <FlatButton label="Favorite" primary={true} onTouchTap={this.handleMakeFavorite} />
           <FlatButton type="submit" label='DELETE' primary={true} onClick={() => this.handleDeleteContact(this.props.index, this.props.contact.orig)}/>
           </CardActions>
          </CardText>
      </Card>
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
      dispatch(editContact(index, data))
    },
    doDelete: function (findex, oindex) {
      dispatch(deleteContact(findex, oindex))
    },
    doSort: function () {
      dispatch(doSort());
    },
    doSearch: function(term) {
      dispatch(doSearch(term));
    },
    doExpand: function(index, expanded) {
      dispatch(doExpand(index, expanded));
    }
  }
}

ContactCard =  connect(
  mapStateToProps, mapDispatchToProps)(ContactCard);
  
export default ContactCard
