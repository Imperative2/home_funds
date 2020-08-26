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

import { connect } from "react-redux";
import * as actions from "../../../redux/actions/index";

import FormValidator from "../../../utils/Validation/FormValidator";

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
    color: {
      defaultColor: "#f44336",
      selectedColor: "#f44336",
    },
  };

  onFormChangeHandle = (event) => {
    let validatedFormFields = null;
    let validatedForm = null;

    validatedFormFields = FormValidator.getValidatedFormFields(
      event.target.name,
      event.target.value,
      this.state.form
    );

    validatedForm = FormValidator.getValidatedForm(validatedFormFields);

    this.setState({ ...this.state, form: validatedForm });
  };

  handleColorChange = (color) => {
    this.setState({
      ...this.state,
      color: { ...this.state.color, selectedColor: color.hex },
    });
  };

  handleSubmitForm = () => {
    let registrationForm = {
      name: this.state.form.formFields.name.value,
      surname: this.state.form.formFields.surname.value,
      nickname: this.state.form.formFields.nickname.value,
      email: this.state.form.formFields.email1.value,
      password: this.state.form.formFields.password1.value,
      color: this.state.color.selectedColor,
    };

    console.log(registrationForm);

    this.props.onFormSubmit(registrationForm, this.props.history);
  };

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
                required
                name="name"
                type="text"
                id="name"
                label="Name"
                variant="outlined"
                autoComplete="given-name"
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
                autoComplete="family-name"
                required
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
                autoComplete="nickname"
                required
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
                type="email"
                autoComplete="email"
                required
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
                required
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
                type="password"
                fullWidth
                required
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
                type="password"
                fullWidth
                required
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
                <CirclePicker
                  color={this.state.color.selectedColor}
                  onChange={(color) => this.handleColorChange(color)}
                ></CirclePicker>
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
                  onClick={this.handleSubmitForm}
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
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFormSubmit: (registrationForm, history) =>
      dispatch(actions.registerUser(registrationForm, history)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(style)(RegistrationPage));
