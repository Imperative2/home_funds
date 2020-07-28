import React from "react";
import { withStyles } from "@material-ui/core/styles";

const style = {};

class UsersPage extends React.Component {
  render() {
    const { classes } = this.props;

    return <div>Users</div>;
  }
}

export default withStyles(style)(UsersPage);
