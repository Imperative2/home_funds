import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const loginUser = (loginForm, history) => {
  const loginData = {
    login: loginForm.login,
    password: loginForm.password,
    token: loginForm.token,
  };

  console.log(loginData);
  console.log(history);

  return (dispatch) => {
    let path = "/user/login";
    axios
      .post(path, loginData)
      .then((res) => {
        console.log(res);
        history.push("/");
        dispatch(setUser(res.data));
      })
      .catch((err) => {
        console.log(err);
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
