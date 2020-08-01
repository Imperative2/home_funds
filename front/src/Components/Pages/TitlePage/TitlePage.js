import React, { Component } from "react";
import ProduceTabel from "../../Tables/ProduceTable/ProduceTabel";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import userAvatar2 from "../../../static/user_avatar2.jpg";

import ScrollAnimation from "react-animate-on-scroll";

import "animate.css/animate.min.css";
import home1 from "../../../static/home1.jpg";
import home2 from "../../../static/home2.jpg";
import home3 from "../../../static/home3.jpg";
import home4 from "../../../static/home4.jpg";
import home5 from "../../../static/home5.jpg";

const style = {
  img: { width: "100vw", height: "100vh", objectFit: "cover" },
  root: {
    marginTop: 0,
  },
};

class TitlePage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <ScrollAnimation
          animateIn="animate__fadeInRight"
          animateOut="animate__fadeOut"
        >
          <img className={classes.img} src={home4} alt=""></img>
        </ScrollAnimation>
        <ScrollAnimation
          animateIn="animate__fadeIn"
          animateOut="animate__fadeOut"
        >
          <img className={classes.img} src={home3} alt=""></img>
        </ScrollAnimation>
        <ScrollAnimation
          animateIn="animate__fadeInRight"
          animateOut="animate__fadeOut"
        >
          <img className={classes.img} src={home5} alt=""></img>
        </ScrollAnimation>
        <ScrollAnimation
          animateIn="animate__fadeInRight"
          animateOut="animate__fadeOut"
        >
          <img className={classes.img} src={home1} alt=""></img>
        </ScrollAnimation>

        <ScrollAnimation
          animateIn="animate__fadeInRight"
          animateOut="animate__fadeOut"
        >
          <img className={classes.img} src={home2} alt=""></img>
        </ScrollAnimation>

        <Grid container justify="center">
          <Grid item xs={12} md={11}>
            <ProduceTabel></ProduceTabel>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(style)(TitlePage);
