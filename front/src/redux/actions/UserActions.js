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

export const registerUser = (registerForm, history) => {
  console.log(history);
  return (dispatch) => {
    const path = "/user/register";
    axios
      .post(path, registerForm)
      .then((res) => {
        console.log(res);
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setUser = (user) => {
  return {
    type: actionTypes.SET_USER,
    user: user,
  };
};
