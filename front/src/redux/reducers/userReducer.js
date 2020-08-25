/* eslint-disable default-case */
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  user: {
    userId: "",
    name: "",
    surname: "",
    nickname: "",
    email: "",
    description: "",
    color: "",
    avatar: "",
  },
  isLogged: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER: {
      return {
        ...state,
        user: action.user,
      };
    }
    case actionTypes.LOGIN_USER: {
      return {
        ...state,
        user: action.user,
        isLogged: true,
      };
    }
    case actionTypes.LOG_OUT: {
      return {
        ...state,
        user: action.user,
        isLogged: false,
      };
    }
  }

  return state;
};

export default userReducer;
