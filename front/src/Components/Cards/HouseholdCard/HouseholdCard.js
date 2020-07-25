import React from "react";

import { Typography, Card, ButtonBase, Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";

import noimage from "../../../static/NoImage.png";

import { withStyles } from "@material-ui/core/styles";

import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";

const style = {
  buttonBase: {
    width: 1000,
    height: 1000,
  },

  img: {
    margin: "auto",
    display: "block",
    width: 200,
    height: 200,
    maxHeight: "100%",
    maxWidth: "100%",
  },
};

class HouseholdCard extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Card>
          <Grid container spacing={2} direction="row">
            <Grid item>
              <ButtonBase className={classes.ButtonBase}>
                <img
                  className={classes.img}
                  src={noimage}
                  alt="household"
                ></img>
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs={6} container direction="column" justify="center">
                <Grid item>
                  <Typography variant="h5">
                    Name: <b>{this.props.name}</b>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">
                    Description: {this.props.description}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" color="textSecondary">
                    Owner:{" "}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography> sdfgsdfg</Typography>
                </Grid>
              </Grid>
              <Grid
                item
                xs={6}
                container
                direction="column"
                alignItems="flex-end"
              >
                <Grid item>
                  <Button
                    variant="outlined"
                    endIcon={<SettingsRoundedIcon />}
                  ></Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </div>
    );
  }
}

export default withStyles(style)(HouseholdCard);
