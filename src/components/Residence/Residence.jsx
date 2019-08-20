import React from "react";
import {Link} from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";

import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import LocationCity from "@material-ui/icons/LocationCity";
import Settings from "@material-ui/icons/Settings";

import Card from "../Card/Card.jsx";
import CardHeader from "../Card/CardHeader.jsx";
import CardIcon from "../Card/CardIcon.jsx";
import CardBody from "../Card/CardBody.jsx";
import CardFooter from "../Card/CardFooter.jsx";

import Button from "../CustomButtons/Button.jsx";
import Tooltip from "@material-ui/core/Tooltip";

class Residence extends React.Component {
    render() {
        const {classes, residence} = this.props;
        return (
            <Card>
                <CardHeader color="info" stats icon>
                    <CardIcon color="info">
                        <Icon>{residence.icon ? residence.icon : residence.type.icon}</Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>{residence.type.type}</p>
                    <h4 className={classes.cardTitle}>{residence.name}</h4>
                </CardHeader>
                <CardBody>
                    <Link to={"/admin/residence/" + residence.alias}>
                        <Button color="info" size="sm">
                            Show Rooms
                        </Button>
                    </Link>
                    <Link to={"/admin/residence/info/" + residence.alias}>
                        <Tooltip
                            id="tooltip-top"
                            title="Residence Info"
                            placement="top"
                            classes={{tooltip: classes.tooltip}}
                        >
                            <IconButton
                                color="default"
                                size={"small"}
                                className="pull-right"
                            >
                                <Settings/>
                            </IconButton>
                        </Tooltip>
                    </Link>
                </CardBody>
                <CardFooter chart>
                    <div className={classes.stats}>
                        <LocationCity/>
                        {residence.address.street}, {residence.address.number},{" "}
                        {residence.address.district}{" "}
                        {residence.address.postal_code.city
                            ? "- " + residence.address.postal_code.city
                            : ""}
                    </div>
                </CardFooter>
            </Card>
        );
    }
}

Residence.propTypes = {
    classes: PropTypes.object.isRequired,
    residence: PropTypes.object.isRequired
};

export default Residence;
