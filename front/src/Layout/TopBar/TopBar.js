import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import { NavLink } from "react-router-dom";

import SideDrawer from "../SideDrawer/SideDrawer";
import UserIconMenu from "../Menus/UserIconMenu";

import logo from "../../static/logo.png";

const styles = {
  root: {
    backgroundColor: "DarkOrange",
    marginBottom: "1%",
  },
  menuButton: {},
  title: {},
  img: {
    width: "20rem",
    height: "5rem",
  },
};

class TopBar extends Component {
  onLogoClick = () => {
    console.log(this.props);
    this.props.history.push("/");
  };

  render() {
    const { classes } = this.props;
    return (
      <AppBar position="static" classes={{ root: classes.root }}>
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={3} sm={1}>
              <SideDrawer></SideDrawer>
            </Grid>
            <Grid item xs={6} sm={10}>
              <Typography align="center" variant="h6" className={classes.title}>
                <NavLink to="/">
                  <img className={classes.img} src={logo} alt="logo"></img>
                </NavLink>
              </Typography>
            </Grid>
            <Grid item xs={3} sm={1}>
              <UserIconMenu
                logged={false}
                userName="Karol"
                userSurname="Masluch"
                userNickname="imperative"
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(TopBar);
