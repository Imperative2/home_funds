import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography, Avatar } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import LockOpenIcon from "@material-ui/icons/LockOpenOutlined";

import { connect } from "react-redux";
import * as actions from "../../../redux/actions/index";

const style = {
  iconStyle: {
    fontSize: 80,
    color: "GhostWhite",
  },
  avatarStyle: {
    padding: "50px 50px 50px 50px",
    backgroundColor: "Crimson",
    marginLeft: -50,
  },
};

class LoginPage extends Component {
  state = {
    form: {
      formFields: {
        login: {
          value: "",
        },
        password: {
          value: "",
        },
      },
      valid: true,
    },
  };

  onFormChangeHandler = (event) => {
    this.setState({
      ...this.state,
      form: {
        formFields: {
          ...this.state.form.formFields,
          [event.target.name]: {
            ...this.state.form.formFields[event.target.name],
            value: event.target.value,
          },
        },
      },
    });
  };

  onSubmitClick = () => {
    const loginForm = {
      login: this.state.form.formFields.login.value,
      password: this.state.form.formFields.password.value,
      token: null,
    };

    this.props.onFormSubmit(loginForm, this.props.history);

    // this.props.history.replace("/households");
  };

  render() {
    const { classes } = this.props;

    return (
      <Container maxWidth="xs">
        <div>
          <Grid container spacing={2}>
            <Grid item container xs={12} alignItems="center" justify="center">
              <Grid item xs={12}>
                <br></br>
                <br></br>
                <br></br>
              </Grid>
              <Grid item xs={1}>
                <Avatar className={classes.avatarStyle}>
                  <LockOpenIcon
                    className={classes.iconStyle}
                    fontSize="inherit"
                  ></LockOpenIcon>
                </Avatar>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography align="center" variant="h4">
                Log In
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                name="login"
                label="Login"
                variant="outlined"
                fullWidth
                type="login"
                autoComplete="email"
                onChange={(event) => this.onFormChangeHandler(event)}
              ></TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="login_password"
                name="password"
                label="Password"
                variant="outlined"
                type="Password"
                autoComplete="password"
                fullWidth
                onChange={(event) => this.onFormChangeHandler(event)}
              ></TextField>
              <Grid
                item
                container
                xs={12}
                sm={12}
                direction="row"
                alignItems="flex-end"
                justify="flex-start"
              >
                <Grid item>
                  <Typography variant="body2">Forgot password?</Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    component={NavLink}
                    to="/user/forgotPassword"
                  >
                    Click me
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <hr></hr>
            </Grid>
            <Grid item container xs={12} alignItems="center" justify="center">
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.onSubmitClick}
                >
                  Submit
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">You don't have account?</Typography>
                <Typography variant="body2" component={NavLink} to="/register">
                  Register
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFormSubmit: (loginForm, history) =>
      dispatch(actions.loginUser(loginForm, history)),
  };
};

export default connect(null, mapDispatchToProps)(withStyles(style)(LoginPage));
