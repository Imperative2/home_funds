import { withFormsy } from "formsy-react";
import React from "react";
import TextField from "@material-ui/core/TextField";

class TextFieldFormsy extends React.Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(event) {
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    // Important: Don't skip this step. This pattern is required
    // for Formsy to work.
    this.props.setValue(event.currentTarget.value);
  }

  render() {
    // An error message is passed only if the component is invalid
    const errorMessage = this.props.errorMessage;

    return (
      <React.Fragment>
        <TextField
          type={this.props.type}
          id={this.props.id}
          label={this.props.label}
          variant={this.props.variant}
          fullWidth={this.props.fullWidth}
          value={this.props.value || ""}
          onChange={this.changeValue}
          error={errorMessage}
          helperText={errorMessage}
        />
      </React.Fragment>
    );
  }
}

export default withFormsy(TextFieldFormsy);
