import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import AddIcon from "@material-ui/icons/Add";
import Chip from "@material-ui/core/Chip";
import Container from "@material-ui/core/Container";

import GenericStepper from "../../Stepper/GenericStepper/GenericStepper";
import GenericTable from "../../Tables/GenericTable/GenericTable";
import generateRandomNames from "../../../utils/GenerateRandomNames/GenerateRandomNames";

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
};

class AddHouseholdDialog extends React.Component {
  state = {
    open: false,
    activeStep: 0,
    products: [
      { name: "chleb", id: 0, data: generateRandomNames(3) },
      { name: "mleko", id: 1, data: generateRandomNames(3) },
      { name: "woda", id: 2, data: generateRandomNames(3) },
      { name: "sól", id: 3, data: generateRandomNames(3) },
    ],

    addChipOpen: false,
    addChipValue: "",
  };

  handleClickOpen = () => {
    this.setState({ ...this.state, open: true });
  };

  handleClose = (value) => {
    this.setState({ ...this.state, open: false });
  };

  handleCloseChipDialog = () => {
    this.setState({ ...this.state, addChipOpen: false, addChipValue: "" });
  };

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({ ...this.state, addChipValue: value });
  };

  handleAdd = () => {
    let product = {
      name: this.state.addChipValue,
      id: this.state.products.length,
      data: generateRandomNames(3),
    };

    this.setState({
      ...this.state,
      addChipValue: "",
      products: [...this.state.products, product],
      addChipOpen: false,
    });
  };

  handleAddChipButton = () => {
    this.setState({ ...this.state, addChipOpen: true });
  };

  handleNextButton = () => {
    this.setState({ ...this.state, activeStep: this.state.activeStep + 1 });
  };

  handlePreviousButton = () => {
    this.setState({ ...this.state, activeStep: this.state.activeStep - 1 });
  };

  handleProductRemove = (chipId) => {
    let products = this.state.products;

    if (this.state.products.length === 1) products.pop();
    else products.splice(chipId, 1);

    this.setState({
      ...this.state,
      products: products,
    });
  };

  render() {
    const { classes } = this.props;
    const textSize = { style: { fontSize: "1.1rem" } };
    const labelSize = { style: { fontSize: "1.2rem" } };

    let page_0 = (
      <Container maxWidth="md">
        <Paper elevation={5}>
          <Grid
            className={classes.container}
            container
            spacing={2}
            justify="center"
            alignItems="center"
            direction="column"
          >
            <Grid xs={12} item container direction="row">
              <Grid item xs={6}>
                <Typography variant="h6"> Household name:</Typography>
                <TextField
                  variant="outlined"
                  InputLabelProps={labelSize}
                  inputProps={textSize}
                ></TextField>
              </Grid>

              <Grid item xs={6}>
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<AddAPhotoIcon />}
                >
                  Upload Photo
                </Button>
              </Grid>
            </Grid>
            <Grid container item xs={10} direction="column">
              <Grid item>
                <Typography variant="h6">Household description:</Typography>
              </Grid>
              <Grid item>
                <TextField
                  variant="outlined"
                  fullWidth
                  multiline
                  InputLabelProps={labelSize}
                  inputProps={textSize}
                  rows={5}
                ></TextField>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
    let page_1 = (
      <Container maxWidth="md">
        <Grid container spacing={1}>
          <Grid item container xs={12} className={classes.border} spacing={1}>
            {this.state.products.map((product) => {
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
                onClick={this.handleAddChipButton}
              ></Chip>
              <Dialog
                onClose={this.handleCloseChipDialog}
                aria-labelledby="simple-dialog-title"
                open={this.state.addChipOpen}
                scroll="paper"
              >
                <Grid container spacing={1} className={classes.chipDialog}>
                  <Grid item xs={12}>
                    <Typography variant="h6">Name:</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      inputProps={textSize}
                      onChange={(event) => this.handleChange(event)}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={this.handleAdd}
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
              <GenericTable data={this.state.products}></GenericTable>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
    let page_2;
    let page_3;

    let currentPage;
    switch (this.state.activeStep) {
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
        <Typography variant="subtitle1">
          Selected: {this.state.selectedValue}
        </Typography>
        <br />
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Open simple dialog
        </Button>

        <Dialog
          className={classes.dialog}
          fullWidth
          maxWidth="md"
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="simple-dialog-title">
            Create new Household
          </DialogTitle>
          <GenericStepper
            orientation="horizontal"
            alternativeLabel={false}
            steps={[
              "Setup Household",
              "Create schedule",
              "Add members",
              "Finish",
            ]}
            activeStep={this.state.activeStep}
          ></GenericStepper>
          {currentPage}
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handlePreviousButton}
              >
                {"<<"}Previous
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleNextButton}
              >
                Next{">>"}
              </Button>
            </Grid>
          </Grid>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(style)(AddHouseholdDialog);
