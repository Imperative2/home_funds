import React from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Typography, Button } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import { withStyles } from "@material-ui/core/styles";

import HouseholdCard from "../../Cards/HouseholdCard/HouseholdCard";
import AddHouseholdDialog from "../../Dialog/AddHouseholdDialog/AddHouseholdDialog";

import * as actions from "../../../redux/actions/index";
import { connect } from "react-redux";

const style = {
  block: {
    padding: "10px",
  },
};

class HouseholdsPage extends React.Component {
  state = {
    households: [
      { name: "bling", description: "blingsHouse" },
      { name: "rupert's", description: "ruperts house" },
    ],
    clickedAddHousehold: false,
  };

  componentWillMount() {
    this.props.onUsersFetch();
    this.props.onUserHouseholdsFetch(this.props.userReducer.user.userId);
  }

  handleAddHouseholdClick = () => {
    this.setState({ ...this.state, clickedAddHousehold: true });
  };

  handleResetClickedAddHousehold = () => {
    this.setState({ ...this.state, clickedAddHousehold: true });
  };

  render() {
    // const {classes} = this.props;

    console.log(this.props.householdReducer);

    const households = Array.from(
      this.props.householdReducer.userHouseholds
    ).map((mapEntry) => {
      const household = mapEntry[1];
      return (
        <Grid item key={household.name}>
          <HouseholdCard
            name={household.name}
            description={household.description}
          ></HouseholdCard>
        </Grid>
      );
    });

    return (
      <div>
        <Container maxWidth="md">
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Typography variant="h5">Your households:</Typography>
            </Grid>
            <Grid item>
              <hr></hr>
            </Grid>
            {households}
            <Grid item container justify="center">
              <Grid item>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={this.handleAddHouseholdClick}
                  startIcon={
                    <React.Fragment>
                      <AddIcon />
                      <HomeIcon />
                    </React.Fragment>
                  }
                >
                  Add household
                </Button>
              </Grid>
              <Grid item>
                <AddHouseholdDialog
                  open={this.state.clickedAddHousehold}
                  resetClick={() => this.handleResetClickedAddHousehold()}
                ></AddHouseholdDialog>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userReducer: state.user,
    usersReducer: state.users,
    householdReducer: state.household,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUsersFetch: () => dispatch(actions.fetchUsers()),
    onUserHouseholdsFetch: (form) =>
      dispatch(actions.fetchUserHouseholds(form)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(HouseholdsPage));
