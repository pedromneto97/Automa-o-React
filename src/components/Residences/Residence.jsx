import React from "react";
import { Link } from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";

import Icon from "@material-ui/core/Icon";
import LocationCity from "@material-ui/icons/LocationCity";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import Button from "components/CustomButtons/Button.jsx";

class Residence extends React.Component {
  render() {
    const {
      classes,
      residence
    } = this.props;
    return (
      <Card>
        <CardHeader color="success" stats icon>
          <CardIcon color="info">
            <Icon>{residence.icon ? residence.icon : residence.type.icon}</Icon>
          </CardIcon>
          <p className={classes.cardCategory}>{residence.type.type}</p>
          <h3 className={classes.cardTitle}>{residence.name}</h3>
        </CardHeader>
        <CardFooter stats>
          <div className={classes.stats}>
            <LocationCity/>
            {residence.address.street}, {residence.address.number}, {residence.address.district} {residence.address.postal_code.city ? "- " + residence.address.postal_code.city : ""}
          </div>
          <Link to={"/admin/" + residence.alias}>
            <Button color="info" size="sm">More info</Button>
          </Link>
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
