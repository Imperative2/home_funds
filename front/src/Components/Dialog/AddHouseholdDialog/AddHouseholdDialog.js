import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import AddIcon from "@material-ui/icons/Add";
import Chip from "@material-ui/core/Chip";
import Container from "@material-ui/core/Container";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListAvatar from "@material-ui/core/ListItemAvatar";
import ListText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

import { FixedSizeList } from "react-window";

import GenericStepper from "../../Stepper/GenericStepper/GenericStepper";
import GenericTable from "../../Tables/GenericTable/GenericTable";
import generateRandomNames from "../../../utils/GenerateRandomNames/GenerateRandomNames";
import userAvatar from "../../../static/user_avatar.jpg";
import userAvatar2 from "../../../static/user_avatar2.jpg";
import userAvatar3 from "../../../static/user_avatar3.jpg";
import noImage from "../../../static/NoImage.png";

const style = {
  dialog: {
    marginTop: 0,
  },
  container: {
    margin: 50,
  },

  border: {
    border: "3px solid Navy",
    borderRadius: 5,
  },

  chipDialog: {
    margin: 10,
    width: 200,
  },

  usersList: {
    maxHeight: "50vh",
    overflow: "auto",
  },

  NavigationButtons: {
    marginBottom: "2rem",
    marginLeft: "1.5rem",
    marginRight: "1.5rem",
    marginTop: "1rem",
  },
  img: {
    maxWidth: "10rem",
    maxHeight: "10rem",
    border: "3px solid Gray",
    borderRadius: 5,
  },
  searchBar: {
    background: "DodgerBlue",
    borderRadius: 5,
  },
  textField: {
    color: "white",
  },
  input: {
    display: "none",
  },
};

