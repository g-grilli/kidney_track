import React, { Component } from 'react';
import {Card, CardTitle, CardActions} from 'material-ui/Card';
import './App.css'
import {editMed, deleteMed, doMSearch, doMSort} from './actions.js';
import MedCard from './med-card';
import {connect} from 'react-redux';

class Meds extends Component {
  

    render() {
      console.log(this.props.meds);
    return (
      <div>
       <Card className="md-card">
        <CardTitle title="Prescriptions" subtitle="Dosage & Schedule"/>
       
       {this.props.filtered_meds.map((c, index) => {
        return (
          <MedCard med={c} expanded={c.expanded} index={index} key={c.drugName}/>
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
    meds: state.meds,
    filtered_meds: state.filtered_meds,
    term: state.term

  }
}

function mapDispatchToProps (dispatch) {
  return {
    onSubmit: function (index, data) {
      dispatch(editMed(index, data))
    },
    doDelete: function (index) {
      dispatch(deleteMed(index))
    },
    doMSort: function () {
      dispatch(doMSort());
    },
    doMSearch: function(term2) {
      dispatch(doMSearch(term2));
    }
  }
}

Meds =  connect(
  mapStateToProps, mapDispatchToProps)(Meds);

export default Meds