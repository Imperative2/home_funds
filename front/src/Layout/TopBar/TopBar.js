import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import { NavLink } from "react-router-dom";

import SideDrawer from "../SideDrawer/SideDrawer";
import UserIconMenu from "../Menus/UserIconMenu";

import logo from "../../static/logo.png";

import * as actions from "../../redux/actions/index";
import { connect } from "react-redux";

const styles = {
  root: {
    backgroundColor: "DeepSkyBlue",
    marginBottom: "1%",
  },
  menuButton: {},
  title: {},
  img: {
    width: "60%",
    height: "3rem",
    maxWidth: "19.8rem",
    minWidth: "11rem",
    maxHeight: "3rem",
    marginBottom: "-0.5rem",
  },
};

class TopBar extends Component {
  state = {
    user: {
      name: this.props.userReducer.user.name,
      surname: this.props.userReducer.user.surname,
      nickname: this.props.userReducer.user.nickname,
      logged: this.props.userReducer.isLogged,
    },
  };

  onLogoClick = () => {
    console.log(this.props);
    this.props.history.push("/");
  };

  onButtonLogClick = () => {
    this.props.onUserLogin();
  };

  render() {
    console.log(this.state);
    console.log(this.props.userReducer.isLogged);

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
                logged={this.state.user.logged}
                userName={this.state.user.name}
                userSurname={this.state.user.surname}
                userNickname={this.state.user.nickname}
              />
            </Grid>
            <Grid item>
              <Button onClick={this.onButtonLogClick}> LOG</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userReducer: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUserLogin: () => dispatch(actions.loginUser()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TopBar));
