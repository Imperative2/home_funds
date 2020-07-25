import React, { Component } from "react";
import TopBar from "../TopBar/TopBar";

class Layout extends Component {
  render() {
    return (
      <div>
        <TopBar></TopBar>
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
