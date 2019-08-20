import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";

import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {connect} from "react-redux";

const styles = theme => ({
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class EditResidence extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      residence: null,
      alias: props.match.params.alias,
      interval: null
    };
  }

  componentDidMount(): void {
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
        this.props.session
            .call("com.herokuapp.crossbar-pedro.residence.alias", [
                this.state.alias
            ])
            .then(
                function (res) {
                    res = JSON.parse(res);
                    this.setState({
                        residence: res ? res : null
                    });
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
  };

  render() {
      const {classes} = this.props;
    if (this.state.residence) {
        const {residence} = this.state;
      return (
          <div>
              <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                      <Card>
                          <CardHeader color="primary">
                              <h4 className={classes.cardTitleWhite}>Edit Residence</h4>
                          </CardHeader>
                          <CardBody>
                              <GridContainer>
                                  <GridItem xs={12} sm={12} md={4}>
                                      <CustomInput
                                          labelText="Name"
                                          id="company-disabled"
                                          formControlProps={{
                                              fullWidth: true
                                          }}
                                          inputProps={{
                                              value: residence.name
                                          }}
                                      />
                                  </GridItem>
                                  <GridItem xs={12} sm={12} md={3}>
                                      <CustomInput
                                          labelText="Alias"
                                          id="alias"
                                          formControlProps={{
                                              fullWidth: true
                                          }}
                                          inputProps={{
                                              value: residence.alias
                                          }}
                                      />
                                  </GridItem>
                                  <GridItem xs={12} sm={12} md={5}>
                                      <FormControl
                                          variant="outlined"
                                          className={classes.formControl}
                                          fullWidth
                                      >
                                          <InputLabel htmlFor="filled-age-simple">
                                              Residence Type
                                          </InputLabel>
                                          <Select
                                              value={residence.type.type}
                                              input={<Input name="age" id="age-helper"/>}
                                          >
                                              <MenuItem value={null}>
                                                  <em>None</em>
                                              </MenuItem>
                                              <MenuItem value={10}>Ten</MenuItem>
                                              <MenuItem value={20}>Twenty</MenuItem>
                                              <MenuItem value={30}>Thirty</MenuItem>
                                          </Select>
                                      </FormControl>
                                  </GridItem>
                              </GridContainer>
                              <GridContainer>
                                  <GridItem xs={12} sm={12} md={4}>
                                      <CustomInput
                                          labelText="Street"
                                          id="street"
                                          formControlProps={{
                                              fullWidth: true
                                          }}
                                          inputProps={{
                                              value: residence.address.street
                                          }}
                                      />
                                  </GridItem>
                                  <GridItem xs={12} sm={12} md={2}>
                                      <CustomInput
                                          labelText="Number"
                                          id="Number"
                                          formControlProps={{
                                              fullWidth: true
                                          }}
                                          inputProps={{
                                              value: residence.address.number,
                                              type: "number"
                                          }}
                                      />
                                  </GridItem>
                                  <GridItem xs={12} sm={12} md={3}>
                                      <CustomInput
                                          labelText="District"
                                          id="District"
                                          formControlProps={{
                                              fullWidth: true
                                          }}
                                          inputProps={{
                                              value: residence.address.district
                                          }}
                                      />
                                  </GridItem>
                                  <GridItem xs={12} sm={12} md={3}>
                                      <CustomInput
                                          labelText="Complement"
                                          id="complement"
                                          formControlProps={{
                                              fullWidth: true
                                          }}
                                          inputProps={{
                                              value: residence.address.complement
                                          }}
                                      />
                                  </GridItem>
                              </GridContainer>
                              <GridContainer>
                                  <GridItem xs={12} sm={12} md={3}>
                                      <CustomInput
                                          labelText="Postal Code"
                                          id="postal_code"
                                          formControlProps={{
                                              fullWidth: true
                                          }}
                                          inputProps={{
                                              value: residence.address.postal_code.postal_code
                                          }}
                                      />
                                  </GridItem>
                                  <GridItem xs={12} sm={12} md={3}>
                                      <CustomInput
                                          labelText="City"
                                          id="city"
                                          formControlProps={{
                                              fullWidth: true
                                          }}
                                          inputProps={{
                                              value: residence.address.postal_code.city,
                                              disabled: true
                                          }}
                                      />
                                  </GridItem>
                                  <GridItem xs={12} sm={12} md={3}>
                                      <CustomInput
                                          labelText="Province"
                                          id="province"
                                          formControlProps={{
                                              fullWidth: true
                                          }}
                                          inputProps={{
                                              value: residence.address.postal_code.province,
                                              disabled: true
                                          }}
                                      />
                                  </GridItem>
                                  <GridItem xs={12} sm={12} md={3}>
                                      <CustomInput
                                          labelText="Country"
                                          id="country"
                                          formControlProps={{
                                              fullWidth: true
                                          }}
                                          inputProps={{
                                              value: residence.address.postal_code.country,
                                              disabled: true
                                          }}
                                      />
                                  </GridItem>
                              </GridContainer>
                          </CardBody>
                          <CardFooter>
                              <Button color="primary">Update Profile</Button>
                          </CardFooter>
                      </Card>
                  </GridItem>
              </GridContainer>
          </div>
      );
    } else {
      return (
          <GridContainer>
              <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                      labelText="Company (disabled)"
                      id="company-disabled"
                      formControlProps={{
                          fullWidth: true
                      }}
                      inputProps={{
                          disabled: true
                      }}
                  />
              </GridItem>
          </GridContainer>
      );
    }
  }
}

const mapStateToProps = state => {
    const {session} = state;
    return {
        session
    };
};

export default connect(mapStateToProps)(withStyles(styles)(EditResidence));
