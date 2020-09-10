import { store } from "react-notifications-component";

const notificationError = {
  type: "danger",
  title: "Error!",
  message: "",
  insert: "top",
  container: "bottom-left",
  animationIn: ["animated", "fadeIn"],
  animationOut: ["animated", "fadeOut"],
  dismiss: {
    duration: 3000,
    onScreen: true,
  },
};

const notificationOk = {
  type: "success",
  title: "Success",
  message: "",
  insert: "top",
  container: "bottom-left",
  animationIn: ["animated", "fadeIn"],
  animationOut: ["animated", "fadeOut"],
  dismiss: {
    duration: 3000,
    onScreen: true,
  },
};

export function notifyOK(title, message) {
  store.addNotification({
    ...notificationOk,
    title: title,
    message: message,
  });
}

export function notifyError(title, message) {
  store.addNotification({
    ...notificationError,
    title: title,
    message: message,
  });
}
