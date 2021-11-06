import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Dashboard from './dashboard/Dashboard';
import Header from './layout/Header';
import Home from './layout/Home';
import Login from './register/Login';
import Signup from './register/Signup';
import Logout from './register/Logout';
import './App.scss';

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function App() {
  console.log(localStorage);
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
                <Route path="/dashboard" component={Dashboard}/>  
              </Switch>
          </div>
      </Router>
      </div>
      </ThemeProvider>
  );
}

export default App;
