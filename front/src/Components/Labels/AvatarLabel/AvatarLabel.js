import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

import noImg from "../../../static/NoImage.png";
import getServerURL from "../../../utils/GetEnvVar/getServerURL";

const style = {
  avatar: {
    height: "2rem",
    width: "2rem",
  },
};

class AvatarLabel extends React.Component {
  render() {
    let photoPath = null;
    if (this.props.photo != null && this.props.photo.path != null) {
      photoPath = getServerURL() + this.props.photo.path;
    } else {
      photoPath = noImg;
    }

    return (
      <React.Fragment>
        <Tooltip
          placement="right-start"
          title={
            this.props.user.name +
            " " +
            this.props.user.surname +
            " " +
            this.props.user.nickname
          }
        >
          <NavLink to={"/user/" + this.props.user.userId}>
            <Avatar alt="user avatar" src={photoPath} />
          </NavLink>
        </Tooltip>
      </React.Fragment>
    );
  }
}

export default withStyles(style)(AvatarLabel);
