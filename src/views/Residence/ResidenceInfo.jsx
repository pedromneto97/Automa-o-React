import React from "react";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import ResidenceInfo from "components/Residence/ResidenceInfo.jsx";
import RoomList from "components/Room/RoomList.jsx";


class Residence extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      residence: null,
      alias: props.match.params.alias,
      interval: null
    };
  }

  componentWillMount(): void {
    if (!this.getResidence()) {
      this.setState({
        interval: setInterval(this.getResidence, 100)
      });
    }
  }

  componentWillUnmount(): void {
    if (this.state.interval !== null) {
      clearInterval(this.state.interval);
    }
  }

  getResidence = () => {
    if (this.props.session) {
      this.props.session.call("com.herokuapp.crossbar-pedro.residence.alias", [this.state.alias])
        .then(function(res) {
          res = JSON.parse(res);
          this.setState({
            residence: res ? res : null
          });
        }.bind(this))
        .catch(function(error) {
          console.error(error);
        });
      clearInterval(this.state.interval);
      this.setState({
        interval: null
      });
      return true;
    }
    return false;
  };

  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <ResidenceInfo classes={classes} residence={this.state.residence}/>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <RoomList classes={classes} rooms={this.state.residence ? this.state.residence.rooms : []}/>
        </GridItem>
      </GridContainer>
    );
  };
}

export default Residence;
