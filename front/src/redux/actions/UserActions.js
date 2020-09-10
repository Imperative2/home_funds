import * as actionTypes from "./actionTypes";
import axios from "../../axios";

import { notifyOK, notifyError } from "../../Layout/Snackbar/Snackbar";

export const loginUser = (loginForm, history) => {
  const loginData = {
    login: loginForm.login,
    password: loginForm.password,
    token: loginForm.token,
  };

  // console.log(loginData);
  // console.log(history);

  return (dispatch) => {
    let path = "/user/login";
    axios
      .post(path, loginData)
      .then((res) => {
        // console.log(res);
        history.push("/");
        dispatch(login(res.data));
        notifyOK("User", "Logged successfully");
      })
      .catch((err) => {
        // console.log(err);
        notifyError("User", "Error logging");
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
        //        console.log(res);
        history.push("/login");
        notifyOK("User", "Registered successfully");
      })
      .catch((err) => {
        //        console.log(err.response);
        notifyError("Registraion", err.response.data);
      });
  };
};

export const logoutUser = () => {
  return logout();
};

export const updateUserPassword = (form) => {
  return (dispatch) => {
    const path = "/user/updatePassword";
    axios
      .post(path, form)
      .then((res) => {
        //       console.log(res);
        notifyOK("User", "Password updated successfully");
      })
      .catch((err) => {
        notifyError("User", "Error updating password");
        //        console.log(err);
      });
  };
};

export const updateUserEmail = (form) => {
  return (dispatch) => {
    const path = "/user/updateEmail";
    axios
      .post(path, form)
      .then((res) => {
        dispatch(setUser(res.data));
        notifyOK("User", "Email updated successfully");
      })
      .catch((err) => {
        notifyError("User", "Error updating email");
        //        console.log(err);
      });
  };
};

export const updateUserDescription = (form) => {
  return (dispatch) => {
    const path = "/user/updateDescription";
    axios
      .post(path, form)
      .then((res) => {
        dispatch(setUser(res.data));
        notifyOK("User", "Description updated successfully");
      })
      .catch((err) => {
        //        console.log(err);
        notifyError("User", "Error updating description");
      });
  };
};

export const updateUserAvatar = (avatarForm) => {
  console.log(avatarForm);
  return (dispatch) => {
    const path = "/user/updateAvatar";
    axios
      .post(path, avatarForm.data, {
        params: {
          userId: avatarForm.userId,
        },
      })
      .then((res) => {
        //        console.log(res);
        dispatch(setUser(res.data));
        notifyOK("User", "Avatar uploaded successfully");
      })
      .catch((err) => {
        //        console.log(err);
        notifyError("User", "Error uploading avatar");
      });
  };
};

export const setUser = (user) => {
  return {
    type: actionTypes.SET_USER,
    user: user,
  };
};

export const login = (user) => {
  return {
    type: actionTypes.LOGIN_USER,
    user: user,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOG_OUT,
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
  };
};
