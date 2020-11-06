import React from "react";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

import noImg from "../../../static/NoImage.png";
import getServerURL from "../../../utils/GetEnvVar/getServerURL";

import { connect } from "react-redux";
import * as actions from "../../../redux/actions/index";

const style = {
  img: {
    borderRadius: "10px",
    width: 220,
    height: 220,
    border: "3px groove DeepSkyBlue",
  },
  block1: {
    padding: "20px 20px 20px 0px",
  },
  block2: {
    padding: "0px 20px 20px 20px",
  },
  dialog: {
    margin: 10,
    width: 270,
  },
  buttonMargin: {
    margin: 20,
  },
  textFieldFont: {
    fontSize: "50px",
  },
  buttonOrange: {
    backgroundColor: "Orange",
    margin: 20,
  },
  buttonYellow: {
    backgroundColor: "YellowGreen",
    margin: 20,
  },
  input: {
    display: "none",
  },
};

class UserPage extends React.Component {
  state = {
    userId: this.props.match.params.userId,
  };

  componentDidMount() {
    this.props.onFetchUser(this.state.userId);
  }

  render() {
    let user = this.props.usersReducer.users.get(
      Number(this.props.match.params.userId)
    );

    if (user == null) {
      return <div></div>;
    }

    const { classes } = this.props;
    const textSize = { style: { fontSize: "1.1rem" } };
    const labelSize = { style: { fontSize: "1.2rem" } };

    console.log(user);

    return (
      <Container maxWidth="sm">
        <br></br>
        <Paper elevation={5}>
          <Grid container direction="column">
            <Grid item container direction="row" className={classes.block1}>
              <Grid
                item
                container
                direction="column"
                justify="center"
                alignItems="center"
                sm={6}
              >
                <Grid item>
                  <img
                    className={classes.img}
                    src={
                      user.avatar != null && user.avatar.path != null
                        ? getServerURL() + user.avatar.path
                        : noImg
                    }
                    alt="userAvatar"
                  ></img>
                </Grid>
              </Grid>

              <Grid item container direction="column" sm={6} spacing={2}>
                <Grid item>
                  <TextField
                    InputLabelProps={labelSize}
                    inputProps={textSize}
                    label="Name"
                    size="small"
                    value={user.name}
                    multiline
                  ></TextField>
                </Grid>
                <Grid item>
                  <TextField
                    InputLabelProps={labelSize}
                    inputProps={textSize}
                    label="Surname"
                    size="small"
                    value={user.surname}
                    multiline
                  ></TextField>
                </Grid>
                <Grid item>
                  <TextField
                    InputLabelProps={labelSize}
                    inputProps={textSize}
                    label="Nickname"
                    size="small"
                    value={user.nickname}
                    multiline
                  ></TextField>
                </Grid>
                <Grid item>
                  <TextField
                    InputLabelProps={labelSize}
                    inputProps={textSize}
                    label="Email"
                    size="small"
                    value={user.email}
                    multiline
                  ></TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid className={classes.block2} item container alignItems="center">
              <Grid item>
                <Typography variant="h6">Description:</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">{user.description}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
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
    onFetchUser: (userId) => dispatch(actions.fetchUser(userId)),
    onFetchUsersWithRegex: (regex) =>
      dispatch(actions.fetchUsersWithRegex(regex)),
    onClearSearchUsers: () => dispatch(actions.clearSearchUsers()),
    onSubmitNewHousehold: (form) => dispatch(actions.createNewHousehold(form)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(UserPage));
