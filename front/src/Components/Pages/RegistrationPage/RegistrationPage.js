import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

import { NavLink } from "react-router-dom";

import { CirclePicker } from "react-color";

const style = {
  img: {
    width: "100%",
    maxWidth: 400,
    maxHeight: 400,
  },
};

class RegistrationPage extends React.Component {
  render() {
    // const { classes } = this.props;

    return (
      <Container maxWidth="xs">
        <div>
          <br></br>
          <br></br>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography align="center" variant="h4">
                Sign up
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="name_form"
                label="Name"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="surname_form"
                label="Surname"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="nickname_form"
                label="Nickname"
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <hr></hr>
              <TextField
                id="email_form"
                label="Email"
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="email_form2"
                label="Retype email"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <hr></hr>
              <TextField
                id="password_form"
                label="Password"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password_form2"
                label="Retype password"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item container xs={12} justify="center" alignItems="center">
              <Grid item xs={12}>
                <hr></hr>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="button">
                  Choose your primary color:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CirclePicker></CirclePicker>
              </Grid>
            </Grid>
            <Grid xs={12} item container justify="center" alignItems="center">
              <Grid item xs={12}>
                <hr></hr>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" color="primary">
                  Sign up
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">Already got Account?</Typography>
                <Typography variant="body2" component={NavLink} to="/login">
                  Log in
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Container>

      //   <div>

      //       <Grid item xs={11} md={4}>
      //         <Paper elevation={3}>
      //           <Typography>
      //             <img src={logoImg} alt="logo"></img>
      //           </Typography>
      //         </Paper>
      //       </Grid>

      //         </Grid>
      //       </Grid>
      //       <hr></hr>
      //       <Grid item xs={12}>
      //         <Divider variant="fullWidth"></Divider>
      //       </Grid>
      //       <Grid container item xs={11} md={6} justify="center" spacing={3}>
      //         <Grid item>

      //         </Grid>
      //         <Grid item>
      //           <TextField
      //             id="outlined-basic"
      //             label="Repeat Email"
      //             variant="outlined"
      //           />
      //           <hr></hr>
      //         </Grid>
      //       </Grid>
      //       <Grid item xs={12}>
      //         <Divider variant="inset"></Divider>
      //       </Grid>
      //       <Grid container item xs={11} md={6} justify="center" spacing={3}>
      //         <Grid item>

      //         </Grid>
      //         <Grid item>
      //           <TextField
      //             id="outlined-basic"
      //             label="Repeat password"
      //             variant="outlined"
      //           />
      //         </Grid>
      //       </Grid>
      //     </Grid>
      //   </div>
    );
  }
}

export default withStyles(style)(RegistrationPage);
