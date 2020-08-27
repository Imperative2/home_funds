import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListAvatar from "@material-ui/core/ListItemAvatar";
import ListText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

import userAvatar from "../../../static/user_avatar.jpg";
import userAvatar2 from "../../../static/user_avatar2.jpg";
import userAvatar3 from "../../../static/user_avatar3.jpg";

const style = {
  searchBar: {
    background: "DodgerBlue",
    borderRadius: 5,
  },
  tabs: {
    background: "Orange",
    padding: "5px 0px 0px 0px ",
    marginTop: "1rem",
    marginBottom: "0.3rem",
  },
  container: {
    paddingLeft: "0px",
    paddingRight: "0px",
  },
  tab: {
    color: "white",
    fontSize: "1.0rem",
  },
};

class UsersPage extends React.Component {
  state = {
    users: [
      {
        id: 0,
        name: "Karol",
        surname: "Masluch",
        nickname: "Imperative",
        avatar: userAvatar,
        description: "somethign something",
        email: "mail@mail.com",
      },
      {
        id: 1,
        name: "Paweł",
        surname: "Gaweł",
        nickname: "doggerstad",
        avatar: userAvatar2,
        description: "somethign something",
        email: "mail@hotmail.com",
      },
      {
        id: 2,
        name: "Michał",
        surname: "Pychał",
        nickname: "pussyDestroyerXXX",
        avatar: userAvatar3,
        description: "somethign something",
        email: "mail@facebook.com",
      },
    ],

    tabs: {
      value: 1,
    },
  };

  handleTabChange = (event, newValue) => {
    this.setState({
      ...this.state,
      tabs: { ...this.state.tabs, value: newValue },
    });
  };

  render() {
    const { classes } = this.props;
    const textSize = { style: { fontSize: "1.1rem" } };
    const labelSize = { style: { fontSize: "1.2rem" } };
    const textColor = { style: { color: "white" } };

    let users = this.state.users.map((user) => {
      return (
        <React.Fragment key={user.id}>
          <ListItem>
            <ListAvatar>
              <Avatar src={user.avatar}></Avatar>
            </ListAvatar>
            <ListText
              primary={user.name + " " + user.surname}
              secondary={"@" + user.nickname}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <PersonAddIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </React.Fragment>
      );
    });

    return (
      <React.Fragment>
        <Container maxWidth="md" className={classes.container}>
          {" "}
          <Paper elevation={5}>
            <Tabs
              className={classes.tabs}
              indicatorColor="primary"
              aria-label="users-tabs"
              variant="fullWidth"
              value={this.state.tabs.value}
              centered
              onChange={this.handleTabChange}
            >
              <Tab label="Users" className={classes.tab} />
              <Tab label="Friends" className={classes.tab} />
              <Tab label="Housemates" className={classes.tab} />
            </Tabs>
          </Paper>
        </Container>
        <Container maxWidth="sm">
          <Grid container spacing={2} direction="column">
            <Grid item xs={12}></Grid>
            <Grid className={classes.searchBar} item xs={12}>
              <TextField
                InputProps={textColor}
                fullWidth
                variant="outlined"
                placeholder="Search"
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12}>
              <List>
                {users}
                {users}
                {users}
                {users}
                {users}
              </List>
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(style)(UsersPage);
