import React from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Avatar,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { AccountCircle } from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";
import { withStyles } from "@material-ui/core/styles";

import userAvatar from "../../static/user_avatar.jpg";

const style = {
  root: {},
  img: {
    width: "14rem",
    height: "14rem",
    justify: "center",
    alignItems: "center",
    margin: 10,
    marginLeft: "1rem",
    marginRight: "1rem",
    border: "3px solid grey",
  },
  typography: {
    marginLeft: "2rem",
  },
  typographyNotLogged: {
    margin: "1rem 2rem",
  },
  menuItem: {
    paddingLeft: "2rem",
  },
};

class UserIconMenu extends React.Component {
  state = {
    menuOpen: false,
    anchorEl: null,
  };

  menuOpen = (event) => {
    this.setState({
      ...this.state,
      menuOpen: true,
      anchorEl: event.currentTarget,
    });
  };

  menuClose = () => {
    this.setState({ ...this.state, menuOpen: false, anchorEl: null });
  };

  render() {
    const { classes } = this.props;

    const menuLogged = (
      <React.Fragment>
        <Avatar
          alt="avatar"
          src={userAvatar}
          onClick={(event) => this.menuOpen(event)}
        ></Avatar>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.menuOpen}
          onClose={this.menuClose}
        >
          <img className={classes.img} src={userAvatar} alt="avatar"></img>
          <Typography className={classes.typography} variant="h6">
            <b>
              {this.props.userName} {this.props.userSurname}
            </b>
          </Typography>
          <Typography
            className={classes.typography}
            variant="subtitle2"
            color="textSecondary"
          >
            @{this.props.userNickname}
          </Typography>
          <hr></hr>
          <MenuItem
            className={classes.menuItem}
            component={NavLink}
            to="/user/settings"
          >
            Settings
            <SettingsIcon />
          </MenuItem>
          <MenuItem
            className={classes.menuItem}
            component={NavLink}
            to="/login"
          >
            Log out
            <ExitToAppIcon />
          </MenuItem>
        </Menu>
      </React.Fragment>
    );

    const menuNotLogged = (
      <React.Fragment>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
          onClick={(event) => this.menuOpen(event)}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.menuOpen}
          onClose={this.menuClose}
        >
          <Typography className={classes.typographyNotLogged} variant="h6">
            You are not logged in
          </Typography>
          <hr></hr>
          <MenuItem component={NavLink} to="/login">
            Log in
            <ExitToAppIcon />
          </MenuItem>
        </Menu>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        {this.props.logged === true ? menuLogged : menuNotLogged}
      </React.Fragment>
    );
  }
}

export default withStyles(style)(UserIconMenu);
