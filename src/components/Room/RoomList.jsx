import React from "react";
import {Link} from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";

import Table from "../Table/Table.jsx";

import Card from "../Card/Card.jsx";
import CardHeader from "../Card/CardHeader.jsx";
import CardBody from "../Card/CardBody.jsx";
import Tooltip from "@material-ui/core/Tooltip";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import withStyles from "@material-ui/core/styles/withStyles";
import tasksStyle from "assets/jss/material-dashboard-react/components/tasksStyle.jsx";
import IconButton from "@material-ui/core/IconButton";

class RoomList extends React.Component {
  rooms_table = () => {
      const r = [];
      this.props.rooms.map(prop =>
          r.push([
              prop.name,
              prop.alias,
              prop.icon,
              prop.type.type,
              prop.scenes.length.toString(),
              <Link to={"/admin/room/info/" + prop.alias}>
                  <Tooltip
                      id="tooltip-top"
                      title="Edit Room"
                      placement="top"
                      classes={{tooltip: this.props.classes.tooltip}}
                  >
                      <IconButton color="primary" size="small" className="pull-right">
                          <Edit/>
                      </IconButton>
                  </Tooltip>
              </Link>,
              <Tooltip
                  id="tooltip-top"
                  title="Remove Room"
                  placement="top"
                  classes={{tooltip: this.props.classes.tooltip}}
              >
                  <IconButton color="secondary" size="small" className="pull-right">
                      <Delete/>
                  </IconButton>
              </Tooltip>
          ])
      );
      console.log(r[0]);
    return r;
  };

  render() {
      const {classes} = this.props;
    return (
      <Card>
        <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Residence Rooms</h4>
        </CardHeader>
        <CardBody>
          <Table
              tableHeaderColor="info"
              tableHead={[
                  "Name",
                  "Alias",
                  "Icon",
                  "Type",
                  "Scenes Items",
                  "",
                  ""
              ]}
              tableData={this.rooms_table()}
          />
        </CardBody>
      </Card>
    );
  }
}

RoomList.propTypes = {
  classes: PropTypes.object.isRequired,
  rooms: PropTypes.array.isRequired
};

let styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};
Object.assign(styles, tasksStyle);

export default withStyles(styles)(RoomList);
