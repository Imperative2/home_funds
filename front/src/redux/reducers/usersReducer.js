/* eslint-disable default-case */

import * as actionTypes from "../actions/actionTypes";

const initialState = {
  users: new Map(),
  searchUsers: new Map(),
};

const usersReducer = (state = initialState, action) => {
  console.log(state);
  switch (action.type) {
    case actionTypes.SET_USERS: {
      let newUsersMap = new Map();

      action.users.forEach((user) => {
        newUsersMap.set(user.userId, user);
      });

      return {
        ...state,
        users: newUsersMap,
      };
    }
    case actionTypes.ADD_USER: {
      let usersMap = state.users;
      usersMap.set(action.user.userId, action.user);

      return {
        ...state,
        users: usersMap,
      };
    }

    case actionTypes.ADD_USERS: {
      let usersMap = state.users;
      action.users.forEach((user) => {
        usersMap.set(user.userId, user);
      });

      return {
        ...state,
        users: usersMap,
      };
    }

    case actionTypes.CLEAR_USERS: {
      state.users.clear();

      return {
        ...state,
      };
    }

    case actionTypes.SET_SEARCH_USERS: {
      console.log(action.users);
      let newSearchUsersMap = new Map();
      action.users.forEach((user) => {
        newSearchUsersMap.set(user.userId, user);
      });
      return {
        ...state,
        searchUsers: newSearchUsersMap,
      };
    }

    case actionTypes.CLEAR_SEARCH_USERS: {
      state.searchUsers.clear();
      return {
        ...state,
      };
    }
  }
  return state;
};

export default usersReducer;
