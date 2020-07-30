import React from "react";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/core/styles";

const style = {
  root: {
    width: "100%",
  },
  button: {
    marginRight: 1,
  },
  instructions: {
    marginTop: 1,
    marginBottom: 1,
  },
};

class GenericStepper extends React.Component {
  state = {
    activeStep: this.props.activeStep,
    steps: this.props.steps,
    skipped: new Set(),
    optionalSteps: this.props.optionalSteps,
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Stepper activeStep={this.state.activeStep}>
          {this.state.steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </div>
    );
  }
}

export default withStyles(style)(GenericStepper);
