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
/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.jsx";

import sidebarStyle from "assets/jss/material-dashboard-react/components/sidebarStyle.jsx";
import Link from "@material-ui/core/Link";

const Sidebar = ({ ...props }) => {
    // verifies if routeName is the one active (in browser input)
    function activeRoute(routeName) {
        return window.location.href.indexOf(routeName) > -1 ? true : false;
    }

    const { classes, color, logo, image, logoText, routes } = props;
    let links = (
        <List className={classes.list}>
            {routes.map((prop, key) => {
                if (prop.invisible) return null;
                let listItemClasses;
                listItemClasses = classNames({
                    [" " + classes[color]]: activeRoute(prop.layout + prop.path)
                });
                const whiteFontClasses = classNames({
                    [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
                });
                return (
                    <NavLink
                        to={prop.layout + prop.path}
                        className={classes.item}
                        activeClassName="active"
                        key={key}
                    >
                        <ListItem button className={classes.itemLink + listItemClasses}>
                            {typeof prop.icon === "string" ? (
                                <Icon
                                    className={classNames(classes.itemIcon, whiteFontClasses)}
                                >
                                    {prop.icon}
                                </Icon>
                            ) : (
                                <prop.icon
                                    className={classNames(classes.itemIcon, whiteFontClasses)}
                                />
                            )}
                            <ListItemText
                                primary={prop.name}
                                className={classNames(classes.itemText, whiteFontClasses)}
                                disableTypography={true}
                            />
                        </ListItem>
                    </NavLink>
                );
            })}
        </List>
    );
    let brand = (
        <div className={classes.logo}>
            <Link
                to={"/"}
                className={classNames(classes.logoLink)}
            >
                <div className={classes.logoImage}>
                    <img src={logo} alt="logo" className={classes.img}/>
                </div>
                {logoText}
            </Link>
        </div>
    );
    return (
        <div>
            <Hidden mdUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor="right"
                    open={props.open}
                    classes={{
                        paper: classNames(classes.drawerPaper)
                    }}
                    onClose={props.handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true // Better open performance on mobile.
                    }}
                >
                    {brand}
                    <div className={classes.sidebarWrapper}>
                        <AdminNavbarLinks/>
                        {links}
                    </div>
                    {image !== undefined ? (
                        <div
                            className={classes.background}
                            style={{ backgroundImage: "url(" + image + ")" }}
                        />
                    ) : null}
                </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
                <Drawer
                    anchor="left"
                    variant="permanent"
                    open
                    classes={{
                        paper: classNames(classes.drawerPaper)
                    }}
                >
                    {brand}
                    <div className={classes.sidebarWrapper}>{links}</div>
                    {image !== undefined ? (
                        <div
                            className={classes.background}
                            style={{ backgroundImage: "url(" + image + ")" }}
                        />
                    ) : null}
                </Drawer>
            </Hidden>
        </div>
    );
};

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
    handleDrawerToggle: PropTypes.func,
    bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
    logo: PropTypes.string,
    image: PropTypes.string,
    logoText: PropTypes.string,
    routes: PropTypes.arrayOf(PropTypes.object),
    open: PropTypes.bool
};

export default withStyles(sidebarStyle)(Sidebar);
