import React, { Component } from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/RaisedButton';
import {auth} from './fsociety'
import './App.css'

class Main extends Component {
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
    constructor (props) {
        super(props);

        this.state = {
            videoURL: '//www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4'
        }
    }
    render () {
        return (
          <div className='fullscreen-bg'>
            <Card className="md-card">
             <CardTitle title="Login"/>
              <CardText>
               <TextField floatingLabelText="E-mail" value={this.state.email} />
               <TextField floatingLabelText="Password" value={this.state.password} />
               <RaisedButton label="Submit" primary={true} href='./main'/>
               <RaisedButton label="Log In" onClick={(e) => this.login(e)}/>
              </CardText>
            </Card>
  
            <video id="background-video" loop autoPlay>
                <source src={this.state.videoURL} type="video/mp4" />
                <source src={this.state.videoURL} type="video/ogg" />
                Your browser does not support the video tag.
            </video>
          </div>
        )
    }
};
export default Main