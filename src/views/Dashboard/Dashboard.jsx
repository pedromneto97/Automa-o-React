import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
// Residence module
import Residence from "components/Residences/Residence.jsx";

import {bugs, server, website} from "variables/general.jsx";

import {completedTasksChart, dailySalesChart, emailsSubscriptionChart} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

function ResidenceList(props) {
    const {
        residences,
        classes
    } = props;
    return (residences.map((residence) =>
        <GridItem xs={12} sm={6} md={3} key={residence._id.$oid}>
            <Residence classes={classes} residence={residence}/>
        </GridItem>
    ));
}

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            residences: [],
            interval: null
        };
        this.getResidences = this.getResidences.bind(this);
    }

    componentDidMount(): void {
        this.setState({
            interval: setInterval(this.getResidences, 500)
        });
    }

    componentWillUnmount(): void {
        if (this.state.interval !== null) {
            clearInterval(this.state.interval);
        }
    }

    getResidences() {
        if (this.props.session) {
            this.props.session.call("com.herokuapp.crossbar-pedro.user.residences", ["5c7f1130dd27452be8f16adc"])
                .then(function (res) {
                    this.setState({
                        residences: JSON.parse(res)
                    });
                }.bind(this))
                .catch(function (error) {
                    console.error(error);
                });
            clearInterval(this.state.interval);
            this.setState({
                interval: null
            })
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <GridContainer>
                    <ResidenceList classes={classes} residences={this.state.residences}/>
                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <CardHeader color="success" stats icon>
                                <CardIcon color="success">
                                    <Store/>
                                </CardIcon>
                                <p className={classes.cardCategory}>Revenue</p>
                                <h3 className={classes.cardTitle}>$34,245</h3>
                            </CardHeader>
                            <CardFooter stats>
                                <div className={classes.stats}>
                                    <DateRange/>
                                    Last 24 Hours
                                </div>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <CardHeader color="danger" stats icon>
                                <CardIcon color="danger">
                                    <Icon>info_outline</Icon>
                                </CardIcon>
                                <p className={classes.cardCategory}>Fixed Issues</p>
                                <h3 className={classes.cardTitle}>75</h3>
                            </CardHeader>
                            <CardFooter stats>
                                <div className={classes.stats}>
                                    <LocalOffer/>
                                    Tracked from Github
                                </div>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={3}>
                        <Card>
                            <CardHeader color="info" stats icon>
                                <CardIcon color="info">
                                    <Accessibility/>
                                </CardIcon>
                                <p className={classes.cardCategory}>Followers</p>
                                <h3 className={classes.cardTitle}>+245</h3>
                            </CardHeader>
                            <CardFooter stats>
                                <div className={classes.stats}>
                                    <Update/>
                                    Just Updated
                                </div>
                            </CardFooter>
                        </Card>
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                        <Card chart>
                            <CardHeader color="success">
                                <ChartistGraph
                                    className="ct-chart"
                                    data={dailySalesChart.data}
                                    type="Line"
                                    options={dailySalesChart.options}
                                    listener={dailySalesChart.animation}
                                />
                            </CardHeader>
                            <CardBody>
                                <h4 className={classes.cardTitle}>Daily Sales</h4>
                                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory}/> 55%
                  </span>{" "}
                                    increase in today sales.
                                </p>
                            </CardBody>
                            <CardFooter chart>
                                <div className={classes.stats}>
                                    <AccessTime/> updated 4 minutes ago
                                </div>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <Card chart>
                            <CardHeader color="warning">
                                <ChartistGraph
                                    className="ct-chart"
                                    data={emailsSubscriptionChart.data}
                                    type="Bar"
                                    options={emailsSubscriptionChart.options}
                                    responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                                    listener={emailsSubscriptionChart.animation}
                                />
                            </CardHeader>
                            <CardBody>
                                <h4 className={classes.cardTitle}>Email Subscriptions</h4>
                                <p className={classes.cardCategory}>
                                    Last Campaign Performance
                                </p>
                            </CardBody>
                            <CardFooter chart>
                                <div className={classes.stats}>
                                    <AccessTime/> campaign sent 2 days ago
                                </div>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <Card chart>
                            <CardHeader color="danger">
                                <ChartistGraph
                                    className="ct-chart"
                                    data={completedTasksChart.data}
                                    type="Line"
                                    options={completedTasksChart.options}
                                    listener={completedTasksChart.animation}
                                />
                            </CardHeader>
                            <CardBody>
                                <h4 className={classes.cardTitle}>Completed Tasks</h4>
                                <p className={classes.cardCategory}>
                                    Last Campaign Performance
                                </p>
                            </CardBody>
                            <CardFooter chart>
                                <div className={classes.stats}>
                                    <AccessTime/> campaign sent 2 days ago
                                </div>
                            </CardFooter>
                        </Card>
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                        <CustomTabs
                            title="Tasks:"
                            headerColor="primary"
                            tabs={[
                                {
                                    tabName: "Bugs",
                                    tabIcon: BugReport,
                                    tabContent: (
                                        <Tasks
                                            checkedIndexes={[0, 3]}
                                            tasksIndexes={[0, 1, 2, 3]}
                                            tasks={bugs}
                                        />
                                    )
                                },
                                {
                                    tabName: "Website",
                                    tabIcon: Code,
                                    tabContent: (
                                        <Tasks
                                            checkedIndexes={[0]}
                                            tasksIndexes={[0, 1]}
                                            tasks={website}
                                        />
                                    )
                                },
                                {
                                    tabName: "Server",
                                    tabIcon: Cloud,
                                    tabContent: (
                                        <Tasks
                                            checkedIndexes={[1]}
                                            tasksIndexes={[0, 1, 2]}
                                            tasks={server}
                                        />
                                    )
                                }
                            ]}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <Card>
                            <CardHeader color="warning">
                                <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
                                <p className={classes.cardCategoryWhite}>
                                    New employees on 15th September, 2016
                                </p>
                            </CardHeader>
                            <CardBody>
                                <Table
                                    tableHeaderColor="warning"
                                    tableHead={["ID", "Name", "Salary", "Country"]}
                                    tableData={[
                                        ["1", "Dakota Rice", "$36,738", "Niger"],
                                        ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                                        ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                                        ["4", "Philip Chaney", "$38,735", "Korea, South"]
                                    ]}
                                />
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
    connection: PropTypes.object
};

export default withStyles(dashboardStyle)(Dashboard);
