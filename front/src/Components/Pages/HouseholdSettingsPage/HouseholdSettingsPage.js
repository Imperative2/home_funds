import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Chip from "@material-ui/core/Chip";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ClearIcon from "@material-ui/icons/Clear";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListAvatar from "@material-ui/core/ListItemAvatar";
import ListText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import userAvatar from "../../../static/user_avatar.jpg";
import noImg from "../../../static/NoImage.png";
import getServerURL from "../../../utils/GetEnvVar/getServerURL";
import emailRegex from "../../../utils/regex/emailRegex";
import FormValidator from "../../../utils/Validation/FormValidator";

import { connect } from "react-redux";
import * as actions from "../../../redux/actions/index";

import TextFieldWithLabel from "../../Input/TextFieldWithLabel/TextFieldWithLabel";
import generateRandomNames from "../../../utils/GenerateRandomNames/GenerateRandomNames";
import GenericTable from "../../Tables/GenericTable/GenericTable";

import Products from "./Products";
import Users from "./Users";

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
  buttonMarginTop: {
    marginTop: 10,
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
  border: {
    border: "3px solid Navy",
    borderRadius: 5,
  },
  chipDialog: {
    margin: 10,
    width: 200,
  },
  usersList: {
    maxHeight: "50vh",
    overflow: "auto",
  },
  searchBar: {
    background: "DodgerBlue",
    borderRadius: 5,
  },
};

class HouseholdSettingsPage extends React.Component {
  state = {
    householdId: this.props.match.params.householdId,
    household: this.props.householdReducer.userHouseholds.get(
      Number(this.props.match.params.householdId)
    ),
    formHousehold: {
      formFields: {
        name: {
          value: "",
          touched: false,
          valid: false,
          minLength: 3,
          maxLength: 50,
          required: true,
          errorMessage: null,
        },
        description: {
          value: "",
          touched: true,
          valid: true,
          minLength: 0,
          maxLength: 500,
          required: false,
          errorMessage: null,
        },
      },
      enableButtonNameSave: false,
      enableButtonDescriptionSave: false,
      photo: noImg,
      addedUsers: new Map(),
    },
    formAddProduct: {
      formFields: {
        productName: {
          value: "",
          touched: false,
          valid: false,
          minLength: 3,
          maxLength: 20,
          required: true,
          regex: null,
        },
      },
      formValid: false,
      enableSubmitButton: false,
      addProductDialogOpen: false,
    },
    search: {
      value: "",
      canSearch: false,
    },
  };

  componentDidMount() {
    this.props.onFetchHousehold(this.props.match.params.householdId);

    let map = this.props.householdReducer.userHouseholds;

    if (map.has(Number(this.props.match.params.householdId)) === true) {
      let household = map.get(Number(this.props.match.params.householdId));

      let userMap = new Map();

      household.householdUsers.forEach((user) => {
        userMap.set(user.user.userId, user.user);
      });

      this.setState({
        ...this.state,
        household: household,
        formHousehold: {
          ...this.state.formHousehold,
          formFields: {
            ...this.state.formHousehold.formFields,
            name: {
              ...this.state.formHousehold.formFields.name,
              value: household.name,
            },
            description: {
              ...this.state.formHousehold.formFields.description,
              value: household.description,
            },
          },
          photo: noImg,
          addedUsers: userMap,
        },
      });
    } else {
      this.setState({ ...this.state, household: null });
    }
  }

  handleNameChange = (event) => {
    let household = this.props.householdReducer.userHouseholds.get(
      Number(this.state.householdId)
    );

    let validatedFields = FormValidator.getValidatedFormFields(
      "name",
      event.target.value,
      this.state.formHousehold
    );

    let nameChanged = false;
    if (household.name !== validatedFields.formFields.name.value) {
      nameChanged = true;
    }
    nameChanged = nameChanged & validatedFields.formFields.name.valid;

    this.setState({
      ...this.state,
      formHousehold: {
        ...validatedFields,
        enableButtonNameSave: nameChanged,
      },
    });
  };

  handleDescriptionChange = (event) => {
    let household = this.props.householdReducer.userHouseholds.get(
      Number(this.state.householdId)
    );

    let validatedFields = FormValidator.getValidatedFormFields(
      "description",
      event.target.value,
      this.state.formHousehold
    );
    let descriptionChanged = false;
    if (
      household.description !== validatedFields.formFields.description.value
    ) {
      descriptionChanged = true;
    }

    descriptionChanged =
      descriptionChanged & validatedFields.formFields.description.valid;

    this.setState({
      ...this.state,
      formHousehold: {
        ...validatedFields,
        enableButtonDescriptionSave: descriptionChanged,
      },
    });
  };

  handleNameSaveButton = () => {
    let form = {
      householdId: this.state.household.householdId,
      name: this.state.formHousehold.formFields.name.value,
    };

    this.props.onNameUpdate(form);

    this.setState({
      ...this.state,
      formHousehold: {
        ...this.state.formHousehold,
        enableButtonNameSave: false,
      },
    });
  };

  handleDescriptionSaveButton = () => {
    let form = {
      householdId: this.state.household.householdId,
      description: this.state.formHousehold.formFields.description.value,
    };

    this.props.onDescriptionUpdate(form);
    this.setState({
      ...this.state,
      formHousehold: {
        ...this.state.formHousehold,
        enableButtonDescriptionSave: false,
      },
    });
  };

  handleButtonOpenAddProductDialog = () => {
    this.setState({
      ...this.state,
      formAddProduct: {
        ...this.state.formAddProduct,
        addProductDialogOpen: true,
      },
    });
  };

