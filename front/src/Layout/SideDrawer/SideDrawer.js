import React, { Component } from "react";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";

import logo from "../../static/logo.png";

import { NavLink } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";

const style = {
  img: {
    width: "15rem",
    height: "2,5rem",
  },
};

class SideDrawer extends Component {
  state = {
    toggled: false,
  };

  toggleDrawer = (isOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return true;
    }

    this.setState((state) => ({
      toggled: isOpen,
    }));
    return false;
  };

  render() {
    const { classes } = this.props;

    const anchor = "left";
    const drawer =
      this.state.toggled === false ? null : (
        <Drawer
          anchor={anchor}
          open={this.state.toggled}
          onClose={this.toggleDrawer(false)}
        >
          <div
            role="presentation"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            <List>
              <ListItem button component={NavLink} to="/">
                <img className={classes.img} src={logo} alt="logo" />
              </ListItem>
              <Divider />
              <ListItem button component={NavLink} to="/households">
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                Households
              </ListItem>
              <ListItem button component={NavLink} to="/news">
                <ListItemIcon>
                  <LibraryBooksIcon />
                </ListItemIcon>
                News
              </ListItem>
              <ListItem button component={NavLink} to="/users">
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                Users
              </ListItem>
            </List>
            <Divider />
            <List>
              {["All mail", "Trash", "Spam"].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
      );

    return (
      <div>
        <React.Fragment>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={this.toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          {drawer}
        </React.Fragment>
      </div>
    );
  }
}

export default withStyles(style)(SideDrawer);
