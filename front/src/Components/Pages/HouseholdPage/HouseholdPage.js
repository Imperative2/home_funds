import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
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
    console.log("products");
    console.log(
      this.props.householdReducer.userHouseholds.get(
        Number(this.props.match.params.householdId)
      ).householdProducts
    );
    const { classes } = this.props;

    if (this.state.household == null) {
      this.props.history.push("/");
      return null;
    } else
      return (
        <div>
          <AddProductDialog household={this.state.household}></AddProductDialog>

          <Grid container justify="center" spacing={2}>
            <Grid item xs={11} container alignItems="center" justify="center">
              <Typography variant="body1">
                {this.state.household.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <ProduceTabel
                // householdProducts={this.state.household.householdProducts}
                householdProducts={
                  this.props.householdReducer.userHouseholds.get(
                    Number(this.props.match.params.householdId)
                  ).householdProducts
                }
                householdUsers={this.state.household.householdUsers}
              ></ProduceTabel>
            </Grid>
            <button onClick={this.handleButtonClick}>click</button>
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
