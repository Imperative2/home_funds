import React from "react";
import { withStyles } from "@material-ui/core/styles";

const style = {
  squareRed: {
    width: "3rem",
    height: "100%",
    backgroundColor: "rgb(244, 67, 54)",
    marginLeft: "1.2rem",
    borderRadius: 5,
    zIndex: 0,
  },
  squareOrange: {
    width: "3rem",
    height: "100%",
    backgroundColor: "Orange",
    marginLeft: "1.2rem",
    borderRadius: 5,
    zIndex: 0,
  },
  squareBlue: {
    width: "3rem",
    height: "100%",
    backgroundColor: "RoyalBlue",
    marginLeft: "1.2rem",
    borderRadius: 5,
    zIndex: 0,
  },
  squareGreen: {
    width: "3rem",
    height: "100%",
    backgroundColor: "Green",
    marginLeft: "1.2rem",
    borderRadius: 5,
    zIndex: 0,
  },
  triangle: {
    width: "0",
    heigth: "0",
    paddingTop: "190%",
    borderLeft: "1.5rem solid transparent",
    borderRight: "1.5rem solid transparent",
    borderBottom: "50px solid white",
    zIndex: 50,
  },
  lineOrange: {
    borderLeft: "6px solid Orange",
    height: "6rem",
    zindex: 100,
    marginLeft: "1.4rem",
  },
  lineWhite: {
    borderLeft: "6px solid White",
    height: "6rem",
    zindex: 100,
    marginLeft: "1.4rem",
  },
};

class Ribbon extends React.Component {
  render() {
    const { classes } = this.props;

    let ribbon = (
      <div className={classes.squareRed}>
        <div className={classes.lineWhite}></div>
        <div className={classes.triangle} />
      </div>
    );
    if (this.props.type === "warning") {
      ribbon = (
        <div className={classes.squareOrange}>
          <div className={classes.lineWhite}></div>
          <div className={classes.triangle} />
        </div>
      );
    } else if (this.props.type === "information") {
      ribbon = (
        <div className={classes.squareBlue}>
          <div className={classes.lineWhite}></div>
          <div className={classes.triangle} />
        </div>
      );
    } else if (this.props.type === "success") {
      ribbon = (
        <div className={classes.squareGreen}>
          <div className={classes.lineWhite}></div>
          <div className={classes.triangle} />
        </div>
      );
    }

    return <React.Fragment>{ribbon}</React.Fragment>;
  }
}
export default withStyles(style)(Ribbon);
