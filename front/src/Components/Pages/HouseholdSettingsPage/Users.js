import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Chip from "@material-ui/core/Chip";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ClearIcon from "@material-ui/icons/Clear";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListAvatar from "@material-ui/core/ListItemAvatar";
import ListText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import userAvatar from "../../../static/user_avatar.jpg";
import noImg from "../../../static/NoImage.png";
import getServerURL from "../../../utils/GetEnvVar/getServerURL";
import emailRegex from "../../../utils/regex/emailRegex";
import FormValidator from "../../../utils/Validation/FormValidator";

import { connect } from "react-redux";
import * as actions from "../../../redux/actions/index";

import TextFieldWithLabel from "../../Input/TextFieldWithLabel/TextFieldWithLabel";
import generateRandomNames from "../../../utils/GenerateRandomNames/GenerateRandomNames";
import GenericTable from "../../Tables/GenericTable/GenericTable";

const style = {
  img: {
    borderRadius: "10px",
    width: 200,
    height: 200,
    border: "3px groove DeepSkyBlue",
  },
  block: {
    padding: 20,
  },
  dialog: {
    margin: 10,
    width: 270,
  },
  buttonMarginTop: {
    marginTop: 10,
  },
  textFieldFont: {
    fontSize: "50px",
  },
  buttonOrange: {
    backgroundColor: "Orange",
    margin: 20,
  },
  buttonYellow: {
    backgroundColor: "YellowGreen",
    margin: 20,
  },
  input: {
    display: "none",
  },
  border: {
    border: "3px solid Navy",
    borderRadius: 5,
  },
  chipDialog: {
    margin: 10,
    width: 200,
  },
  usersList: {
    maxHeight: "75vh",
    overflow: "auto",
  },
  searchBar: {
    background: "DodgerBlue",
    borderRadius: 5,
  },
  iconPadding: {
    paddingLeft: "5px",
  },
};

class Users extends React.Component {
  render() {
    const { classes } = this.props;
    const textSize = { style: { fontSize: "1.1rem" } };
    const labelSize = { style: { fontSize: "1.2rem" } };
    const textColor = { style: { color: "white" } };
    console.log(this.props);

    let usersArray = Array.from(this.props.usersMap);

    if (this.props.canSearch === true) {
      usersArray = Array.from(this.props.searchUsers);
    }

    let users = usersArray.map((mapEntry) => {
      const user = mapEntry[1];

      let iconButton = (
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => this.props.handleAddUserButton(user.userId)}
        >
          <PersonAddIcon />
        </IconButton>
      );

      for (let i = 0; i < this.props.householdUsersArray.length; i++) {
        if (this.props.householdUsersArray[i].user.userId === user.userId) {
          iconButton = (
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => this.props.handleRemoveUserButton(user.userId)}
            >
              <ClearIcon />
            </IconButton>
          );
          break;
        }
      }

      return (
        <React.Fragment key={user.userId}>
          <ListItem>
            <ListAvatar>
              <Avatar
                src={
                  user.avatar != null && user.avatar.path != null
                    ? getServerURL() + user.avatar.path
                    : null
                }
              ></Avatar>
            </ListAvatar>
            <ListText
              primary={user.name + " " + user.surname}
              secondary={"@" + user.nickname}
            />
            <ListItemSecondaryAction>{iconButton}</ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </React.Fragment>
      );
    });

    return (
      <Grid item xs={12}>
        <Paper elevation={5} className={classes.block}>
          <Grid item xs={12} container>
            <Grid item xs={12}>
              <Typography variant="h6">Users:</Typography>
            </Grid>
            <Grid item container direction="row">
              {this.props.householdUsersArray.map((entry) => {
                const user = entry.user;
                return (
                  <Grid item key={user.userId}>
                    <ListItem>
                      <ListAvatar>
                        <Avatar
                          src={
                            user.avatar != null && user.avatar.path != null
                              ? getServerURL() + user.avatar.path
                              : null
                          }
                        ></Avatar>
                      </ListAvatar>
                      <ListText
                        primary={user.name + " " + user.surname}
                        secondary={"@" + user.nickname}
                      />
                      <IconButton
                        className={classes.iconPadding}
                        edge="end"
                        aria-label="delete"
                        onClick={() =>
                          this.props.handleRemoveUserButton(user.userId)
                        }
                      >
                        <ClearIcon />
                      </IconButton>
                    </ListItem>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid container spacing={2} direction="column">
            <Grid className={classes.searchBar} item xs={12}>
              <TextField
                InputProps={textColor}
                fullWidth
                variant="outlined"
                placeholder="Search"
                onChange={(event) => this.props.handleSearchChange(event)}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12}>
              <List className={classes.usersList}>{users}</List>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(style)(Users);
