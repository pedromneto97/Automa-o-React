/*!

=========================================================
* Material Dashboard React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import PropTypes from "prop-types";
import {Route, Switch} from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Navbar from "components/Navbars/Navbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import routes from "routes.js";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
// Crossbar
import {Connection} from "autobahn";

import RoomPage from "views/Room/Room.jsx";
import ResidencePage from "views/Residence/Residence.jsx";

import image from "assets/img/caecomp.jpg";
import logo from "assets/img/reactlogo.png";

import {connect} from 'react-redux'
import {add_session} from "../store/actions";

let ps;

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        let ws_uri;
        if (document.location.hostname === "localhost") {
            ws_uri = {
                transports: [
                    {
                        "type": "websocket",
                        "url": "ws://crossbar-pedro.herokuapp.com/ws"
                    }
                ]
            };
        } else {
            ws_uri = {
                url: (document.location.protocol === "http:" ? "ws:" : "wss:") + "//" + document.location.host + "/ws"
            };
        }
        ws_uri["realm"] = "realm1";
        this.state = {
            image: image,
            color: "blue",
            hasImage: true,
            fixedClasses: "dropdown show",
            mobileOpen: false,
            connection: new Connection(ws_uri),
            session: null,
            routes: routes,
            residence: this.props.residence
        };
        this.state.connection.onopen = function (session, details) {
            console.info("Aberto");
            this.setState({session});
            this.props.add_session(session);
            this.props.crossbar.forEach((item) => {
                session.subscribe(item.topic, item.callback);
            })
        }.bind(this);
        this.state.connection.open();
    }

    mainPanel = React.createRef();

    setResidence = (residence) => {
        let r = [];
        r = r.concat(routes);
        r.push({
            path: "/residence/" + residence.alias,
            name: residence.name,
            icon: residence.icon ? residence.icon : residence.type.icon,
            component: ResidencePage,
            layout: "/admin",
            invisible: false
        });
        residence.rooms.map((prop) => {
            return r.push({
                path: "/room/" + prop.alias,
                name: prop.name,
                icon: prop.icon ? prop.icon : prop.type.icon,
                component: RoomPage,
                layout: "/admin",
                invisible: false
            });
        });
        this.setState({
            routes: r
        });
    };

    switchRoutes = () => (
        <Switch>
            {routes.map((prop, key) => {
                if (prop.layout === "/admin") {
                    return (
                        <Route
                            path={prop.layout + prop.path}
                            render={(props) => <prop.component {...props} session={this.state.session}
                                                               setResidence={this.setResidence}/>}
                            key={key}
                        />
                    );
                }
                return null;
            })}
        </Switch>
    );

    handleDrawerToggle = () => {
        this.setState({mobileOpen: !this.state.mobileOpen});
    };

    getRoute() {
        return window.location.pathname !== "/admin/maps";
    }

    resizeFunction = () => {
        if (window.innerWidth >= 960) {
            this.setState({mobileOpen: false});
        }
    };

    componentDidMount() {
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(this.mainPanel.current);
        }
        window.addEventListener("resize", this.resizeFunction);
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        const state = {};
        if (prevProps.history.location.pathname !== prevProps.location.pathname) {
            this.mainPanel.current.scrollTop = 0;
            if (this.state.mobileOpen) {
                state.mobileOpen = false;
            }
        }
        const {residence} = this.props;
        if (this.state.residence !== residence) {
            state.residence = residence;
            this.setResidence(residence);
        }
        if (Object.keys(state).length !== 0) {
            this.setState({
                ...state
            });
        }
    }

    componentWillUnmount() {
        if (navigator.platform.indexOf("Win") > -1) {
            ps.destroy();
        }
        window.removeEventListener("resize", this.resizeFunction);
    }

    render() {
        const {classes, ...rest} = this.props;
        return (
            <div className={classes.wrapper}>
                <Sidebar
                    routes={this.state.routes}
                    logoText={"Domotics"}
                    logo={logo}
                    image={this.state.image}
                    handleDrawerToggle={this.handleDrawerToggle}
                    open={this.state.mobileOpen}
                    color={this.state.color}
                    {...rest}
                />
                <div className={classes.mainPanel} ref={this.mainPanel}>
                    <Navbar
                        routes={routes}
                        handleDrawerToggle={this.handleDrawerToggle}
                        {...rest}
                    />
                    {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
                    {this.getRoute() ? (
                        <div className={classes.content}>
                            <div className={classes.container}>{this.switchRoutes()}</div>
                        </div>
                    ) : (
                        <div className={classes.map}>{this.switchRoutes()}</div>
                    )}
                    {this.getRoute() ? <Footer/> : null}
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        crossbar: state.crossbar,
        residence: state.residence
    };
};

const mapDispatchToProps = dispatch => {
    return {
        add_session: session => dispatch(add_session(session))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Dashboard));
