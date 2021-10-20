import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Dashboard from './components/main/Dashboard';
import Home from './components/main/Home';
import Header from './components/main/Header';
import Login from './components/login/Login';
import './App.css';

function App() {
  return (
    <div id="container">
    <Router>
      <Header />
      <div id="content">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/dashboard" component={Dashboard}/>
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;
