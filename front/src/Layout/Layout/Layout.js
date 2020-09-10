import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import TopBar from "../TopBar/TopBar";
import Footer from "../Footer/Footer";

const style = {
  dimensions: {
    minHeight: "100vh",
  },
};

class Layout extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <ReactNotification></ReactNotification>
        <TopBar />
        <div className={classes.dimensions}> {this.props.children}</div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(style)(Layout);
