import React, {Component} from 'react';
import {Card, CardTitle, CardActions, CardText} from 'material-ui/Card';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


import {editContact, deleteContact, doSort, doSearch} from './actions.js';
import {connect} from 'react-redux';
import ContactCard from './contact-card';

class Contacts extends Component {

  do_search (event) {
    var term = event.target.value;
    this.props.doSearch(term);
  }

  render() {
    return (
      <div>
       <Card className="md-card">
        <CardTitle title="Search Contacts"/>
         <CardText expandable={false}>
          <TextField floatingLabelText="Search"
          value={this.props.term}
           onChange={event => this.do_search(event)}/>
         </CardText>
       </Card>
       <Card className="md-card">
        <CardTitle title="Contact List" subtitle="Click Name For Details"/>
       </Card>
       {this.props.filtered_contacts.map((c, index) => {
        return (
              <ContactCard contact={c} expanded={c.expanded} index={index} key={c.name}/>
            )
          })}
        <Card className="md-card"> 
        <CardActions> 
          <RaisedButton type="submit" label="Add Contacts" primary={true} href='./add' />
          </CardActions>
        </Card>
       </div>
    );
  } 
}

function mapStateToProps (state) {
  return {
    contacts: state.contacts,
    filtered_contacts: state.filtered,
    term: state.term
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onSubmit: function (index, data) {
      dispatch(editContact(index, data))
    },
    doDelete: function (index) {
      dispatch(deleteContact(index))
    },
    doSort: function () {
      dispatch(doSort());
    },
    doSearch: function(term) {
      dispatch(doSearch(term));
    }
  }
}

Contacts =  connect(
  mapStateToProps, mapDispatchToProps)(Contacts);


export default Contacts
