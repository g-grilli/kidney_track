import React, { Component } from 'react';
import {Card, CardHeader, CardTitle, CardActions, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import movie from './logo.svg';
import './App.css'

class Main extends Component {
    constructor (props) {
        super(props);

        this.state = {
            videoURL: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4'
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
               <RaisedButton type="submit" label="Submit" primary={true} href='./main' />
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