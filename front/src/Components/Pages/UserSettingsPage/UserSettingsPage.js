import React from "react";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import userAvatar from "../../../static/user_avatar.jpg";

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
  buttonMargin: {
    margin: 20,
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
};

class UserSettingsPage extends React.Component {
  render() {
    const { classes } = this.props;

    const textSize = { style: { fontSize: "1.1rem" } };
    const labelSize = { style: { fontSize: "1.2rem" } };

    return (
      <div>
        <Container maxWidth="sm">
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Typography variant="h6">
                <b>Settings</b>
              </Typography>
            </Grid>
            <Paper elevation={5}>
              <Grid item container direction="row" className={classes.block}>
                <Grid
                  item
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  sm={6}
                >
                  <Grid>
                    <Typography variant="subtitle1" color="textSecondary">
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
                    <br></br>
                  </Grid>

                  <Grid item>
                    <TextField
                      InputLabelProps={labelSize}
                      inputProps={textSize}
                      label="Name"
                      size="small"
                      value="Karol"
                      multiline
                    ></TextField>
                  </Grid>
                  <Grid item>
                    <TextField
                      InputLabelProps={labelSize}
                      inputProps={textSize}
                      label="Surname"
                      size="small"
                      value="Masluch"
                      multiline
                    ></TextField>
                  </Grid>
                  <Grid item>
                    <TextField
                      InputLabelProps={labelSize}
                      inputProps={textSize}
                      label="Nickname"
                      size="small"
                      value="Imperative2"
                      multiline
                    ></TextField>
                  </Grid>
                  <Grid item>
                    <TextField
                      InputLabelProps={labelSize}
                      inputProps={textSize}
                      label="Email"
                      size="small"
                      value="longemail@gmail.com"
                      multiline
                    ></TextField>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            <br></br>
            <Paper elevation={5}>
              <Grid
                className={classes.block}
                item
                container
                alignItems="center"
              >
                <Grid item>
                  <Typography variant="h6">Description</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                  ></TextField>
                </Grid>
                <Grid item>
                  <Button
                    className={classes.buttonMargin}
                    color="primary"
                    variant="contained"
                    disabled
                  >
                    Save changes
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            <br></br>
            <Grid item container justify="space-evenly">
              <Grid item>
                <Button className={classes.buttonOrange} variant="contained">
                  Change email
                </Button>
              </Grid>
              <Grid item>
                <Button className={classes.buttonYellow} variant="contained">
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
