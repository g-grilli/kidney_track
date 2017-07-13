import React, { Component } from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import logo from './logo.svg';
import AppBar from 'material-ui/AppBar';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/menu';
import FlatButton from 'material-ui/FlatButton';

import Home from './home';
import Main from './main';
import './App.css'

//import { Provider } from 'react-redux';
//import store from './store.js';

const NoMatch = ({ location }) => (
  <div>
    <h3>Page not found: {location.pathname}</h3>
  </div>
)

const AppMenu = (props) => (
  <IconMenu
   iconButtonElement={
      <IconButton><MoreVertIcon color='black'/></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem>
      <Link to="/" className="icon-menu">Home</Link>
    </MenuItem>
    <MenuItem>
      <Link to="/contacts" className="icon-menu">Contacts</Link>
    </MenuItem>
    <MenuItem>
      <Link to="/add" className="icon-menu">Add Contact</Link>
    </MenuItem>
  </IconMenu>
);

class App extends Component {

 render() {
  return (
//    <Provider store={store}>
     <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Kidney Track</h2>
        </div>
        <BrowserRouter>
         <div>
          <Switch>
           <Route exact path="/" component={Home}/>
           <Route path="/main" component={Main}/>
           <Route component={NoMatch}/>
          </Switch>
         </div>
        </BrowserRouter>
        </div>
        </MuiThemeProvider>
//    </Provider>
  );
 }
}

export default App;