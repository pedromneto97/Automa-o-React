import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

import Icon from "@material-ui/core/Icon";

import Card from "../Card/Card.jsx";
import CardHeader from "../Card/CardHeader.jsx";
import CardIcon from "../Card/CardIcon.jsx";

import Sensor from "../Scene/Sensor.jsx";
import Actuator from "./Actuator";

class Scene extends React.Component {
  render() {
    const {classes, scene} = this.props;
    return (
      <Card>
        <CardHeader color="success" stats icon>
          <CardIcon color="info">
            <Icon>{scene.icon ? scene.icon : scene.type.icon}</Icon>
          </CardIcon>
          <p className={classes.cardCategory}>{scene.type.name}</p>
          <h3 className={classes.cardTitle}>{scene.name}</h3>
        </CardHeader>
        {scene.type.type === "SENSOR" ? (
          <Sensor classes={classes} scene={scene}/>
        ) : (
          <Actuator classes={classes} scene={scene}/>
        )}
      </Card>
    );
  }
}

Scene.propTypes = {
  classes: PropTypes.object.isRequired,
  scene: PropTypes.object.isRequired
};

export default Scene;
