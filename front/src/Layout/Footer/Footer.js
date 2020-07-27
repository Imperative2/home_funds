import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

import { Typography } from "@material-ui/core";

const style = {
  background1: {
    marginTop: 100,
    backgroundColor: "DeepSkyBlue",
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  background2: {
    backgroundColor: "DodgerBlue",
    padding: 10,
  },
  textColor: {
    color: "WhiteSmoke",
  },
  linksOffset: {
    marginLeft: 50,
  },
};

class Footer extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Grid className={classes.background1} container direction="column">
          <Grid item container direction="row">
            <Grid xs={12} md={6} container item direction="column">
              <Grid item>
                <Typography className={classes.textColor} variant="h6">
                  Information
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.textColor} variant="subtitle2">
                  Here you can find all sorts of usefull information
                </Typography>
              </Grid>
            </Grid>
            <Grid item container xs={12} md={6} direction="column">
              <Grid item>
                <Typography className={classes.textColor} variant="h6">
                  Links
                </Typography>
              </Grid>
              <Grid
                className={classes.linksOffset}
                item
                container
                direction="column"
              >
                <Grid item>
                  <Typography className={classes.textColor}>
                    Contact Info
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.textColor}>
                    About us
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.textColor}>
                    Terms of Service
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.textColor}>Help</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.background2} container justify="center">
          <Grid className={classes.textColor} item>
            &copy; {new Date().getFullYear()} Copyright:
            <a href="/"> Karol Masluch </a>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(style)(Footer);
