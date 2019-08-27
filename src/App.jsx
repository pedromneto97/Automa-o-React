import React, {Component} from "react";
import Login from "./views/Login/Login";
import Admin from "./layouts/Admin";
import {Redirect, Route, Router, Switch} from "react-router-dom";
import {createBrowserHistory} from "history";
import {connect} from "react-redux";

const hist = createBrowserHistory();

class App extends Component {

    render() {
        const {connection} = this.props;
        return (
            <Router history={hist}>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/admin" component={Admin}/>
                </Switch>
                {
                    connection === null || !connection.isOpen ? (
                        <Redirect to="/login"/>
                    ) : (
                        <Redirect to="/admin/dashboard"/>
                    )}
            </Router>
        );
    }
}

const mapStateToProps = state => {
    const {session, connection} = state.crossbar;
    return {
        connection,
        session
    };
};
export default connect(mapStateToProps)(App);
