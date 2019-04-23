import React from "react";
import { Link } from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";

import Edit from "@material-ui/icons/Edit";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import Button from "components/CustomButtons/Button.jsx";
import Tooltip from "@material-ui/core/Tooltip";

import withStyles from "@material-ui/core/styles/withStyles";
import tasksStyle from "assets/jss/material-dashboard-react/components/tasksStyle.jsx";


class ResidenceInfo extends React.Component {
  render() {
    const {
      residence,
      classes
    } = this.props;
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
              <b>Address:</b> {residence.address.street}, {residence.address.number} {residence.address.complement ? "," + residence.address.complement : null} - {residence.address.district}
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
                classes={{ tooltip: classes.tooltip }}>
                <Button justIcon color="info" size='sm' className='pull-right'><Edit/></Button>
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
          <CardBody>
            Loading
          </CardBody>
        </Card>
      );
    }
  }
}

ResidenceInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  residence: PropTypes.object.isRequired
};

export default withStyles(tasksStyle)(ResidenceInfo);
