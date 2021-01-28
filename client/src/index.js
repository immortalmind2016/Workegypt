import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./redux/store";
import { Provider } from "react-redux";
import { checkLogin } from "./redux/actions";
import axios from "axios";
import "@popperjs/core/dist/umd/popper";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/style.scss";
import io from "socket.io-client";
import { socketUrl } from "./config";
//check if token is stored
//attaching token to auth headers

const token = localStorage.getItem("token") || localStorage.getItem("admToken");
export const socket = io(socketUrl, { secure: true });
axios.defaults.headers.common["Authorization"] = `${token}`;

store.dispatch(checkLogin());

const AppWithStore = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
ReactDOM.render(<AppWithStore />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
