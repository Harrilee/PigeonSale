import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Profile from './profile/Profile';
import Settings from './settings/Settings';
import Header from './layout/Header';
import Home from './layout/Home';
import Login from './register/Login';
import Signup from './register/Signup';
import Logout from './register/Logout';
import './App.scss';

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <div id="container">
      <Router>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/logout" component={Logout}/>
        <Header />
          <div id="content">
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/dashboard"  component={Profile}/>  
                <Route exact path="/dashboard/settings" component={Settings}/>  
              </Switch>
          </div>
      </Router>
      </div>
      </ThemeProvider>
  );
}

export default App;
