import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import AnonRoute from './components/AnonRoute.js';

import WelcomePage from './pages/WelcomePage';
import HomePage from './pages/HomePage';
import Favorites from './pages/Favorites';
import GnomeDetail from './pages/GnomeDetail';
import NotFound from './pages/NotFound';

import './sass/main.scss';
import AuthProvider from './contexts/auth-context';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Router>
          <Switch>
            <Redirect exact path="/" to="/welcome" />
            <Redirect exact path="/gnomes" to="/welcome" />
            <AnonRoute exact path='/welcome' component={WelcomePage} />
            <Route exact path='/homepage' component={HomePage} />
            <Route exact path='/favorites' component={Favorites} />
            <Route exact path='/gnomes/:id' component={GnomeDetail} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </AuthProvider>
    );
  }
}

export default App;
