import React from "react";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

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
  dialog: {
    margin: 10,
    width: 270,
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
  input: {
    display: "none",
  },
};

class UserSettingsPage extends React.Component {
  state = {
    user: {
      userId: 0,
      name: "Karol",
      surname: "Maśluch",
      nickname: "Imperative2",
      email: "mail@mail.com",
      description: "",
      color: "#666666",
      avatar: userAvatar,
    },
    newEmail: null,
    newPassword: null,
    newAvatar: null,
    newDescription: "",
    saveButtonEnabled: false,
    dialogChangeEmailOpen: false,
    dialogChangePasswordOpen: false,
  };

  handleAvatarUpload = (event) => {
    let image = event.target.files[0];
    this.setState({
      ...this.state,
      user: { ...this.state.user, avatar: URL.createObjectURL(image) },
    });
  };

  handleDescriptionChange = (event) => {
    if (event.target.value !== this.state.user.description) {
      this.setState({ ...this.state, saveButtonEnabled: true });
    } else {
      this.setState({ ...this.state, saveButtonEnabled: false });
    }
  };

  handleSaveDescriptionButton = () => {
    this.setState({
      ...this.state,
      user: { ...this.state.user, description: this.state.newDescription },
      saveButtonEnabled: false,
    });
  };

  handleEmailDialogOpen = () => {
    this.setState({ ...this.state, dialogChangeEmailOpen: true });
  };

  handleEmailDialogClose = () => {
    this.setState({ ...this.state, dialogChangeEmailOpen: false });
  };

  handlePasswordDialogOpen = () => {
    this.setState({ ...this.state, dialogChangePasswordOpen: true });
  };

  handlePasswordDialogClose = () => {
    this.setState({ ...this.state, dialogChangePasswordOpen: false });
  };

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
                      src={this.state.user.avatar}
                      alt="userAvatar"
                    ></img>
                  </Grid>
                  <Grid item>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="upload-avatar-button-userSettings"
                      type="file"
                      onChange={(event) => this.handleAvatarUpload(event)}
                    ></input>
                    <label htmlFor="upload-avatar-button-userSettings">
                      <Button
                        color="primary"
                        variant="contained"
                        component="span"
                      >
                        Change Avatar
                      </Button>
                    </label>
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
                      value={this.state.user.name}
                      multiline
                    ></TextField>
                  </Grid>
                  <Grid item>
                    <TextField
                      InputLabelProps={labelSize}
                      inputProps={textSize}
                      label="Surname"
                      size="small"
                      value={this.state.user.surname}
                      multiline
                    ></TextField>
                  </Grid>
                  <Grid item>
                    <TextField
                      InputLabelProps={labelSize}
                      inputProps={textSize}
                      label="Nickname"
                      size="small"
                      value={this.state.user.nickname}
                      multiline
                    ></TextField>
                  </Grid>
                  <Grid item>
                    <TextField
                      InputLabelProps={labelSize}
                      inputProps={textSize}
                      label="Email"
                      size="small"
                      value={this.state.user.email}
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
                    onChange={(event) => this.handleDescriptionChange(event)}
                  ></TextField>
                </Grid>
                <Grid item>
                  <Button
                    className={classes.buttonMargin}
                    color="primary"
                    variant="contained"
                    disabled={!this.state.saveButtonEnabled}
                    onClick={this.handleSaveDescriptionButton}
                  >
                    Save changes
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            <br></br>
            <Grid item container justify="space-evenly">
              <Grid item>
                <Button
                  className={classes.buttonOrange}
                  variant="contained"
                  onClick={this.handleEmailDialogOpen}
                >
                  Change email
                </Button>
                <Dialog
                  open={this.state.dialogChangeEmailOpen}
                  onClose={this.handleEmailDialogClose}
                  scroll="body"
                >
                  <DialogTitle>Change Email</DialogTitle>
                  <Grid
                    className={classes.dialog}
                    container
                    spacing={1}
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={11}>
                      <TextField
                        id="email_form"
                        label="Email"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={11}>
                      <TextField
                        id="email_form2"
                        label="Repeat Email"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item container justify="flex-end">
                      <Button variant="contained" color="primary">
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                </Dialog>
              </Grid>
              <Grid item>
                <Button
                  className={classes.buttonYellow}
                  variant="contained"
                  onClick={this.handlePasswordDialogOpen}
                >
                  Change password
                </Button>
                <Dialog
                  open={this.state.dialogChangePasswordOpen}
                  onClose={this.handlePasswordDialogClose}
                  scroll="body"
                >
                  <DialogTitle>Change Password</DialogTitle>
                  <Grid
                    className={classes.dialog}
                    container
                    spacing={1}
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={11}>
                      <TextField
                        id="current_password"
                        label="Current Password:"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={11}>
                      <TextField
                        id="new_password"
                        label="New Password:"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={11}>
                      <TextField
                        id="new_password2"
                        label="Repeat New Password:"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item container justify="flex-end">
                      <Button variant="contained" color="primary">
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                </Dialog>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withStyles(style)(UserSettingsPage);
