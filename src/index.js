import React from "react";
import ReactDOM from "react-dom";

import "assets/css/material-dashboard-react.css?v=1.7.0";
//Store
import {Provider} from "react-redux";
import store from "store";

import App from "./App";


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root")
);
