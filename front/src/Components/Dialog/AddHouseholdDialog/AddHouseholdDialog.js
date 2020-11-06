import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import AddIcon from "@material-ui/icons/Add";
import Chip from "@material-ui/core/Chip";
import Container from "@material-ui/core/Container";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListAvatar from "@material-ui/core/ListItemAvatar";
import ListText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ClearIcon from "@material-ui/icons/Clear";

// import { FixedSizeList } from "react-window";

import GenericStepper from "../../Stepper/GenericStepper/GenericStepper";
import GenericTable from "../../Tables/GenericTable/GenericTable";
import generateRandomNames from "../../../utils/GenerateRandomNames/GenerateRandomNames";

import noImg from "../../../static/NoImage.png";

import FormValidation from "../../../utils/Validation/FormValidator";
import FormValidator from "../../../utils/Validation/FormValidator";

import * as actions from "../../../redux/actions/index";
import { connect } from "react-redux";

import getServerURL from "../../../utils/GetEnvVar/getServerURL";

const style = {
  dialog: {
    marginTop: 0,
  },
  container: {
    margin: 50,
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

  NavigationButtons: {
    marginBottom: "2rem",
    marginLeft: "1.5rem",
    marginRight: "1.5rem",
    marginTop: "1rem",
  },
  img: {
    maxWidth: "10rem",
    maxHeight: "10rem",
    border: "3px solid Gray",
    borderRadius: 5,
  },
  searchBar: {
    background: "DodgerBlue",
    borderRadius: 5,
  },
  textField: {
    color: "white",
  },
  input: {
    display: "none",
  },
  iconPadding: {
    paddingLeft: "5px",
  },
};

class AddHouseholdDialog extends React.Component {
  state = {
    mainDialogOpen: this.props.open,
    stepper: {
      activeStep: 0,
      maxStep: 3,
      buttonPreviousEnabled: false,
      buttonNextEnabled: false,
      showFinishButton: false,
    },
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
      formValid: false,
      enableSubmitButton: false,
      photo: noImg,
      photoData: null,
      addedUsers: new Map(),
      products: [
        { name: "Bread", id: 0, data: generateRandomNames(3) },
        { name: "Milk", id: 1, data: generateRandomNames(3) },
        { name: "Water", id: 2, data: generateRandomNames(3) },
        { name: "Salt", id: 3, data: generateRandomNames(3) },
      ],
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

  componentWillMount() {
    this.props.onClearSearchUsers();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.state.mainDialogOpen) {
      this.setState({ ...this.state, mainDialogOpen: nextProps.open });
    }
  }

  handleOpenMainDialog = () => {
    this.setState({ ...this.state, mainDialogOpen: true });
  };

  handleCloseMainDialog = (value) => {
    this.props.resetClick();

    this.setState({
      ...this.state,
      mainDialogOpen: false,
      stepper: {
        activeStep: 0,
        maxStep: 3,
        buttonPreviousEnabled: false,
        buttonNextEnabled: false,
        showFinishButton: false,
      },
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
        formValid: false,
        enableSubmitButton: false,
        photo: noImg,
        photoData: null,
        addedUsers: new Map(),
        products: [
          { name: "Bread", id: 0, data: generateRandomNames(3) },
          { name: "Milk", id: 1, data: generateRandomNames(3) },
          { name: "Water", id: 2, data: generateRandomNames(3) },
          { name: "Salt", id: 3, data: generateRandomNames(3) },
        ],
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
    });
  };

  handleCloseAddProductDialog = () => {
    this.setState({
      ...this.state,
      formAddProduct: {
        formFields: {
          ...this.state.formAddProduct.formFields,
          productName: {
            ...this.state.formAddProduct.formFields.productName,
            value: "",
            touched: false,
            valid: false,
          },
        },
        formValid: false,
        enableSubmitButton: false,
        addProductDialogOpen: false,
      },
    });
  };

  handlePhotoUpload = (event) => {
    let image = event.target.files[0];
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    this.setState({
      ...this.state,
      formHousehold: {
        ...this.state.formHousehold,
        photo: URL.createObjectURL(image),
        photoData: formData,
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

  handleHouseholdTextFieldInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    const validatedFields = FormValidation.getValidatedFormFields(
      name,
      value,
      this.state.formHousehold
    );
    const validatedForm = FormValidation.getValidatedForm(validatedFields);

    this.setState({
      ...this.state,
      formHousehold: validatedForm,
      stepper: {
        ...this.state.stepper,
        buttonNextEnabled: validatedForm.formValid,
      },
    });
  };

  handleAddUserButton = (user) => {
    if (this.state.formHousehold.addedUsers.has(user.userId)) {
      return;
    }

    let addedUsersMap = this.state.formHousehold.addedUsers;
    addedUsersMap.set(user.userId, user);

    this.setState({
      ...this.state,
      formHousehold: {
        ...this.state.formHousehold,
        addedUsers: addedUsersMap,
      },
    });
  };

  handleRemoveUserButton = (user) => {
    if (this.state.formHousehold.addedUsers.has(user.userId) === false) {
      return;
    }

    let addedUsersMap = this.state.formHousehold.addedUsers;
    addedUsersMap.delete(user.userId);

    this.setState({
      ...this.state,
      formHousehold: {
        ...this.state.formHousehold,
        addedUsers: addedUsersMap,
      },
    });
  };

  handleProductAddButton = () => {
    const product = {
      name: this.state.formAddProduct.formFields.productName.value,
      id: this.state.formHousehold.products.length,
      data: generateRandomNames(3),
    };

    this.setState({
      ...this.state,
      formAddProduct: {
        ...this.state.formAddProduct,
        formFields: {
          ...this.state.formFields,
          productName: {
            ...this.state.formAddProduct.formFields.productName,
            value: "",
            touched: false,
            valid: false,
          },
        },
        formValid: false,
        enableSubmitButton: false,
        addProductDialogOpen: false,
      },
      formHousehold: {
        ...this.state.formHousehold,
        products: [...this.state.formHousehold.products, product],
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

  handleNextButton = () => {
    if (this.state.stepper.activeStep !== this.state.stepper.maxStep) {
      let nextStep = this.state.stepper.activeStep + 1;
      let showFinishButton = false;

      if (nextStep === this.state.stepper.maxStep) showFinishButton = true;

      this.setState({
        ...this.state,
        stepper: {
          ...this.state.stepper,
          activeStep: nextStep,
          showFinishButton: showFinishButton,
          buttonPreviousEnabled: true,
        },
      });
    }
  };

  handlePreviousButton = () => {
    if (this.activeStep !== 0) {
      let prevStep = this.state.stepper.activeStep - 1;
      let enablePreviousButton = true;
      if (prevStep === 0) enablePreviousButton = false;

      this.setState({
        ...this.state,
        stepper: {
          ...this.state.stepper,
          activeStep: prevStep,
          buttonNextEnabled: true,
          buttonPreviousEnabled: enablePreviousButton,
          showFinishButton: false,
        },
      });
    }
  };

  handleProductRemove = (chipId) => {
    let products = [];

    this.state.formHousehold.products.forEach((product) => {
      if (product.id !== chipId) products.push(product);
    });

    // if (products.length === 1) products.pop();
    // else products.splice(chipId, 1);

    this.setState({
      ...this.state,
      formHousehold: {
        ...this.state.formHousehold,
        products: products,
      },
    });
  };

  handleSearchChange = (event) => {
    if (event.target.value.length >= 3) {
      const regex = ".*" + event.target.value + ".*";
      this.props.onFetchUsersWithRegex(regex);
      this.setState({
        ...this.state,
        search: { ...this.search, value: event.target.value, canSearch: true },
      });
    } else {
      this.props.onClearSearchUsers();

      this.setState({
        ...this.state,
        search: {
          ...this.state.search,
          value: event.target.value,
          canSearch: false,
        },
      });
    }
  };

  handleFinishCreatingHouseholdButton = () => {
    console.log("submiting create household");

    let productsList = this.state.formHousehold.products.map((product) => {
      return { name: product.name };
    });

    let addedUsersMap = this.state.formHousehold.addedUsers;
    addedUsersMap.set(
      this.props.userReducer.user.userId,
      this.props.userReducer.user
    );

    let usersList = Array.from(addedUsersMap).map((mapEntry) => {
      const userId = mapEntry[1].userId;
      return { userId: userId };
    });

    let form = {
      household: {
        owner: this.props.userReducer.user,
        name: this.state.formHousehold.formFields.name.value,
        description: this.state.formHousehold.formFields.description.value,
      },
      householdProductsList: productsList,
      householdUsersList: usersList,
      photo:
        this.state.formHousehold.photo === noImg
          ? null
          : this.state.formHousehold.photoData,
    };

    console.log(form);

    this.props.onSubmitNewHousehold(form);

    this.handleCloseMainDialog();
  };

  render() {
    const { classes } = this.props;
    const textSize = { style: { fontSize: "1.1rem" } };
    const labelSize = { style: { fontSize: "1.2rem" } };
    const textColor = { style: { color: "white" } };

    let page_0 = (
      <Container maxWidth="md">
        <Grid
          container
          spacing={2}
          justify="center"
          alignItems="center"
          direction="column"
        >
          <Grid
            xs={12}
            item
            container
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Household name*:</Typography>
              <TextField
                variant="outlined"
                name="name"
                InputLabelProps={labelSize}
                inputProps={textSize}
                fullWidth
                required
                value={this.state.formHousehold.formFields.name.value}
                onChange={(event) => this.handleHouseholdTextFieldInput(event)}
                error={
                  this.state.formHousehold.formFields.name.touched === true &&
                  this.state.formHousehold.formFields.name.valid === false
                    ? true
                    : false
                }
                helperText={
                  this.state.formHousehold.formFields.name.touched === true &&
                  this.state.formHousehold.formFields.name.valid === false
                    ? this.state.formHousehold.formFields.name.errorMessage
                    : null
                }
              ></TextField>
            </Grid>

            <Grid
              item
              container
              xs={12}
              sm={6}
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <img
                  className={classes.img}
                  src={this.state.formHousehold.photo}
                  alt="household"
                ></img>
              </Grid>
              <Grid item>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="upload-avatar-button"
                  type="file"
                  onChange={(event) => this.handlePhotoUpload(event)}
                ></input>
                <label htmlFor="upload-avatar-button">
                  <Button
                    color="primary"
                    variant="contained"
                    startIcon={<AddAPhotoIcon />}
                    component="span"
                  >
                    Upload Photo
                  </Button>
                </label>
              </Grid>
            </Grid>
          </Grid>
          <Grid container item xs={12} direction="column">
            <Grid item>
              <Typography variant="h6">Household description:</Typography>
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                name="description"
                fullWidth
                multiline
                InputLabelProps={labelSize}
                inputProps={textSize}
                rows={5}
                onChange={(event) => this.handleHouseholdTextFieldInput(event)}
              ></TextField>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
    let page_1 = (
      <Container maxWidth="md">
        <Grid container spacing={1}>
          <Grid item container xs={12} className={classes.border} spacing={1}>
            {this.state.formHousehold.products.map((product) => {
              return (
                <Grid item key={product.id}>
                  <Chip
                    label={product.name}
                    onDelete={() => this.handleProductRemove(product.id)}
                  ></Chip>
                </Grid>
              );
            })}
            <Grid item>
              <Chip
                color="primary"
                label="Add"
                icon={<AddIcon />}
                onClick={this.handleButtonOpenAddProductDialog}
              ></Chip>
              <Dialog
                onClose={this.handleCloseAddProductDialog}
                aria-labelledby="simple-dialog-title"
                open={this.state.formAddProduct.addProductDialogOpen}
                scroll="paper"
              >
                <Grid container spacing={1} className={classes.chipDialog}>
                  <Grid item xs={12}>
                    <Typography variant="h6">Name:</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="productName"
                      inputProps={textSize}
                      value={
                        this.state.formAddProduct.formFields.productName.value
                      }
                      error={
                        this.state.formAddProduct.formFields.productName
                          .touched === true &&
                        this.state.formAddProduct.formFields.productName
                          .valid === false
                          ? true
                          : false
                      }
                      helperText={
                        this.state.formAddProduct.formFields.productName
                          .touched === true &&
                        this.state.formAddProduct.formFields.productName
                          .valid === false
                          ? this.state.formAddProduct.formFields.productName
                              .errorMessage
                          : null
                      }
                      onChange={(event) =>
                        this.handleAddProductInputChange(event)
                      }
                    ></TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      disabled={!this.state.formAddProduct.enableSubmitButton}
                      onClick={this.handleProductAddButton}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Dialog>
            </Grid>
          </Grid>
          <Grid
            item
            container
            justify="center"
            alignItems="center"
            direction="column"
          >
            <Grid item>
              <Typography variant="h6">Preview</Typography>
            </Grid>
            <Grid item>
              <GenericTable
                data={this.state.formHousehold.products}
              ></GenericTable>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );

    let addUsersArray = Array.from(this.props.usersReducer.users);

    if (this.state.search.canSearch === true) {
      addUsersArray = Array.from(this.props.usersReducer.searchUsers);
    }

    let users = addUsersArray.map((mapEntry) => {
      const user = mapEntry[1];

      let iconButton = (
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => this.handleAddUserButton(user)}
        >
          <PersonAddIcon />
        </IconButton>
      );

      if (this.state.formHousehold.addedUsers.has(user.userId)) {
        iconButton = (
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => this.handleRemoveUserButton(user)}
          >
            <ClearIcon />
          </IconButton>
        );
      }

      return (
        <React.Fragment key={user.userId}>
          <ListItem>
            <ListAvatar>
              <Avatar
                src={
                  user.avatar != null && user.avatar.path != null
                    ? getServerURL() + user.avatar.path
                    : null
                }
              ></Avatar>
            </ListAvatar>
            <ListText
              primary={user.name + " " + user.surname}
              secondary={"@" + user.nickname}
            />
            <ListItemSecondaryAction>{iconButton}</ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </React.Fragment>
      );
    });

    let page_2 = (
      <Container maxWidth="sm">
        <Grid container spacing={2} direction="column">
          <Grid className={classes.searchBar} item xs={12}>
            <TextField
              InputProps={textColor}
              fullWidth
              variant="outlined"
              placeholder="Search"
              onChange={(event) => this.handleSearchChange(event)}
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={12}>
            <List className={classes.usersList}>{users}</List>
          </Grid>
        </Grid>
      </Container>
    );
    let page_3 = (
      <Container maxWidth="md">
        <Grid container spacing={2} direction="column">
          <Grid item xs={12}>
            <Divider></Divider>
          </Grid>
          <Grid item container direction="row">
            <Grid xs={12} sm={6} container item direction="column" spacing={3}>
              <Grid item>
                <Typography variant="h6">
                  Household name:{" "}
                  <i>
                    <b>{this.state.formHousehold.formFields.name.value}</b>
                  </i>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6">
                  Household description:{" "}
                  <i>{this.state.formHousehold.formFields.description.value}</i>
                </Typography>
              </Grid>
            </Grid>

            <Grid container item xs={12} sm={6} justify="center">
              <img
                className={classes.img}
                src={this.state.formHousehold.photo}
                alt="household"
              ></img>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider></Divider>
          </Grid>
          <Grid item container justify="center" alignItems="center">
            <Grid item>
              <Typography variant="h6">Products:</Typography>
              <GenericTable
                data={this.state.formHousehold.products}
              ></GenericTable>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider></Divider>
          </Grid>
          <Grid item container>
            <Grid item xs={12}>
              <Typography variant="h6">Users:</Typography>
            </Grid>
            <Grid item container direction="row">
              {Array.from(this.state.formHousehold.addedUsers).map(
                (mapEntry) => {
                  const user = mapEntry[1];
                  return (
                    <Grid item key={user.userId}>
                      <ListItem>
                        <ListAvatar>
                          <Avatar
                            src={
                              user.avatar != null && user.avatar.path != null
                                ? getServerURL() + user.avatar.path
                                : null
                            }
                          ></Avatar>
                        </ListAvatar>
                        <ListText
                          primary={user.name + " " + user.surname}
                          secondary={"@" + user.nickname}
                        />
                        {/* <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        // onClick={() => this.handleAddUserButton(user)}
                      >
                        <PersonAddIcon />
                      </IconButton></ListItemSecondaryAction> */}

                        <IconButton
                          className={classes.iconPadding}
                          edge="end"
                          aria-label="delete"
                          onClick={() => this.handleRemoveUserButton(user)}
                        >
                          <ClearIcon />
                        </IconButton>
                      </ListItem>
                    </Grid>
                  );
                }
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );

    let currentPage;
    switch (this.state.stepper.activeStep) {
      case 0: {
        currentPage = page_0;
        break;
      }
      case 1: {
        currentPage = page_1;
        break;
      }
      case 2: {
        currentPage = page_2;
        break;
      }
      case 3: {
        currentPage = page_3;
        break;
      }
      default: {
        currentPage = page_0;
      }
    }

    return (
      <div>
        <Dialog
          className={classes.dialog}
          fullWidth
          maxWidth="md"
          onClose={this.handleCloseMainDialog}
          aria-labelledby="simple-dialog-title"
          open={this.state.mainDialogOpen}
        >
          <DialogTitle id="simple-dialog-title">
            Create new Household
          </DialogTitle>
          <GenericStepper
            orientation={window.innerWidth < 660 ? "vertical" : "horizontal"}
            alternativeLabel={false}
            steps={[
              "Setup Household",
              "Create schedule",
              "Add members",
              "Finish",
            ]}
            activeStep={this.state.stepper.activeStep}
          ></GenericStepper>
          {currentPage}
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Button
                className={classes.NavigationButtons}
                variant="contained"
                color="primary"
                onClick={this.handlePreviousButton}
                disabled={!this.state.stepper.buttonPreviousEnabled}
              >
                {"<<"}Previous
              </Button>
            </Grid>
            <Grid item>
              {this.state.stepper.showFinishButton ? (
                <Button
                  className={classes.NavigationButtons}
                  variant="contained"
                  color="primary"
                  onClick={this.handleFinishCreatingHouseholdButton}
                  disabled={!this.state.stepper.buttonNextEnabled}
                >
                  Finish
                </Button>
              ) : (
                <Button
                  className={classes.NavigationButtons}
                  variant="contained"
                  color="primary"
                  onClick={this.handleNextButton}
                  disabled={!this.state.stepper.buttonNextEnabled}
                >
                  Next{">>"}
                </Button>
              )}
            </Grid>
          </Grid>
        </Dialog>
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
    onFetchUsersWithRegex: (regex) =>
      dispatch(actions.fetchUsersWithRegex(regex)),
    onClearSearchUsers: () => dispatch(actions.clearSearchUsers()),
    onSubmitNewHousehold: (form) => dispatch(actions.createNewHousehold(form)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(AddHouseholdDialog));
