import React from "react";
import { withStyles } from "@material-ui/core/styles";

const style = {
  root: {
    heigth: 900,
    width: 1400,
  },
};

class TestPage extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <iframe
          className={classes.root}
          src="https:///pubhtml?widget=true&amp;headers=false"
        ></iframe>
      </div>
    );
  }
}

export default withStyles(style)(TestPage);
