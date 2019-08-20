import React from "react";
import {Link} from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";

import Edit from "@material-ui/icons/Edit";
import Person from "@material-ui/icons/Person";

import Card from "../Card/Card.jsx";
import CardHeader from "../Card/CardHeader.jsx";
import CardBody from "../Card/CardBody.jsx";

import Button from "../CustomButtons/Button.jsx";
import Tooltip from "@material-ui/core/Tooltip";

import withStyles from "@material-ui/core/styles/withStyles";
import tasksStyle from "../../assets/jss/material-dashboard-react/components/tasksStyle.jsx";

class ResidenceInfo extends React.Component {
  render() {
    const {residence, classes} = this.props;
    if (residence !== null) {
      return (
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Residence Info</h4>
          </CardHeader>
          <CardBody>
            <p>
              <b>Name:</b> {residence.name}
            </p>
            <p>
              <b>Alias:</b> {residence.alias}
            </p>
            <p>
              <b>Type:</b> {residence.type.type}
            </p>
            <p>
              <b>Address:</b> {residence.address.street},{" "}
              {residence.address.number}{" "}
              {residence.address.complement
                  ? "," + residence.address.complement
                  : null}{" "}
              - {residence.address.district}
            </p>
            <p>
              <b>Postal Code:</b> {residence.address.postal_code.postal_code}
            </p>
            <p>
              <b>City:</b> {residence.address.postal_code.city}
            </p>
            <p>
              <b>Province:</b> {residence.address.postal_code.province}
            </p>
            <p>
              <b>Country:</b> {residence.address.postal_code.country}
            </p>
            <Link to={"/admin/residence/edit/" + residence.alias}>
              <Tooltip
                  id="tooltip-top"
                  title="Edit Residence"
                  placement="top"
                  classes={{tooltip: classes.tooltip}}
              >
                <Button justIcon color="info" size="sm" className="pull-right">
                  <Edit/>
                </Button>
              </Tooltip>
            </Link>
            <Link to={"/admin/residence/users/" + residence.alias}>
              <Tooltip
                  id="tooltip-top"
                  title="Edit Residence Users"
                  placement="top"
                  classes={{tooltip: classes.tooltip}}
              >
                <Button justIcon color="info" size="sm" className="pull-right">
                  <Person/>
                </Button>
              </Tooltip>
            </Link>
          </CardBody>
        </Card>
      );
    } else {
      return (
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Residence Info</h4>
          </CardHeader>
          <CardBody>Loading</CardBody>
        </Card>
      );
    }
  }
}

ResidenceInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  residence: PropTypes.object.isRequired
};

let styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};
Object.assign(styles, tasksStyle);

export default withStyles(styles)(ResidenceInfo);
