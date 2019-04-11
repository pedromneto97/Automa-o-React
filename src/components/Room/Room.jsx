import React from "react";
import { Link } from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";

import Icon from "@material-ui/core/Icon";
import AccessTime from "@material-ui/icons/AccessTime";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import Button from "components/CustomButtons/Button.jsx";

class Room extends React.Component {
  render() {
    const {
      classes,
      room
    } = this.props;
    return (
      <Card>
        <CardHeader color="success" stats icon>
          <CardIcon color="info">
            <Icon>{room.icon ? room.icon : room.type.icon}</Icon>
          </CardIcon>
          <p className={classes.cardCategory}>{room.type.type}</p>
          <h3 className={classes.cardTitle}>{room.name}</h3>
        </CardHeader>
        <CardFooter stats>
          <div className={classes.stats}>
            <AccessTime/>
          </div>
          <Link to={"/admin/"}>
            <Button color="info" size="sm">More info</Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }
}

Room.propTypes = {
  classes: PropTypes.object.isRequired,
  residence: PropTypes.object.isRequired
};

export default Room;
