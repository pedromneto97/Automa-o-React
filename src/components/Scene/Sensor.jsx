import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

import AccessTime from "@material-ui/icons/AccessTime";

import CardFooter from "../Card/CardFooter.jsx";
import CardBody from "../Card/CardBody";
import {connect} from "react-redux";
import {add_to_on_open, remove_to_on_open} from "../../store/actions";

class Sensor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            last_measurement: null,
            topic:
                props.uri + ".measurement." + props.scene._id.$oid + ".create",
            subscription: null
        };
        props.session
            .call(props.uri + ".measurement.last", [
                props.scene._id.$oid
            ])
            .then(this.set_measurement)
            .catch(err => console.error(err));
    }

    set_measurement = res => {
        const measurement = JSON.parse(res);
        if (measurement === null) {
            return;
        }
        if (measurement.timestamp.$date) {
            measurement.timestamp = new Date(measurement.timestamp.$date);
        } else {
            measurement.timestamp = new Date(
                Date.UTC(
                    measurement.timestamp[0],
                    measurement.timestamp[1] - 1,
                    measurement.timestamp[2],
                    measurement.timestamp[3],
                    measurement.timestamp[4],
                    measurement.timestamp[5]
                )
            );
        }
        this.setState({
            last_measurement: measurement
        });
    };

    componentDidMount(): void {
        this.props.session
            .subscribe(this.state.topic, this.set_measurement)
            .then(subscription => this.setState({subscription}));
        this.props.add_to_on_open(this.state.topic, this.set_measurement);
    }

    componentWillUnmount(): void {
        this.props.remove_to_on_open(this.state.topic);
        if (this.state.subscription !== null) {
            this.props.session.unsubscribe(this.state.subscription);
        }
    }

    getDate = () => {
        const date = new Date();
        if (
            date.toLocaleDateString() ===
            this.state.last_measurement.timestamp.toLocaleDateString()
        ) {
            return this.state.last_measurement.timestamp.toLocaleTimeString();
        }
        return this.state.last_measurement.timestamp.toLocaleString();
    };

    render() {
        const {classes} = this.props;
        const {last_measurement} = this.state;
        if (last_measurement !== null) {
            return (
                <div>
                    <CardBody className={classes.cardTitle}>
                        <h3>{last_measurement.value}</h3>
                    </CardBody>
                    <CardFooter stats>
                        <div className={classes.stats}>
                            <AccessTime/>
                            {"Last update at " + this.getDate()}
                        </div>
                    </CardFooter>
                </div>
            );
        }
        return (
            <CardFooter stats>
                <div className={classes.stats}>
                    <AccessTime/>
                    No measures
                </div>
            </CardFooter>
        );
    }
}

Sensor.propTypes = {
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

const mapDispatchToProps = dispatch => {
    return {
        add_to_on_open: (topic, callback) =>
            dispatch(add_to_on_open(topic, callback)),
        remove_to_on_open: topic => dispatch(remove_to_on_open(topic))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sensor);
