import React from 'react';
import './App.css';
import {Route,Switch,Redirect} from "react-router-dom"

import Login from './Pages/Login';
import Home from './Pages/Home';
import Profile from './Pages/Profile';

function App() {
  return (
    <Switch>
      <Route path="/" exact >
        <Login/>
      </Route>
      <Route path="/home" >
        <Home/>
      </Route>
      <Route path="/profile" >
        <Profile/>
      </Route>
      <Route path="*">
        <Redirect to="/"></Redirect>

        </Route>
    </Switch>
  );
}

export default App;
