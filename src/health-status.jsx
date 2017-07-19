import React, { Component } from 'react';
import {Card, CardTitle } from 'material-ui/Card';
import './App.css'
import {editHealth, deleteHealth, doHSort, doHSearch} from './actions.js';
import HealthCard from './health-card';
import {connect} from 'react-redux';

class HealthStatus extends Component {
  

    render() {
    return (
      <div>
       <Card className="md-card">
        <CardTitle title="Daily Check-In" subtitle="Weight and Blood Pressure"/>
       {this.props.filtered_health.map((c, index) => {
        return (
            <HealthCard health={c} expanded={c.expanded} index={index} key={c.weight}/>
            )
          })}
        </Card>
      </div>
    );
  } 
}

function mapStateToProps (state) {
  return {
    health: state.health,
    filtered_health: state.filtered_health,
    term: state.term
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onSubmit: function (index, data) {
      dispatch(editHealth(index, data))
    },
    doDelete: function (index) {
      dispatch(deleteHealth(index))
    },
    doHSort: function () {
      dispatch(doHSort());
    },
    doHSearch: function(term) {
      dispatch(doHSearch(term));
    }
  }
}

HealthStatus =  connect(
  mapStateToProps, mapDispatchToProps)(HealthStatus);

export default HealthStatus