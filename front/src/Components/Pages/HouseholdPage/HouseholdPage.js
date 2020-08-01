import React from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Typography, Button } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import { withStyles } from "@material-ui/core/styles";

import HouseholdCard from "../../Cards/HouseholdCard/HouseholdCard";
import AddHouseholdDialog from "../../Dialog/AddHouseholdDialog/AddHouseholdDialog";

const style = {
  block: {
    padding: "10px",
  },
};

class HouseholdPage extends React.Component {
  state = {
    households: [
      { name: "bling", description: "blingsHouse" },
      { name: "rupert's", description: "ruperts house" },
    ],
    clickedAddHousehold: false,
  };

  handleAddHouseholdClick = () => {
    this.setState({ ...this.state, clickedAddHousehold: true });
  };

  render() {
    // const {classes} = this.props;

    const households = this.state.households.map((household) => {
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
                ></AddHouseholdDialog>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}
export default withStyles(style)(HouseholdPage);
