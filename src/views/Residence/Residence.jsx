import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
// Room module
import Room from "../../components/Room/Room.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import {connect} from "react-redux";
import {add_residence} from "../../store/actions";

function RoomsList(props) {
    const {rooms, classes} = props;
    return rooms.map(room => (
        <GridItem xs={12} sm={6} md={3} key={room._id.$oid}>
            <Room classes={classes} room={room}/>
        </GridItem>
    ));
}

class Residence extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            residence: {
                rooms: []
            },
            alias: props.match.params.alias,
            interval: null
        };
        this.getRooms = this.getRooms.bind(this);
    }

    componentDidMount() {
        if (!this.getRooms()) {
            this.setState({
                interval: setInterval(this.getRooms, 100)
            });
        }
    }

    componentWillUnmount(): void {
        if (this.state.interval !== null) {
            clearInterval(this.state.interval);
        }
    }

    getRooms() {
        if (this.props.session) {
            this.props.session
                .call(this.props.uri + ".residence.alias", [this.state.alias])
                .then(
                    function (res) {
                        res = JSON.parse(res);
                        this.setState({
                            residence: res ? res : {rooms: []}
                        });
                        this.props.add_residence(this.state.residence);
                    }.bind(this)
                )
                .catch(function (error) {
                    console.error(error);
                });
            clearInterval(this.state.interval);
            this.setState({
                interval: null
            });
            return true;
        }
        return false;
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <GridContainer>
                    <RoomsList classes={classes} rooms={this.state.residence.rooms}/>
                </GridContainer>
            </div>
        );
    }
}

Residence.propTypes = {
    classes: PropTypes.object.isRequired,
    connection: PropTypes.object
};

const mapDispatchToProps = dispatch => {
    return {
        add_residence: residence => dispatch(add_residence(residence))
    };
};

const mapStateToProps = state => {
    const {session, uri} = state.crossbar;
    return {
        session,
        uri
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(dashboardStyle)(Residence));
