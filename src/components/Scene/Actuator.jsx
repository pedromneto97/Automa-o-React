import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import CardBody from "../Card/CardBody";
import SettingsRemote from "@material-ui/icons/SettingsRemote";
import {connect} from "react-redux";
import Button from "../CustomButtons/Button";
import CardFooter from "../Card/CardFooter";

class Actuator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: props.uri + ".actuator." + props.scene._id.$oid,
      button: false,
      interval: null
    };
  }

  componentDidMount(): void {
    this.checkCall();
  }

  checkCall = () => {
    const callback = response => {
      if (response === null) {
        const interval = setInterval(this.checkCall, 5000);
        this.setState({interval});
        return;
      }
      const state = {button: true};
      if (this.state.interval !== null) {
        state.interval = null;
      }
      this.setState({...state});
    };
    this.props.session
      .call("wamp.registration.lookup", [this.state.topic])
      .then(callback)
      .catch(onerror => console.error(onerror));
  };

  changeState = () => {
    this.props.session.call(this.state.topic).catch(error => {
      if (error.error === "wamp.error.no_such_procedure") {
        const interval = setInterval(this.checkCall, 5000);
        this.setState({interval, button: false});
      }
    });
  };

  render() {
    const {classes} = this.props;
    const {button} = this.state;
    return (
      <div>
        <CardBody className={classes.cardTitle}>
          <h3></h3>
        </CardBody>
        <CardFooter stats>
          <div className={classes.stats}>
            <a onClick={this.changeState}>
              <Button size={"sm"} color={"success"} disabled={!button}>
                <SettingsRemote/>
                Trocar estado
              </Button>
            </a>
          </div>
        </CardFooter>
      </div>
    );
  }
}

Actuator.propTypes = {
  classes: PropTypes.object.isRequired,
  scene: PropTypes.object.isRequired,
  session: PropTypes.object
};
const mapStateToProps = state => {
  const {session, uri} = state.crossbar;
  return {
    session,
    uri
  };
};

export default connect(mapStateToProps)(Actuator);
