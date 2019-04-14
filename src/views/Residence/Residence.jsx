import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
// Room module
import Room from "components/Room/Room.jsx";
// Crossbar
import {Connection} from "autobahn";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

function RoomsList(props) {
    const {
        rooms,
        classes
    } = props;
    return (rooms.map((room) =>
        <GridItem xs={12} sm={6} md={3} key={room._id.$oid}>
            <Room classes={classes} room={room}/>
        </GridItem>
    ));
}

class Residence extends React.Component {
    constructor(props) {
        super(props);
        let ws_uri;
        if (document.location.hostname === "localhost") {
            ws_uri = {
                transports: [
                    {
                        "type": "websocket",
                        "url": "ws://crossbar-pedro.herokuapp.com/ws"
                    }
                ]
            };
        } else {
            ws_uri = {
                url: (document.location.protocol === "http:" ? "ws:" : "wss:") + "//" + document.location.host + "/ws"
            };
        }
        ws_uri["realm"] = "realm1";
        this.state = {
            residence: {
                rooms: []
            },
            connection: new Connection(ws_uri),
            alias: props.match.params.alias
        };
        this.state.connection.onopen = function (session, details) {
            console.info("Aberto!");
        };
        this.state.connection.open();
        this.getRooms = this.getRooms.bind(this);
    }

    componentDidMount(): void {
        setTimeout(this.getRooms, 3000);
    }

    getRooms() {
        this.state.connection.session.call("com.herokuapp.crossbar-pedro.residence.alias", [this.state.alias])
            .then(function (res) {
                this.setState({
                    residence: JSON.parse(res)
                });
            }.bind(this))
            .catch(function (error) {
                console.error(error);
            });
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

export default withStyles(dashboardStyle)(Residence);
