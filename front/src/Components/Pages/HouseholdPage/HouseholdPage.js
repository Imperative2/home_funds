import React from "react";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import * as actions from "../../../redux/actions/index";
import { connect } from "react-redux";

import AddProductDialog from "../../Dialog/AddProductDialog/AddProductDialog";
import ProduceTabel from "../../Tables/ProduceTable/ProduceTabel";

const style = {};

class HouseholdPage extends React.Component {
  state = {
    householdId: this.props.match.params.householdId,
    household: null,
  };

  componentWillMount() {
    console.log(this.props.match.params.householdId);
    this.props.onFetchHousehold(this.props.match.params.householdId);
    console.log(this.props.householdReducer);
    let map = this.props.householdReducer.userHouseholds;

    if (map.has(Number(this.props.match.params.householdId)) === true) {
      this.setState({
        ...this.state,
        household: map.get(Number(this.props.match.params.householdId)),
      });
    } else {
      this.setState({ ...this.state, household: null });
    }
  }

  handleButtonClick = () => {
    console.log(this.props.householdReducer);
    console.log(this.state);
  };

  render() {
    console.log(this.props);
    console.log(this.state);

    return (
      <div>
        <button onClick={this.handleButtonClick}> click</button>
        {this.state.household == null
          ? "household not loaded"
          : "householdLoaded"}
        <AddProductDialog></AddProductDialog>

        <Grid container justify="center">
          <Grid item xs={12} md={11}>
            <ProduceTabel></ProduceTabel>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userReducer: state.user,
    usersReducer: state.users,
    householdReducer: state.household,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchHousehold: (householdId) =>
      dispatch(actions.fetchHousehold(householdId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(HouseholdPage));
