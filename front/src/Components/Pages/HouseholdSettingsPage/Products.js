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

  maxW: {
    maxWidth: 960,
  },
};

class Products extends React.Component {
  render() {
    const { classes } = this.props;
    const textSize = { style: { fontSize: "1.1rem" } };
    const labelSize = { style: { fontSize: "1.2rem" } };
    const textColor = { style: { color: "white" } };


    let products = this.props.products.map((product) => {

      return {
        name: product.name,
        id: product.productId,
        data: this.props.productMockupMap.has(product.productId) === true? this.props.productMockupMap.get(product.productId): generateRandomNames(3),
      };
    });

    return (
      <Grid item xs={12} >
        <Paper elevation={5} className={classes.block}>
          <Grid item container spacing={1} className={classes.maxW}>
            <Grid item container xs={12} className={classes.border} spacing={1}>
              {products.map((product) => {
                return (
                  <Grid item key={product.id}>
                    <Chip
                      label={product.name}
                      onDelete={() =>
                        this.props.handleProductRemove(product.id)
                      }
                    ></Chip>
                  </Grid>
                );
              })}
              <Grid item>
                <Chip
                  color="primary"
                  label="Add"
                  icon={<AddIcon />}
                  onClick={() => this.props.handleButtonOpenAddProductDialog()}
                ></Chip>
                <Dialog
                  onClose={() => this.props.handleCloseAddProductDialog()}
                  aria-labelledby="simple-dialog-title"
                  open={this.props.addProductDialogOpen}
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
                          this.props.formAddProduct.formFields.productName.value
                        }
                        error={
                          this.props.formAddProduct.formFields.productName
                            .touched === true &&
                          this.props.formAddProduct.formFields.productName
                            .valid === false
                            ? true
                            : false
                        }
                        helperText={
                          this.props.formAddProduct.formFields.productName
                            .touched === true &&
                          this.props.formAddProduct.formFields.productName
                            .valid === false
                            ? this.props.formAddProduct.formFields.productName
                                .errorMessage
                            : null
                        }
                        onChange={(event) =>
                          this.props.handleAddProductInputChange(event)
                        }
                      ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={!this.props.enableSubmitButton}
                        onClick={() => this.props.handleProductAddButton()}
                      >
                        Add
                      </Button>
                    </Grid>
                  </Grid>
                </Dialog>
              </Grid>
            </Grid>
            <Grid
              xs={12}
              item
              container
              justify="center"
              alignItems="center"
              direction="row"
            >
              <Grid item xs={1}>
                <Typography variant="h6">Preview</Typography>
              </Grid>
              <Grid item xs={12}>
                <GenericTable data={products}></GenericTable>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(style)(Products);
