import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const loginUser = () => {
  return (dispatch) => {
    let path = "/user/";
    axios.get(path).then((res) => {
      console.log(res.data[0]);
      dispatch(setUser(res.data[0]));
    });
  };
};

export const setUser = (user) => {
  return {
    type: actionTypes.SET_USER,
    user: user,
  };
};
