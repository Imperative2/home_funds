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
import noImg from "../../../static/NoImage.png";
import getServerURL from "../../../utils/GetEnvVar/getServerURL";

import { connect } from "react-redux";
import * as actions from "../../../redux/actions/index";

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
      userId: this.props.userReducer.user.userId,
      name: this.props.userReducer.user.name,
      surname: this.props.userReducer.user.surname,
      nickname: this.props.userReducer.user.nickname,
      email: this.props.userReducer.user.email,
      description: this.props.userReducer.user.description,
      color: this.props.userReducer.user.color,
      photo: this.props.userReducer.user.avatar,
      avatar1: userAvatar,
    },
    formEmail: {
      newEmail: null,
      newEmail2: null,
      dialogChangeEmailOpen: false,
      saveButtonEnabled: false,
    },
    formPassword: {
      formFields: {
        currentPassword: {
          value: "",
          touched: false,
          valid: false,
          minLength: 3,
          maxLength: 50,
          regex: null,
          required: true,
          match: null,
          errorMessage: null,
        },
        newPassword: {
          value: "",
          touched: false,
          valid: false,
          minLength: 3,
          maxLength: 50,
          regex: null,
          required: true,
          match: null,
          errorMessage: null,
        },
        newPassword2: {
          value: "",
          touched: false,
          valid: false,
          minLength: 3,
          maxLength: 50,
          regex: null,
          required: true,
          match: null,
          errorMessage: null,
        },
      },
      currentPassword: null,
      newPassword: null,
      newPassword2: null,
      dialogChangePasswordOpen: false,
      saveButtonEnabled: false,
    },
    formAvatar: {
      newAvatar: null,
    },
    formDescription: {
      newDescription: this.props.userReducer.user.description,
      saveButtonEnabled: false,
    },
  };

  handleAvatarUpload = (event) => {
    let image = event.target.files[0];
    this.setState({
      ...this.state,
      user: { ...this.state.user, avatar1: URL.createObjectURL(image) },
    });
  };

  handleDescriptionChange = (event) => {
    if (event.target.value !== this.state.user.description) {
      this.setState({
        ...this.state,
        formDescription: {
          ...this.state.formDescription,
          saveButtonEnabled: true,
          newDescription: event.target.value,
        },
      });
    } else {
      this.setState({
        ...this.state,
        formDescription: {
          ...this.state.formDescription,
          saveButtonEnabled: false,
          newDescription: event.target.value,
        },
      });
    }
  };

  handleSaveDescriptionButton = () => {
    this.setState({
      ...this.state,
      formDescription: {
        ...this.state.formDescription,
        saveButtonEnabled: false,
      },
    });
  };

  handleEmailDialogOpen = () => {
    this.setState({
      ...this.state,
      formEmail: {
        ...this.state.formEmail,
        dialogChangeEmailOpen: true,
      },
    });
  };

  handleEmailDialogClose = () => {
    this.setState({
      ...this.state,
      formEmail: {
        ...this.state.formEmail,
        dialogChangeEmailOpen: false,
      },
    });
  };

  handlePasswordDialogOpen = () => {
    this.setState({
      ...this.state,
      formPassword: {
        ...this.state.formPassword,
        dialogChangePasswordOpen: true,
      },
    });
  };

  handlePasswordDialogClose = () => {
    this.setState({
      ...this.state,
      formPassword: {
        ...this.state.formPassword,
        dialogChangePasswordOpen: false,
      },
    });
  };

  handleEmailChange = (target) => {};

  handlePasswordChange = (target) => {};

  render() {
    const { classes } = this.props;

    const textSize = { style: { fontSize: "1.1rem" } };
    const labelSize = { style: { fontSize: "1.2rem" } };

    console.log(this.state);

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
                      src={
                        this.state.user.photo !== ""
                          ? getServerURL() + this.state.user.photo.path
                          : noImg
                      }
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
                    value={this.state.formDescription.newDescription}
                    onChange={(event) => this.handleDescriptionChange(event)}
                  ></TextField>
                </Grid>
                <Grid item>
                  <Button
                    className={classes.buttonMargin}
                    color="primary"
                    variant="contained"
                    disabled={!this.state.formDescription.saveButtonEnabled}
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
                  open={this.state.formEmail.dialogChangeEmailOpen}
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
                        name="newEmail"
                        label="Email"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={11}>
                      <TextField
                        id="email_form2"
                        name="newEmail2"
                        label="Repeat Email"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item container justify="flex-end">
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={!this.state.formEmail.saveButtonEnabled}
                      >
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
                  open={this.state.formPassword.dialogChangePasswordOpen}
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
                        name="currentPassword"
                        label="Current Password:"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={11}>
                      <TextField
                        id="new_password"
                        name="newPassword"
                        label="New Password:"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={11}>
                      <TextField
                        id="new_password2"
                        name="newPassword2"
                        label="Repeat New Password:"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item container justify="flex-end">
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={!this.state.formPassword.saveButtonEnabled}
                      >
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

const mapStateToProps = (state) => {
  return {
    userReducer: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAvatarUpload: () => dispatch(),
    onDescriptionUpdate: () => dispatch(),
    onEmailChange: () => dispatch(),
    onPasswordChange: () => dispatch(),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(UserSettingsPage));
