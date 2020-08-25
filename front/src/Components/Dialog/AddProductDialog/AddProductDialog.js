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

import generateRandomNames from "../../../utils/GenerateRandomNames/GenerateRandomNames";
import TextFieldWithLabel from "../../Input/TextFieldWithLabel/TextFieldWithLabel";

const styles = {};

class AddProductDialog extends React.Component {
  state = {
    mainDialogOpen: false,
    household: {
      products: [
        { name: "chleb", id: 0, data: generateRandomNames(3) },
        { name: "mleko", id: 1, data: generateRandomNames(3) },
        { name: "woda", id: 2, data: generateRandomNames(3) },
        { name: "sól", id: 3, data: generateRandomNames(3) },
      ],
    },
  };

  handleCloseMainDialog = () => {
    this.setState({ ...this.state, mainDialogOpen: false });
  };

  handleFabClick = () => {
    this.setState({ ...this.state, mainDialogOpen: true });
  };

  render() {
    return (
      <div>
        <Fab color="primary" onClick={this.handleFabClick}>
          <AddIcon></AddIcon>
        </Fab>
        <Dialog
          open={this.state.mainDialogOpen}
          onClose={this.handleCloseMainDialog}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>We are adding product bois!</DialogTitle>
          <Grid container justify="center" spacing={2} direction="column">
            <Grid item xs={12}>
              <Typography variant="h6">Select product:</Typography>
            </Grid>
            <Grid item xs={9}>
              <Select variant="filled" fullWidth>
                {this.state.household.products.map((product) => {
                  return (
                    <MenuItem key={product.id} value={product.id}>
                      {product.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <TextFieldWithLabel
              text="Description:"
              multiline
              rows={4}
              fullWidth
            ></TextFieldWithLabel>
          </Grid>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(AddProductDialog);
