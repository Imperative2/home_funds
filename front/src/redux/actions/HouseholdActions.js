import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const createNewHousehold = (form) => {
  return (dispatch) => {
    const path = "/household/createNewHousehold";
    axios
      .post(path, form)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateHouseholdDescription = (form) => {
  return (dispatch) => {
    const path = "/household/updateHouseholdDescription";
    axios
      .post(path, form)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addUserToHousehold = (form) => {
  return (dispatch) => {
    const path = "/household/updateHouseholdDescription";
    axios
      .post(path, null, {
        params: {
          userId: form.userId,
          householdId: form.householdId,
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

export const removeUserFromHousehold = (form) => {};

export const addHouseholdProduct = (form) => {
  return (dispatch) => {
    const path = "/household/addHouseholdProduct";
    axios
      .post(path, form.newHouseholdProduct, null, {
        params: {
          householdId: form.householdId,
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

export const removeHouseholdProduct = (form) => {};

export const removeHousehold = (form) => {};
