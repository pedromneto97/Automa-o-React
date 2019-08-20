import React from "react";
import ReactDOM from "react-dom";
import {createBrowserHistory} from "history";
import {Redirect, Route, Router, Switch} from "react-router-dom";
// core components
import Admin from "layouts/Admin.jsx";

import "assets/css/material-dashboard-react.css?v=1.6.0";
import {Provider} from "react-redux";
import store from "store";

const hist = createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
        <Router history={hist}>
            <Switch>
                <Route path="/admin" component={Admin}/>
                <Redirect from="/" to="/admin/dashboard"/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById("root")
);
