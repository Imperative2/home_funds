import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const createNewHousehold = (form) => {
  console.log(form);

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
        dispatch(addHouseholdToUser(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchOwnerHouseholds = (ownerId) => {
  return (dispatch) => {
    const path = "/households/fetchOwnersHouseholds";
    axios
      .get(path, { params: { ownerId: ownerId } })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchUserHouseholds = (userId) => {
  return (dispatch) => {
    const path = "households/fetchUserHouseholds";
    axios
      .get(path, {
        params: {
          userId: userId,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(setUserHouseholds(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const addHouseholdToUser = (household) => {
  return {
    type: actionTypes.ADD_HOUSEHOLD_TO_USER_HOUSEHOLDS,
    household: household,
  };
};

const setUserHouseholds = (households) => {
  return {
    type: actionTypes.SET_USER_HOUSEHOLDS,
    householdsList: households,
  };
};

const setSelectedHousehold = (household) => {
  return {
    type: actionTypes.SET_SELECTED_HOUSEHOLD,
    household: household,
  };
};

const clearUserHouseholds = () => {
  return {
    type: actionTypes.CLEAR_USER_HOUSEHOLDS,
  };
};