import React from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Typography, Button } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";

import HouseholdCard from "../../Cards/HouseholdCard/HouseholdCard";

class HouseholdPage extends React.Component {
  state = {
    households: [
      { name: "bling", description: "blingsHouse" },
      { name: "rupert's", description: "ruperts house" },
    ],
  };

  render() {
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
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}
export default HouseholdPage;
