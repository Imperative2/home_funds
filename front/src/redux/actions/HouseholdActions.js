import * as actionTypes from "./actionTypes";
import axios from "../../axios";
import { notifyOK, notifyError } from "../../Layout/Snackbar/Snackbar";

export const createNewHousehold = (form) => {
  console.log(form);

  return (dispatch) => {
    const path = "/household/createNewHousehold";
    axios
      .post(path, form)
      .then((res) => {
        //        console.log(res);
        notifyOK("Household", "Created successfully");
        console.log(res);
        let photoForm = {
          photo: form.photo,
          householdId: res.data.householdId,
        };
        dispatch(uploadHouseholdPhoto(photoForm));
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
        //        console.log(res);
        dispatch(addHouseholdToUserHouseholds(res.data));
        notifyOK("Household", "Description updated successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateHouseholdName = (form) => {
  return (dispatch) => {
    const path = "/household/updateHouseholdName";
    axios
      .post(path, form)
      .then((res) => {
        //        console.log(res);
        dispatch(addHouseholdToUserHouseholds(res.data));
        notifyOK("Household", "Description updated successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addUserToHousehold = (form) => {
  return (dispatch) => {
    const path = "/household/addUserToHousehold";
    axios
      .post(path, null, {
        params: {
          userId: form.userId,
          householdId: form.householdId,
        },
      })
      .then((res) => {
        dispatch(addHouseholdToUserHouseholds(res.data));
        notifyOK("Household", "User added successfully");
      })
      .catch((err) => {
        notifyError("Household", "Couldn't add user to household");
      });
  };
};

export const removeUserFromHousehold = (form) => {
  return (dispatch) => {
    const path = "/household/removeUserFromHousehold";
    axios
      .delete(path, {
        params: {
          userId: form.userId,
          householdId: form.householdId,
        },
      })
      .then((res) => {
        dispatch(addHouseholdToUserHouseholds(res.data));
        notifyOK("Household", "User removed successfully");
      })
      .catch((err) => {
        notifyError("Household", "Couldn't remove user from household");
      });
  };
};

export const addHouseholdProduct = (form) => {
  return (dispatch) => {
    const path = "/household/addHouseholdProduct";
    axios
      .post(path, form, {
        params: {
          householdId: form.householdId,
        },
      })
      .then((res) => {
        //       console.log(res);
        dispatch(addHouseholdToUserHouseholds(res.data));
        notifyOK("Household", "Product added successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addUserHouseholdProduct = (form) => {
  return (dispatch) => {
    const path = "household/addUserHouseholdProduct";
    axios
      .post(path, form)
      .then((res) => {
        //        console.log(res);
        dispatch(fetchHousehold(form.householdId));
        notifyOK("Household", "Product added successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const removeHouseholdProduct = (form) => {
  return (dispatch) => {
    const path = "/household/removeHouseholdProduct";
    axios
      .delete(path, {
        params: {
          householdProductId: form.householdProductId,
          householdId: form.householdId,
        },
      })
      .then((res) => {
        dispatch(addHouseholdToUserHouseholds(res.data));
        notifyOK("Household", "Product removed successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const removeHousehold = (form) => {
  return (dispatch) => {
    const path = "/household/removeHousehold";
    axios
      .delete(path, {
        params: {
          householdId: form.householdId,
        },
      })
      .then((res) => {
        dispatch(addHouseholdToUserHouseholds(res.data));
        notifyOK("Household", "Description updated successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const uploadHouseholdPhoto = (form) => {
  console.log(form);

  if (form.photo == null) return (dispatch) => {};
  return (dispatch) => {
    const path = "/household/uploadHouseholdPhoto";
    axios
      .post(path, form.photo, {
        params: {
          householdId: form.householdId,
        },
      })
      .then((res) => {
        //        console.log(res);
        dispatch(addHouseholdToUserHouseholds(res.data));
        notifyOK("Household", "Photo uploaded successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

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
        dispatch(addHouseholdToUserHouseholds(res.data));
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

const addHouseholdToUserHouseholds = (household) => {
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
