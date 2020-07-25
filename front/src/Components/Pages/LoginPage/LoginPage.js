import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography, Avatar } from "@material-ui/core";

import LockOpenIcon from "@material-ui/icons/LockOpenOutlined";

class LoginPage extends Component {
  onSubmitClick = () => {
    this.props.history.replace("/households");
  };

  render() {
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
                <Avatar>
                  <LockOpenIcon fontSize="large"></LockOpenIcon>
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
                label="Login"
                variant="outlined"
                fullWidth
                type="login"
              ></TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="login_password"
                label="Password"
                variant="outlined"
                type="Password"
                fullWidth
              ></TextField>
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

export default LoginPage;
