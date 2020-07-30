import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

import Typography from "@material-ui/core/Typography";

import HorizontalLinearStepper from "../../Stepper/AddHouseholdDialogStepper/AddHouseholdDialogStepper";
import GenericStepper from "../../Stepper/GenericStepper/GenericStepper";
import Container from "@material-ui/core/Container";

const style = {
  dialog: {
    marginTop: -500,
  },
};

class AddHouseholdDialog extends React.Component {
  state = {
    open: false,
    activeStep: 0,
  };

  handleClickOpen = () => {
    this.setState({ ...this.state, open: true });
  };

  handleClose = (value) => {
    this.setState({ ...this.state, open: false });
  };

  render() {
    const { classes } = this.props;

    const dialog = (
      <Container maxWidth="xl">
        <Dialog
          className={classes.dialog}
          fullWidth
          maxWidth="xl"
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
          <GenericStepper
            steps={[
              "Setup Household",
              "Add users",
              "Finish",
              "Its gonna take longer",
              "i can't stand so many steps",
            ]}
            activeStep={this.state.activeStep}
          ></GenericStepper>
        </Dialog>
      </Container>
    );

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
        {dialog}
      </div>
    );
  }
}

export default withStyles(style)(AddHouseholdDialog);