class AddHouseholdDialog extends React.Component {
  state = {
    mainDialogOpen: this.props.open,
    activeStep: 0,
    products: [
      { name: "chleb", id: 0, data: generateRandomNames(3) },
      { name: "mleko", id: 1, data: generateRandomNames(3) },
      { name: "woda", id: 2, data: generateRandomNames(3) },
      { name: "sól", id: 3, data: generateRandomNames(3) },
    ],

    household: {
      name: "fallas",
      description:
        "asdfasdf as da sdfasdf asdf asdf asdf asd fasdfasdf asdfasdf fasdf",
      photo: noImage,
      addedUsers: [],
    },

    addChipOpen: false,
    addChipValue: "",

    users: [
      {
        id: 0,
        name: "Karol",
        surname: "Masluch",
        nickname: "Imperative",
        avatar: userAvatar,
        description: "somethign something",
        email: "mail@mail.com",
      },
      {
        id: 1,
        name: "Paweł",
        surname: "Gaweł",
        nickname: "doggerstad",
        avatar: userAvatar2,
        description: "somethign something",
        email: "mail@hotmail.com",
      },
      {
        id: 2,
        name: "Michał",
        surname: "Pychał",
        nickname: "pussyDestroyerXXX",
        avatar: userAvatar3,
        description: "somethign something",
        email: "mail@facebook.com",
      },
    ],
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.state.mainDialogOpen) {
      this.setState({ ...this.state, mainDialogOpen: nextProps.open });
    }
  }

  // componentDidUpdate(prevProps) {
  //   console.log(prevProps.open);
  //   console.log(this.props.open);
  //   if (this.state.mainDialogOpen !== this.props.open) {
  //     this.setState({ ...this.state, mainDialogOpen: this.props.open });
  //   }
  // }

  handleOpenMainDialog = () => {
    this.setState({ ...this.state, mainDialogOpen: true });
  };

  handleCloseMainDialog = (value) => {
    this.setState({ ...this.state, mainDialogOpen: false, activeStep: 0 });
  };

  handleCloseChipDialog = () => {
    this.setState({ ...this.state, addChipOpen: false, addChipValue: "" });
  };

  handlePhotoUpload = (event) => {
    let image = event.target.files[0];
    this.setState({
      ...this.state,
      household: { ...this.state.household, photo: URL.createObjectURL(image) },
    });
  };

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({ ...this.state, addChipValue: value });
  };

  handleChangeHouseholdName = (event) => {
    const value = event.target.value;
    this.setState({
      ...this.state,
      household: { ...this.state.household, name: value },
    });
  };

  handleChangeHouseholdDescription = (event) => {
    const value = event.target.value;
    this.setState({
      ...this.state,
      household: { ...this.state.household, description: value },
    });
  };

  handleAddUserButton = (userId) => {
    for (let i = 0; i < this.state.users.length; i++) {
      if (this.state.users[i].id === userId) {
        let addedUsers = this.state.household.addedUsers;
        addedUsers.push(this.state.users[i]);

        this.setState({
          ...this.state,
          household: {
            ...this.state.household,
            addedUsers: addedUsers,
          },
        });
        return;
      }
    }
  };

  handleAdd = () => {
    let product = {
      name: this.state.addChipValue,
      id: this.state.products.length,
      data: generateRandomNames(3),
    };

    this.setState({
      ...this.state,
      addChipValue: "",
      products: [...this.state.products, product],
      addChipOpen: false,
    });
  };

  handleAddChipButton = () => {
    this.setState({ ...this.state, addChipOpen: true });
  };

  handleNextButton = () => {
    this.setState({ ...this.state, activeStep: this.state.activeStep + 1 });
  };

  handlePreviousButton = () => {
    this.setState({ ...this.state, activeStep: this.state.activeStep - 1 });
  };

  handleProductRemove = (chipId) => {
    let products = this.state.products;

    if (this.state.products.length === 1) products.pop();
    else products.splice(chipId, 1);

    this.setState({
      ...this.state,
      products: products,
    });
  };

  render() {
    const { classes } = this.props;
    const textSize = { style: { fontSize: "1.1rem" } };
    const labelSize = { style: { fontSize: "1.2rem" } };
    const textColor = { style: { color: "white" } };

    let page_0 = (
      <Container maxWidth="md">
        <Grid
          container
          spacing={2}
          justify="center"
          alignItems="center"
          direction="column"
        >
          <Grid
            xs={12}
            item
            container
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Household name:</Typography>
              <TextField
                variant="outlined"
                InputLabelProps={labelSize}
                inputProps={textSize}
                fullWidth
                onChange={(event) => this.handleChangeHouseholdName(event)}
              ></TextField>
            </Grid>

            <Grid
              item
              container
              xs={12}
              sm={6}
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <img
                  className={classes.img}
                  src={this.state.household.photo}
                  alt="household"
                ></img>
              </Grid>
              <Grid item>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="upload-avatar-button"
                  type="file"
                  onChange={(event) => this.handlePhotoUpload(event)}
                ></input>
                <label htmlFor="upload-avatar-button">
                  <Button
                    color="primary"
                    variant="contained"
                    startIcon={<AddAPhotoIcon />}
                    component="span"
                  >
                    Upload Photo
                  </Button>
                </label>
              </Grid>
            </Grid>
          </Grid>
          <Grid container item xs={12} direction="column">
            <Grid item>
              <Typography variant="h6">Household description:</Typography>
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                fullWidth
                multiline
                InputLabelProps={labelSize}
                inputProps={textSize}
                rows={5}
                onChange={(event) =>
                  this.handleChangeHouseholdDescription(event)
                }
              ></TextField>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
    let page_1 = (
      <Container maxWidth="md">
        <Grid container spacing={1}>
          <Grid item container xs={12} className={classes.border} spacing={1}>
            {this.state.products.map((product) => {
              return (
                <Grid item key={product.id}>
                  <Chip
                    label={product.name}
                    onDelete={() => this.handleProductRemove(product.id)}
                  ></Chip>
                </Grid>
              );
            })}
            <Grid item>
              <Chip
                color="primary"
                label="Add"
                icon={<AddIcon />}
                onClick={this.handleAddChipButton}
              ></Chip>
              <Dialog
                onClose={this.handleCloseChipDialog}
                aria-labelledby="simple-dialog-title"
                open={this.state.addChipOpen}
                scroll="paper"
              >
                <Grid container spacing={1} className={classes.chipDialog}>
                  <Grid item xs={12}>
                    <Typography variant="h6">Name:</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      inputProps={textSize}
                      onChange={(event) => this.handleChange(event)}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={this.handleAdd}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Dialog>
            </Grid>
          </Grid>
          <Grid
            item
            container
            justify="center"
            alignItems="center"
            direction="column"
          >
            <Grid item>
              <Typography variant="h6">Preview</Typography>
            </Grid>
            <Grid item>
              <GenericTable data={this.state.products}></GenericTable>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );

    let users = this.state.users.map((user) => {
      return (
        <React.Fragment key={user.id}>
          <ListItem>
            <ListAvatar>
              <Avatar src={user.avatar}></Avatar>
            </ListAvatar>
            <ListText
              primary={user.name + " " + user.surname}
              secondary={"@" + user.nickname}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => this.handleAddUserButton(user.id)}
              >
                <PersonAddIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </React.Fragment>
      );
    });
    let page_2 = (
      <Container maxWidth="sm">
        <Grid container spacing={2} direction="column">
          <Grid className={classes.searchBar} item xs={12}>
            <TextField
              InputProps={textColor}
              fullWidth
              variant="outlined"
              placeholder="Search"
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={12}>
            <List className={classes.usersList}>
              {users}
              {users}
              {users}
              {users}
              {users}
            </List>
          </Grid>
        </Grid>
      </Container>
    );
    let page_3 = (
      <Container maxWidth="md">
        <Grid container spacing={2} direction="column">
          <Grid item container direction="row">
            <Grid xs={12} sm={6} container item direction="column" spacing={3}>
              <Grid item>
                <Typography variant="h6">
                  Household name:{" "}
                  <i>
                    <b>{this.state.household.name}</b>
                  </i>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6">
                  Household description:{" "}
                  <i>{this.state.household.description}</i>
                </Typography>
              </Grid>
            </Grid>

            <Grid container item xs={12} sm={6} justify="center">
              <img
                className={classes.img}
                src={this.state.household.photo}
                alt="household"
              ></img>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider></Divider>
          </Grid>
          <Grid item container justify="center" alignItems="center">
            <Grid item>
              <Typography variant="h6">Products:</Typography>
              <GenericTable data={this.state.products}></GenericTable>
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={12}>
              <Typography variant="h6">Users:</Typography>
            </Grid>
            {this.state.household.addedUsers.map((user) => {
              return (
                <Grid item key={user.id}>
                  <ListItem>
                    <ListAvatar>
                      <Avatar src={user.avatar}></Avatar>
                    </ListAvatar>
                    <ListText
                      primary={user.name + " " + user.surname}
                      secondary={"@" + user.nickname}
                    />
                  </ListItem>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Container>
    );

    let currentPage;
    switch (this.state.activeStep) {
      case 0: {
        currentPage = page_0;
        break;
      }
      case 1: {
        currentPage = page_1;
        break;
      }
      case 2: {
        currentPage = page_2;
        break;
      }
      case 3: {
        currentPage = page_3;
        break;
      }
      default: {
        currentPage = page_0;
      }
    }

    return (
      <div>
        <Dialog
          className={classes.dialog}
          fullWidth
          maxWidth="md"
          onClose={this.handleCloseMainDialog}
          aria-labelledby="simple-dialog-title"
          open={this.state.mainDialogOpen}
        >
          <DialogTitle id="simple-dialog-title">
            Create new Household
          </DialogTitle>
          <GenericStepper
            orientation="horizontal"
            alternativeLabel={false}
            steps={[
              "Setup Household",
              "Create schedule",
              "Add members",
              "Finish",
            ]}
            activeStep={this.state.activeStep}
          ></GenericStepper>
          {currentPage}
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Button
                className={classes.NavigationButtons}
                variant="contained"
                color="primary"
                onClick={this.handlePreviousButton}
              >
                {"<<"}Previous
              </Button>
            </Grid>
            <Grid item>
              <Button
                className={classes.NavigationButtons}
                variant="contained"
                color="primary"
                onClick={this.handleNextButton}
              >
                Next{">>"}
              </Button>
            </Grid>
          </Grid>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(style)(AddHouseholdDialog);
