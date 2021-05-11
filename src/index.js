import React from "react";
import ReactDOM from "react-dom";
import Login from 'Login'
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "./Admin";


import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/" component={Login} />
      <Redirect from="/" to="/admin/dashboard" />
     {/* 
      <Route path="/admin" component={Admin} />
      <Redirect from="/" to="/admin/dashboard" />
      */} 
    </Switch>
  </Router>,
  document.getElementById("root")
);
