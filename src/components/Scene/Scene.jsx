import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

import Icon from "@material-ui/core/Icon";
import AccessTime from "@material-ui/icons/AccessTime";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

class Scene extends React.Component {
    render() {
        const {
            classes,
            scene
        } = this.props;
        return (
            <Card>
                <CardHeader color="success" stats icon>
                    <CardIcon color="info">
                        <Icon>{scene.icon ? scene.icon : scene.type.icon}</Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>{scene.type.type}</p>
                    <h3 className={classes.cardTitle}>{scene.name}</h3>
                </CardHeader>
                <CardFooter stats>
                    <div className={classes.stats}>
                        <AccessTime/>
                    </div>
                </CardFooter>
            </Card>
        );
    }
}

Scene.propTypes = {
    classes: PropTypes.object.isRequired,
    scene: PropTypes.object.isRequired
};

export default Scene;
