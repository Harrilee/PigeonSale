import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Profile from './profile/Profile';
import FullPost from './posts/FullPost';
import SearchPosts from './posts/SearchPost';
import Dashboard from './dashboard/Dashboard';
import Settings from './settings/Settings';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Index from './layout/Index';
import Login from './register/Login';
import Signup from './register/Signup';
import Logout from './register/Logout';
import NotFound from './layout/NotFound';
import './App.scss';

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <div id="container">
      <Router>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/logout" component={Logout}/>
        <Header />
          <div id="content">
              <Switch>
                <Route exact path="/" component={Index}/>
                <Route exact path="/user/:user_id"  component={Profile}/>  
                <Route exact path="/post/:post_id"  component={FullPost}/> 
                <Route exact path="/search/:keyword"  component={SearchPosts}/>   
                <Route exact path="/dashboard"  component={Dashboard}/>  
                <Route exact path="/settings" component={Settings}/>  
                <Route exact path="/404" component={NotFound} />
                {/* <Redirect to="/404" /> */}
              </Switch>
          </div>
        <Footer />
      </Router>
      </div>
      </ThemeProvider>
  );
}

export default App;
