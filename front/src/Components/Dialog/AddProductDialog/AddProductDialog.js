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

import TextFieldWithLabel from "../../Input/TextFieldWithLabel/TextFieldWithLabel";

const styles = {
  addProductButton: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
  },
};

class AddProductDialog extends React.Component {
  state = {
    mainDialogOpen: false,
  };

  handleCloseMainDialog = () => {
    this.setState({ ...this.state, mainDialogOpen: false });
  };

  handleFabClick = () => {
    this.setState({ ...this.state, mainDialogOpen: true });
  };

  render() {
    const { classes } = this.props;
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
            <Grid container justify="center" spacing={2} direction="column">
              <Grid
                item
                xs={11}
                container
                alignItems="center"
                justify="center"
                direction="row"
              >
                <Grid item xs={3}>
                  <Typography variant="h6">Select product:</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Select variant="filled" fullWidth>
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
              <Grid item xs={11}>
                <TextFieldWithLabel
                  text="Description:"
                  multiline
                  rows={4}
                  fullWidth
                ></TextFieldWithLabel>
              </Grid>
              <Grid item container justify="center">
                <Button variant="contained" color="primary">
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

export default withStyles(styles)(AddProductDialog);
