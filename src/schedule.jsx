import React, { Component } from 'react';
import {Card, CardHeader, CardTitle, CardActions, CardText} from 'material-ui/Card';
import TimePicker from 'material-ui/TimePicker';
import './App.css'

class Schedule extends Component {
   constructor(props) {
    super(props);
    this.state = {value24: null, value12: null};
  }

  handleChangeTimePicker24 = (event, date) => {
    this.setState({value24: date});
  };

  handleChangeTimePicker12 = (event, date) => {
    this.setState({value12: date});
  };
    render() {
    return (
      <div>
      <Card className="md-card">
        <TimePicker
          format="ampm"
          hintText="12hr Format"
          value={this.state.value12}
          onChange={this.handleChangeTimePicker12}
        />
      </Card>
      </div>
    );
  }
}



export default Schedule