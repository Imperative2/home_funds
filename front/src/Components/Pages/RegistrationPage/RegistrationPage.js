import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

import { NavLink } from "react-router-dom";

import emailRegex from "../../../utils/regex/emailRegex";

import { CirclePicker } from "react-color";

const style = {
  img: {
    width: "100%",
    maxWidth: 400,
    maxHeight: 400,
  },
};

class RegistrationPage extends React.Component {
  state = {
    form: {
      formFields: {
        name: {
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
        surname: {
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
        nickname: {
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
        email1: {
          value: "",
          touched: false,
          valid: false,
          minLength: 3,
          maxLength: 50,
          regex: emailRegex.emailRegex,
          required: true,
          match: null,
          errorMessage: null,
        },
        email2: {
          value: "",
          touched: false,
          valid: false,
          minLength: 3,
          maxLength: 50,
          regex: null,
          required: true,
          match: "email1",
          errorMessage: null,
        },
        password1: {
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
        password2: {
          value: "",
          touched: false,
          valid: false,
          minLength: 3,
          maxLength: 50,
          regex: null,
          required: true,
          match: "password1",
          errorMessage: null,
        },
      },
      formValid: false,
      enableSubmitButton: false,
    },
  };

  onFormChangeHandle = (event) => {
    let field = this.state.form.formFields[event.target.name];
    let newState = this.state;

    newState = this.validateField(
      event.target.name,
      event.target.value,
      newState
    );

    newState = this.validateForm(newState);

    this.setState(newState);
  };

  validateField = (fieldName, fieldValue, state) => {
    let field = state.form.formFields[fieldName];

    let valid = true;

    let errorMessage = null;

    if ((field.minLength !== null) & (fieldValue.length < field.minLength)) {
      valid = valid & false;
      errorMessage = "Too short";
    }
    if ((field.maxLength !== null) & (fieldValue.length > field.maxLength)) {
      valid = valid & false;
      errorMessage = "Too long";
    }
    if ((field.regex !== null) & (fieldValue.match(field.regex) === null)) {
      valid = valid & false;
      errorMessage = "Wrong characters";
    }
    if ((field.required !== false) & (fieldValue === "")) {
      valid = valid & false;
      errorMessage = "Field required";
    }
    if (field.match !== null) {
      const matchFieldValue = state.form.formFields[field.match].value;
      if (fieldValue !== matchFieldValue) {
        valid = valid & false;
        errorMessage = "Doesn't match";
      }
    }

    if (valid === true) {
      state = {
        ...state,
        form: {
          ...state.form,
          formFields: {
            ...state.form.formFields,
            [fieldName]: {
              ...state.form.formFields[fieldName],
              valid: valid,
              touched: true,
              value: fieldValue,
              errorMessage: null,
            },
          },
        },
      };
      return state;
    } else {
      state = {
        ...state,
        form: {
          ...state.form,
          formFields: {
            ...state.form.formFields,
            [fieldName]: {
              ...state.form.formFields[fieldName],
              valid: false,
              touched: true,
              value: fieldValue,
              errorMessage: errorMessage,
            },
          },
        },
      };
      return state;
    }
  };

  validateForm = (state) => {
    const size = Object.keys(state.form.formFields).length;
    let formValid = true;
    for (let i = 0; i < size; i++) {
      let field = state.form.formFields[Object.keys(state.form.formFields)[i]];

      if (field.valid === false) {
        formValid = formValid & false;
      }
    }
    state = {
      ...state,
      form: {
        ...state.form,
        formValid: formValid,
        enableSubmitButton: formValid,
      },
    };
    return state;
  };

  // enableSubmitButton = () => {
  //   this.setState({
  //     ...this.state,
  //     form: { ...this.state.form, enableSubmitButton: true },
  //   });
  // };

  // disableSubmitButton = () => {
  //   this.setState({
  //     ...this.state,
  //     form: { ...this.state.form, enableSubmitButton: false },
  //   });
  // };

  render() {
    // const { classes } = this.props;

    console.log(emailRegex.emailRegex);

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
                required
                name="name"
                type="text"
                id="name"
                label="Name"
                variant="outlined"
                fullWidth
                error={
                  this.state.form.formFields.name.touched === true &&
                  this.state.form.formFields.name.valid === false
                    ? true
                    : false
                }
                helperText={
                  this.state.form.formFields.name.touched === true &&
                  this.state.form.formFields.name.valid === false
                    ? this.state.form.formFields.name.errorMessage
                    : null
                }
                onChange={(event) => this.onFormChangeHandle(event)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="surname"
                name="surname"
                label="Surname"
                variant="outlined"
                fullWidth
                error={
                  this.state.form.formFields.surname.touched === true &&
                  this.state.form.formFields.surname.valid === false
                    ? true
                    : false
                }
                helperText={
                  this.state.form.formFields.surname.touched === true &&
                  this.state.form.formFields.surname.valid === false
                    ? this.state.form.formFields.surname.errorMessage
                    : null
                }
                onChange={(event) => this.onFormChangeHandle(event)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="nickname"
                name="nickname"
                label="Nickname"
                variant="outlined"
                fullWidth
                error={
                  this.state.form.formFields.nickname.touched === true &&
                  this.state.form.formFields.nickname.valid === false
                    ? true
                    : false
                }
                helperText={
                  this.state.form.formFields.nickname.touched === true &&
                  this.state.form.formFields.nickname.valid === false
                    ? this.state.form.formFields.nickname.errorMessage
                    : null
                }
                onChange={(event) => this.onFormChangeHandle(event)}
              />
            </Grid>

            <Grid item xs={12}>
              <hr></hr>
              <TextField
                id="email1"
                name="email1"
                label="Email"
                variant="outlined"
                fullWidth
                error={
                  this.state.form.formFields.email1.touched === true &&
                  this.state.form.formFields.email1.valid === false
                    ? true
                    : false
                }
                helperText={
                  this.state.form.formFields.email1.touched === true &&
                  this.state.form.formFields.email1.valid === false
                    ? this.state.form.formFields.email1.errorMessage
                    : null
                }
                onChange={(event) => this.onFormChangeHandle(event)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="email2"
                name="email2"
                label="Retype email"
                variant="outlined"
                fullWidth
                error={
                  this.state.form.formFields.email2.touched === true &&
                  this.state.form.formFields.email2.valid === false
                    ? true
                    : false
                }
                helperText={
                  this.state.form.formFields.email2.touched === true &&
                  this.state.form.formFields.email2.valid === false
                    ? this.state.form.formFields.email2.errorMessage
                    : null
                }
                onChange={(event) => this.onFormChangeHandle(event)}
              />
            </Grid>
            <Grid item xs={12}>
              <hr></hr>
              <TextField
                id="password1"
                name="password1"
                label="Password"
                variant="outlined"
                fullWidth
                error={
                  this.state.form.formFields.password1.touched === true &&
                  this.state.form.formFields.password1.valid === false
                    ? true
                    : false
                }
                helperText={
                  this.state.form.formFields.password1.touched === true &&
                  this.state.form.formFields.password1.valid === false
                    ? this.state.form.formFields.password1.errorMessage
                    : null
                }
                onChange={(event) => this.onFormChangeHandle(event)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password2"
                name="password2"
                label="Retype password"
                variant="outlined"
                fullWidth
                error={
                  this.state.form.formFields.password2.touched === true &&
                  this.state.form.formFields.password2.valid === false
                    ? true
                    : false
                }
                helperText={
                  this.state.form.formFields.password2.touched === true &&
                  this.state.form.formFields.password2.valid === false
                    ? this.state.form.formFields.password2.errorMessage
                    : null
                }
                onChange={(event) => this.onFormChangeHandle(event)}
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
                <Button
                  disabled={!this.state.form.enableSubmitButton}
                  variant="contained"
                  color="primary"
                >
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
