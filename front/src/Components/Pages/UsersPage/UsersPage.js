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

import userAvatar from "../../../static/user_avatar.jpg";

const style = {};

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
        avatar: userAvatar,
        description: "somethign something",
        email: "mail@hotmail.com",
      },
      {
        id: 2,
        name: "Michał",
        surname: "Pychał",
        nickname: "pussyDestroyerXXX",
        avatar: userAvatar,
        description: "somethign something",
        email: "mail@facebook.com",
      },
    ],
  };

  render() {
    const { classes } = this.props;

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
      <Container maxWidth="sm">
        <Grid container spacing={2} direction="column">
          <Grid item>Users</Grid>
          <Grid item xs={12}>
            <TextField
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
    );
  }
}

export default withStyles(style)(UsersPage);
