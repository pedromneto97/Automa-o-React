import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

import AccessTime from "@material-ui/icons/AccessTime";

import CardFooter from "components/Card/CardFooter.jsx";

class Sensor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            last_measurement: null
        };
        props.session.call("com.herokuapp.crossbar-pedro.measurement.last", [props.scene._id.$oid]).then(this.set_measurement);
        props.session.subscribe("com.herokuapp.crossbar-pedro.measurement." + props.scene._id.$oid + ".create", this.set_measurement);
    }

    set_measurement = (res) => {
        let measurement = JSON.parse(res);
        measurement.timestamp = new Date(measurement.timestamp.$date);
        this.setState({
            last_measurement: measurement
        });
    };

    getDate = () => {
        const date = new Date();
        if (date.toLocaleDateString() === this.state.last_measurement.timestamp.toLocaleDateString()) {
            return this.state.last_measurement.timestamp.toLocaleTimeString();
        }
        return this.state.last_measurement.timestamp.toLocaleString();
    };

    render() {
        const {
            classes
        } = this.props;
        if (this.state.last_measurement !== null) {
            return <CardFooter stats>
                <div className={classes.stats}>
                    <AccessTime/>
                    {"Last update at " + this.getDate()}
                </div>
            </CardFooter>;
        }
        return null;
    }
}

Sensor.propTypes = {
    classes: PropTypes.object.isRequired,
    scene: PropTypes.object.isRequired,
    session: PropTypes.object
};

export default Sensor;
