/* eslint-disable default-case */

import * as actionTypes from "../actions/actionTypes";

const initialState = {
  users: [],
  searchUsers: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USERS: {
      return {
        ...state,
        users: action.users,
      };
    }
    case actionTypes.ADD_USER: {
      return {
        ...state,
        users: [...state.users, action.user],
      };
    }

    case actionTypes.ADD_USERS: {
      return {
        ...state,
        users: [...state.usersusers, ...action.users],
      };
    }

    case actionTypes.CLEAR_USERS: {
      return {
        ...state,
        users: [],
      };
    }

    case actionTypes.SET_SEARCH_USERS: {
      return {
        ...state,
        searchUsers: action.users,
      };
    }

    case actionTypes.CLEAR_SEARCH_USERS: {
      return {
        ...state,
        searchUsers: [],
      };
    }
  }
  return state;
};

export default usersReducer;
