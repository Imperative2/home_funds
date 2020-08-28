import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const fetchUser = (userId) => {
  return (dispatch) => {
    let path = "/users/";

    axios
      .get(path, {
        params: {
          userId: userId,
        },
      })
      .then((res) => {
        console.log(res.data);

        dispatch(addUser(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchUsers = () => {
  return (dispatch) => {
    let path = "/users/fetchUsers";

    axios
      .get(path)
      .then((res) => {
        console.log(res.data);

        dispatch(setUsers(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchUsersWithRegex = (regex) => {
  return (dispatch) => {
    let path = "/users/fetchUsersWithRegex";

    axios
      .get(path, {
        params: {
          regex: regex,
        },
      })
      .then((res) => {
        console.log(res);

        dispatch(setSearchUsers(res.data));
        dispatch(addUsers(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchUsersWithRange = (start, end) => {
  return (dispatch) => {
    let path = "/users/fetchUsersRange";

    axios
      .get(path, {
        params: {
          start: start,
          end: end,
        },
      })
      .then((res) => {
        console.log(res.data);

        dispatch(addUsers(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const setUsers = (users) => {
  return {
    type: actionTypes.SET_USERS,
    users: users,
  };
};

const addUser = (user) => {
  return {
    type: actionTypes.ADD_USER,
    user: user,
  };
};

const addUsers = (users) => {
  return {
    type: actionTypes.ADD_USERS,
    users: users,
  };
};

export const clearUsers = () => {
  return {
    type: actionTypes.CLEAR_USERS,
  };
};

const setSearchUsers = (users) => {
  return {
    type: actionTypes.SET_SEARCH_USERS,
    users: users,
  };
};

export const clearSearchUsers = () => {
  return {
    type: actionTypes.CLEAR_SEARCH_USERS,
  };
};
