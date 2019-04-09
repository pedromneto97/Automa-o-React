import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

import Icon from "@material-ui/core/Icon";
import LocationCity from "@material-ui/icons/LocationCity";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

class Residence extends React.Component {
    render() {
        const {
            classes,
            residence
        } = this.props;
        return (
            <Card>
                <CardHeader color="success" stats icon>
                    <CardIcon color="success">
                        <Icon>{residence.icon}</Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>{residence.type.type}</p>
                    <h3 className={classes.cardTitle}>{residence.name}</h3>
                </CardHeader>
                <CardFooter stats>
                    <div className={classes.stats}>
                        <LocationCity/>
                        {residence.address.street}, {residence.address.number}, {residence.address.district} - {residence.address.postal_code.city}
                    </div>
                </CardFooter>
            </Card>
        );
    }
}

Residence.propTypes = {
    classes: PropTypes.object.isRequired,
    residence: PropTypes.object.isRequired
};

export default Residence;
