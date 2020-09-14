import React from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  withStyles,
} from "@material-ui/core";

const style = {
  block: {
    margin: 20,
  },
};

class TextFieldWithLabel extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid
        className={this.props.block != null ? classes.block : null}
        item
        container
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h6">{this.props.text}</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name={this.props.name}
            variant="outlined"
            multiline={this.props.multiline}
            rows={this.props.rows}
            fullWidth={this.props.fullWidth}
            onChange={this.props.onChange}
            defaultValue={this.props.defaultValue}
          ></TextField>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(style)(TextFieldWithLabel);
