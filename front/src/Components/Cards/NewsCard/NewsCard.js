import React from "react";
import { Typography, Card, ButtonBase, Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";

import Ribbon from "../../Misc/Ribbon/Ribbon";

const style = {
  buttonOffset: {
    marginTop: "1.5rem",
    marginRight: "2rem",
    width: "1rem",
    background: "WhiteSmoke",
  },
  icon: {
    marginLeft: "-0.6rem",
  },
  card: {
    background: "Ivory",
  },
};

class NewsCard extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Card elevation={5} className={classes.card}>
          <Grid container spacing={2} direction="row">
            <Grid item>
              <Ribbon type={this.props.type}></Ribbon>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs={6} container direction="column" justify="center">
                <Grid item>
                  <Typography variant="h3">
                    <b>{this.props.name}</b>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">
                    Description: {this.props.description}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>Household:</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" color="textSecondary">
                    Author:{" "}
                  </Typography>
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
                  <Typography variant="body2">{"19.06.2020 20:30"}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </div>
    );
  }
}

export default withStyles(style)(NewsCard);
