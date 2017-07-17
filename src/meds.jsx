import React, { Component } from 'react';
import {Card, CardTitle, CardActions} from 'material-ui/Card';
import './App.css'
import {editMed, deleteMed} from './actions.js';
import MedCard from './med-card';
import {connect} from 'react-redux';

class Meds extends Component {
  

    render() {
      console.log(this.props.meds);
    return (
      <div>
       <Card className="md-card">
        <CardTitle title="Prescriptions" subtitle="Dosage & Schedule"/>
       
       {this.props.meds.map((c, index) => {
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
    meds: state.meds
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onSubmit: function (index, data) {
      dispatch(editMed(index, data))
    },
    doDelete: function (index) {
      dispatch(deleteMed(index))
    }
  }
}

Meds =  connect(
  mapStateToProps, mapDispatchToProps)(Meds);

export default Meds