  handleCloseAddProductDialog = () => {
    this.setState({
      ...this.state,
      formAddProduct: {
        formFields: {
          productName: {
            value: "",
            touched: false,
            valid: false,
            minLength: 3,
            maxLength: 20,
            required: true,
            regex: null,
          },
        },
        formValid: false,
        enableSubmitButton: false,
        addProductDialogOpen: false,
      },
    });
  };

  handleAddProductInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    const validatedFields = FormValidator.getValidatedFormFields(
      name,
      value,
      this.state.formAddProduct
    );
    const validatedForm = FormValidator.getValidatedForm(validatedFields);

    this.setState({ ...this.state, formAddProduct: validatedForm });
  };

  handleProductAddButton = () => {
    let form = {
      name: this.state.formAddProduct.formFields.productName.value,
      householdId: this.state.household.householdId,
    };

    this.props.onAddHouseholdProduct(form);
    this.handleCloseAddProductDialog();

    console.log("Product added");

    this.props.onFetchHousehold(this.state.householdId);
  };

  buttonClick = () => {
    console.log(this.state);
    console.log(this.props.householdReducer);
  };

  render() {
    console.log(this.props);
    const { classes } = this.props;
    const textSize = { style: { fontSize: "1.1rem" } };
    const labelSize = { style: { fontSize: "1.2rem" } };
    const textColor = { style: { color: "white" } };

    if (this.state.household == null) {
      this.props.history.push("/");
      return null;
    }

    return (
      <div>
        <Container maxWidth="md">
          <Button onClick={this.buttonClick}>ff</Button>

          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Typography variant="h6">
                <b>Settings</b>
              </Typography>
            </Grid>
            <Grid item container>
              <Paper elevation={5} className={classes.block}>
                <Grid xs={12} item container direction="row">
                  <Grid
                    item
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    xs={12}
                    sm={4}
                  >
                    <Grid item>
                      {" "}
                      <Typography variant="subtitle1" color="textSecondary">
                        Household Photo:
                      </Typography>
                    </Grid>
                    <Grid item>
                      <img
                        className={classes.img}
                        src={noImg}
                        alt="householdPhoto"
                      ></img>
                    </Grid>
                    <Grid item>
                      <input
                        accept="image/*"
                        className={classes.input}
                        id="upload-avatar-button-userSettings"
                        type="file"
                        //  onChange={(event) => this.handleAvatarUpload(event)}
                      ></input>
                      <label htmlFor="upload-avatar-button-userSettings">
                        <Button
                          color="primary"
                          variant="contained"
                          component="span"
                        >
                          Change Photo
                        </Button>
                      </label>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    xs={12}
                    sm={7}
                    direction="row"
                    justify="flex-end"
                    alignItems="flex-end"
                    spacing={0}
                  >
                    <Grid item xs={12}>
                      <TextFieldWithLabel
                        fullWidth
                        text="Household Name:"
                        defaultValue={
                          this.state.formHousehold.formFields.name.value
                        }
                        onChange={(event) => this.handleNameChange(event)}
                      ></TextFieldWithLabel>
                    </Grid>
                    <Grid item>
                      <Button
                        className={classes.buttonMarginTop}
                        disabled={
                          !this.state.formHousehold.enableButtonNameSave
                        }
                        variant="contained"
                        color="primary"
                        onClick={this.handleNameSaveButton}
                      >
                        Save
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <TextFieldWithLabel
                        fullWidth
                        text="Household Description:"
                        multiline
                        rows={3}
                        defaultValue={
                          this.state.formHousehold.formFields.description.value
                        }
                        onChange={(event) =>
                          this.handleDescriptionChange(event)
                        }
                      ></TextFieldWithLabel>
                    </Grid>
                    <Grid item>
                      <Button
                        className={classes.buttonMarginTop}
                        variant="contained"
                        color="primary"
                        disabled={
                          !this.state.formHousehold.enableButtonDescriptionSave
                        }
                        onClick={this.handleDescriptionSaveButton}
                      >
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} container>
              <Products
                products={
                  this.props.householdReducer.userHouseholds.get(
                    Number(this.props.match.params.householdId)
                  ).householdProducts
                }
                handleProductRemove={this.handleProductRemove}
                handleButtonOpenAddProductDialog={
                  this.handleButtonOpenAddProductDialog
                }
                handleCloseAddProductDialog={this.handleCloseAddProductDialog}
                addProductDialogOpen={
                  this.state.formAddProduct.addProductDialogOpen
                }
                handleAddProductInputChange={this.handleAddProductInputChange}
                enableSubmitButton={
                  this.state.formAddProduct.enableSubmitButton
                }
                handleProductAddButton={this.handleProductAddButton}
                formAddProduct={this.state.formAddProduct}
              ></Products>
            </Grid>
            <Grid item xs={12} container>
              <Users
                usersMap={this.props.usersReducer.users}
                householdUsersArray={
                  this.props.householdReducer.userHouseholds.get(
                    Number(this.props.match.params.householdId)
                  ).householdUsers
                }
                handleAddUserButton={this.handleAddUserButton}
                householdUsers={this.props.householdReducer}
                handleRemoveUserButton={this.handleRemoveUserButton}
                canSearch={this.state.search.canSearch}
                handleSearchChange={this.handleSearchChange}
              ></Users>
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
    usersReducer: state.users,
    householdReducer: state.household,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchHousehold: (householdId) =>
      dispatch(actions.fetchHousehold(householdId)),
    onNameUpdate: (form) => dispatch(actions.updateHouseholdName(form)),
    onDescriptionUpdate: (form) =>
      dispatch(actions.updateHouseholdDescription(form)),
    onAddHouseholdProduct: (form) =>
      dispatch(actions.addHouseholdProduct(form)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(HouseholdSettingsPage));
