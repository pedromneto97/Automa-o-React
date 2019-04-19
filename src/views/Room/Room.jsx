import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
// Room module
import Scene from "components/Scene/Scene.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

function ScenesList(props) {
  const {
    scenes,
    classes,
    session
  } = props;
  return (scenes.map((scene) =>
    <GridItem xs={12} sm={6} md={3} key={scene._id.$oid}>
      <Scene classes={classes} scene={scene} session={session}/>
    </GridItem>
  ));
}

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      room: {
        scenes: []
      },
      alias: props.match.params.alias,
      interval: null
    };
    this.getScenes = this.getScenes.bind(this);
  }

  componentDidMount(): void {
    this.setState({
      interval: setInterval(this.getScenes, 500)
    });
  }

  componentWillUnmount(): void {
    if (this.state.interval !== null) {
      clearInterval(this.state.interval);
    }
  }

  getScenes() {
    if (this.props.session) {
      this.props.session.call("com.herokuapp.crossbar-pedro.room.alias", [this.state.alias])
        .then(function(res) {
          res = JSON.parse(res);
          this.setState({
            room: res ? res : { scenes: [] }
          });
        }.bind(this))
        .catch(function(error) {
          console.error(error);
        });
      clearInterval(this.state.interval);
      this.setState({
        interval: null
      });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <ScenesList classes={classes} scenes={this.state.room.scenes} session={this.props.session}/>
        </GridContainer>
      </div>
    );
  }
}

Room.propTypes = {
  classes: PropTypes.object.isRequired,
  session: PropTypes.object
};

export default withStyles(dashboardStyle)(Room);
