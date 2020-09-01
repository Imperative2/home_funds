import * as actionsTypes from "./actionTypes";
import axios from "../../axios";

export const fetchHouseholds = () => {
  return (dispatch) => {
    const path = "/households/";
    axios
      .get(path)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchHousehold = (householdId) => {
  return (dispatch) => {
    const path = "/households/fetchHousehold";
    axios
      .get(path, {
        params: {
          householdId: householdId,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchOwnerHouseholds = (ownerId) => {
  return (dispatch) => {
    const path = "/households/fetchOwnersHouseholds";
    axios.get(path, { params: {} });
  };
};

export const fetchUserHouseholds = () => {};
