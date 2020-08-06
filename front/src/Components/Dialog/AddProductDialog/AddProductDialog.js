import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const styles = {};

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
    console.log(this.props);
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
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(AddProductDialog);
