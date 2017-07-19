import React, { Component } from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/RaisedButton';
import {auth} from './fsociety'
import './App.css'

class Home extends Component {
  login () {
    console.log('logging in');
  auth()
    .then(function (user) {
      console.log(user);
    })
    .catch(function (e) {
      console.log(e);
    });
 }
    render () {
        return (
          <div>
            <Card className="md-card">
              <CardText>
               <RaisedButton label="Log In" onClick={(e) => this.login(e)}/>
              </CardText>
            </Card>
          </div>
        )
    }
};
export default Home