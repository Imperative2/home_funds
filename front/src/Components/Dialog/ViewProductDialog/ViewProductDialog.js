import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import TextFieldWithLabel from "../../Input/TextFieldWithLabel/TextFieldWithLabel";

import * as actions from "../../../redux/actions/index";
import { connect } from "react-redux";

import noImg from "../../../static/NoImage.png";
import { TextField } from "@material-ui/core";

const styles = {
  cell: {
    "&:hover": {
      background: "red !important",
    },
  },
};

class ViewProductDialog extends React.Component {
  state = {
    dialogOpen: false,
  };

  handleCellClick = () => {
    console.log(this.props);
    this.setState({ ...this.state, dialogOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ ...this.state, dialogOpen: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <TableCell
          className={classes.cell}
          style={{
            color: "white",
            border: "3px solid white",
            borderRadius: "9px",
            background: this.props.user.color,
          }}
          align="center"
          onClick={this.handleCellClick}
        >
          {this.props.user.nickname}
        </TableCell>
        <Dialog open={this.state.dialogOpen} onClose={this.handleDialogClose}>
          <Container maxWidth="md">
            <Grid container direction="column">
              <Grid item>
                <Typography variant="h6">
                  Product:{" "}
                  <i>
                    <b>{this.props.householdProduct.name}</b>
                  </i>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6">
                  Description:{" "}
                  <i>
                    <b>{this.props.userHouseholdProduct.description}</b>
                  </i>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6">
                  Date:{" "}
                  <i>
                    <b>{this.props.userHouseholdProduct.date}</b>
                  </i>
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ViewProductDialog);
