import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';

import Main from '../Main/Main';
import Auth from '../Auth/Auth';
import Unauth from '../Unauth/Unauth';
import AuthService from '../_services/AuthService';
import Login from '../Login/Login';
import Lost from '../Lost/Lost';

const auth = new AuthService();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app-container">
          <Switch>
              <Route path='/login' component={Login}/>
              <Route path='/unauthorized' component={Unauth}/>
              <Route path='/auth' render={ (props) => {
                handleAuthentication(props);
                return <Auth/>;
              }}/>
              <Route path='/' exact render={ () => {
                return auth.isAuthenticated() ? (<Main/>) : (<Redirect to='/login'/>);
              }}/>
              <Route component={Lost}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
