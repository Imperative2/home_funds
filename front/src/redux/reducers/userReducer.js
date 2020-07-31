/* eslint-disable default-case */
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  user: {
    userId: "",
    name: "",
    surname: "",
    nick: "",
    email: "",
    description: "",
    color: "",
    avatar: "",
  },
  isLogged: true,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER: {
      return {
        ...state,
        user: action.user,
        isLogged: true,
      };
    }
    case actionTypes.LOGIN_USER: {
      return {
        ...state,
        user: { isLogged: true },
      };
    }
  }

  return state;
};

export default userReducer;
