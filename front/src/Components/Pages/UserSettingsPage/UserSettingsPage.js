import React from "react";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

import userAvatar from "../../../static/user_avatar.jpg";

const style = {
  img: {
    borderRadius: "10px",
    width: 200,
    height: 200,
    border: "3px groove DeepSkyBlue",
  },
};

class UserSettingsPage extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Container maxWidth="sm">
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h6">
                <b>Settings</b>
              </Typography>
            </Grid>
            <Grid item container direction="row">
              <Grid
                item
                container
                direction="column"
                justify="center"
                alignItems="center"
                sm={6}
              >
                <Grid>
                  <Typography variant="subtitle2" color="textSecondary">
                    Avatar:
                  </Typography>
                </Grid>
                <Grid item>
                  <img
                    className={classes.img}
                    src={userAvatar}
                    alt="userAvatar"
                  ></img>
                </Grid>
                <Grid item>
                  <Button color="primary" variant="contained">
                    Change Avatar
                  </Button>
                </Grid>
              </Grid>
              <Grid item container direction="column" sm={6} spacing={2}>
                <Grid item>
                  <Typography variant="h6">Name: {"karol "}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">Surname: {"Masluch"}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">
                    Nickname: {"Imperative2"}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">
                    Email: {"longemail@gmail.com"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item container>
              <Grid item>
                <Typography variant="h6">Description</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField variant="outlined" multiline fullWidth></TextField>
              </Grid>
              <Grid item>
                <Button color="primary" variant="contained">
                  Change email
                </Button>
              </Grid>
              <Grid item>
                <Button color="primary" variant="contained">
                  Change password
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withStyles(style)(UserSettingsPage);
