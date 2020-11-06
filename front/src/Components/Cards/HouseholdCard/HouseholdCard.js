import React from "react";

import { Typography, Card, ButtonBase, Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import noImg from "../../../static/NoImage.png";
import house1 from "../../../static/house_1.jpg";

import AvatarLabel from "../../Labels/AvatarLabel/AvatarLabel";

import getServerURL from "../../../utils/GetEnvVar/getServerURL"

const style = {
  img: {
    margin: "auto",
    display: "block",
    width: "13rem",
    height: "13rem",
    maxHeight: "100%",
    maxWidth: "100%",
  },
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
    background: "LavenderBlush",
  },
};

class HouseholdCard extends React.Component {
  render() {
    const { classes } = this.props;



    let settingsButton= null;

    if(this.props.currentUser.userId === this.props.owner.userId)
    {
      settingsButton = (<Grid item>
        <NavLink
          to={"/household/" + this.props.householdId + "/settings"}
        >
          <Button
            className={classes.buttonOffset}
            variant="outlined"
            endIcon={<SettingsRoundedIcon className={classes.icon} />}
          ></Button>
        </NavLink>
      </Grid>)
    }


    return (
      <div>
        <Card elevation={5} className={classes.card}>
          <Grid container spacing={2} direction="row">
            <Grid item>
              <ButtonBase>
                <NavLink to={"/household/" + this.props.householdId}>
                  <img
                    className={classes.img}
                    src={
                      this.props.household.photo != null 
                        ? getServerURL() + this.props.household.photo.path
                        : noImg
                    }
                    alt="household"
                  ></img>
                </NavLink>
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
                  <AvatarLabel
                    user={this.props.owner}
                    photo={this.props.owner.avatar}
                  ></AvatarLabel>
                </Grid>
              </Grid>
              <Grid
                item
                xs={6}
                container
                direction="column"
                alignItems="flex-end"
              >
                {settingsButton}
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </div>
    );
  }
}

export default withStyles(style)(HouseholdCard);
