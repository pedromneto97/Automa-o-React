/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
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
import { Connection } from "autobahn";

import RoomPage from "views/Room/Room.jsx";
import ResidencePage from "views/Residence/Residence.jsx";

import image from "assets/img/caecomp.jpg";
import logo from "assets/img/reactlogo.png";

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
      routes: routes
    };
    this.state.connection.onopen = function(session, details) {
      console.info("Aberto");
      this.setState({ session: session });
    }.bind(this);
    this.state.connection.open();
  }

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
      r.push({
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
      })}
    </Switch>
  );

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  getRoute() {
    return this.props.location.pathname !== "/admin/maps";
  }

  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  };

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
  }

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
    this.state.connection.close();
  }

  render() {
    const { classes, ...rest } = this.props;
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
        <div className={classes.mainPanel} ref="mainPanel">
          <Navbar
            routes={this.state.routes}
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

export default withStyles(dashboardStyle)(Dashboard);
