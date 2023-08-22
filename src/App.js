import React from 'react';
import './App.css';
import {Route,Switch,Redirect} from "react-router-dom"

import Login from './Pages/Login';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import ForgotPassword from './Pages/ForgotPassword';
import {  useSelector } from 'react-redux/es/hooks/useSelector';

function App() {
  const isAuthenticated= useSelector(state=>state.auth.isAuthenticated);
  const theme= useSelector(state=>state.theme.theme)
  return (
   <div className={theme}>
     <Switch>
      <Route path="/" exact >
        <Login/>
      </Route>
      {isAuthenticated && <Route path="/home" >
        <Home/>
      </Route>}
      {isAuthenticated && <Route path="/profile" >
        <Profile/>
      </Route>}
      <Route path="/forgotpassword" >
        <ForgotPassword/>
      </Route>
      <Route path="*">
        <Redirect to="/"></Redirect>

        </Route>
    </Switch>
   </div>
  );
}

export default App;
