import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Redirect, Route, Router, Switch } from "react-router-dom";
// core components
import Admin from "layouts/Admin.jsx";
import Login from "views/Login/Login.jsx";

import "assets/css/material-dashboard-react.css?v=1.6.0";

const hist = createBrowserHistory();
const auth = {
  isAuthed: false
};

function Authed(props) {
  return (
    <Switch>
      <Route path="/admin" render={(props) => <Admin {...props} auth={auth}/>}/>
      < Redirect from="/" to="/admin/dashboard"/>
    </Switch>);
}

function NotAuthed(props) {
  return (
    <Switch>
      <Route path="/login" render={(props) => <Login {...props} auth={auth}/>}/>
      < Redirect from="/" to="/login"/>
    </Switch>
  );
}

ReactDOM.render(
  <Router history={hist}>
    {auth.isAuthed ? <Authed/> : <NotAuthed/>}
  </Router>,
  document.getElementById("root")
);
