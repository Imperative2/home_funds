import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

import TextFieldWithLabel from "../../Input/TextFieldWithLabel/TextFieldWithLabel";

import * as actions from "../../../redux/actions/index";
import { connect } from "react-redux";
import FormValidator from "../../../utils/Validation/FormValidator";

import noImg from "../../../static/NoImage.png";

const styles = {
  addProductButton: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
  },
  img: {
    maxWidth: "10rem",
    maxHeight: "10rem",
    border: "3px solid Gray",
    borderRadius: 5,
  },
  input: {
    display: "none",
  },
};

class AddProductDialog extends React.Component {
  state = {
    mainDialogOpen: false,
    formAddProduct: {
      formFields: {
        product: {
          value: "",
          touched: false,
          valid: false,
          regex: null,
          required: true,
          errorMessage: null,
        },
        description: {
          value: "",
          touched: false,
          valid: true,
          minLength: 0,
          maxLength: 50,
          regex: null,
          required: false,
          errorMessage: null,
        },
      },
      photo: null,
      formValid: false,
      enableSubmitButton: false,
    },
  };

  handleCloseMainDialog = () => {
    this.setState({
      ...this.state,
      mainDialogOpen: false,
      formAddProduct: {
        formFields: {
          product: {
            value: "",
            touched: false,
            valid: false,
            regex: null,
            required: true,
            errorMessage: null,
          },
          description: {
            value: "",
            touched: false,
            valid: true,
            minLength: 0,
            maxLength: 50,
            regex: null,
            required: false,
            errorMessage: null,
          },
        },
        photo: null,
        formValid: false,
        enableSubmitButton: false,
      },
    });
  };

  handleFabClick = () => {
    this.setState({ ...this.state, mainDialogOpen: true });
  };

  handlePhotoUpload = (event) => {
    let image = event.target.files[0];
    this.setState({
      ...this.state,
      formAddProduct: {
        ...this.state.formAddProduct,
        photo: URL.createObjectURL(image),
      },
    });
  };

  handleFormChange = (event) => {
    console.log(event);
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

  handleFormSubmit = () => {
    console.log("adding userHousehold product");

    let form = {
      userId: this.props.userReducer.user.userId,
      productId: this.state.formAddProduct.formFields.product.value.productId,
      description: this.state.formAddProduct.formFields.description.value,
    };

    console.log(form);

    this.props.onAddUserHouseholdProduct(form);

    this.handleCloseMainDialog();
  };

  render() {
    const { classes } = this.props;
    console.log(this.state);
    return (
      <div>
        <Fab
          className={classes.addProductButton}
          color="primary"
          onClick={this.handleFabClick}
        >
          <AddIcon></AddIcon>
        </Fab>
        <Dialog
          open={this.state.mainDialogOpen}
          onClose={this.handleCloseMainDialog}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>Add product</DialogTitle>
          <Container maxWidth="md">
            <Grid container justify="center" direction="column">
              <Grid
                item
                xs={12}
                container
                alignItems="center"
                justify="center"
                direction="row"
              >
                <Grid item xs={6} container direction="column">
                  <Grid item xs={12}>
                    <Typography variant="h6">Select product:</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Select
                      name="product"
                      variant="filled"
                      fullWidth
                      value={this.state.formAddProduct.formFields.product.value}
                      onChange={(event) => this.handleFormChange(event)}
                    >
                      {this.props.household.householdProducts.map(
                        (householdProduct) => {
                          return (
                            <MenuItem
                              key={householdProduct.productId}
                              value={householdProduct}
                            >
                              {householdProduct.name}
                            </MenuItem>
                          );
                        }
                      )}
                    </Select>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  xs={6}
                  sm={6}
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item>
                    <img
                      className={classes.img}
                      src={
                        this.state.formAddProduct.photo != null
                          ? this.state.formAddProduct.photo
                          : noImg
                      }
                      alt="product"
                    ></img>
                  </Grid>
                  <Grid item>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="upload-product-image"
                      type="file"
                      onChange={(event) => this.handlePhotoUpload(event)}
                    ></input>
                    <label htmlFor="upload-product-image">
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

              <Grid item xs={11}>
                <TextFieldWithLabel
                  name="description"
                  text="Description:"
                  multiline
                  rows={4}
                  fullWidth
                  onChange={(event) => this.handleFormChange(event)}
                ></TextFieldWithLabel>
              </Grid>
              <Grid item container justify="center">
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginBottom: "10px" }}
                  disabled={!this.state.formAddProduct.enableSubmitButton}
                  onClick={this.handleFormSubmit}
                >
                  Add product
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Dialog>
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
    onAddUserHouseholdProduct: (form) =>
      dispatch(actions.addUserHouseholdProduct(form)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddProductDialog));
