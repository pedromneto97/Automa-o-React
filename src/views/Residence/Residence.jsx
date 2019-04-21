import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
// Room module
import Room from "components/Room/Room.jsx";

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
        this.state = {
            residence: {
                rooms: []
            },
          alias: props.match.params.alias,
            interval: null
        };
        this.getRooms = this.getRooms.bind(this);
    }

  componentWillMount(): void {
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
          this.props.session.call("com.herokuapp.crossbar-pedro.residence.alias", [this.state.alias])
                .then(function (res) {
                    res = JSON.parse(res);
                    this.setState({
                        residence: res ? res : {rooms: []}
                    });
                  this.props.setResidence(this.state.residence);
                }.bind(this))
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

export default withStyles(dashboardStyle)(Residence);
