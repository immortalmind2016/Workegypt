import {
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_START,
  ADMIN_LOGIN_FAILURE,
} from "../../types";
import axios from "axios";
import { uris } from "../../../config";
export const adminLogin = (username, password) => dispatch => {
  dispatch({
    type: ADMIN_LOGIN_START,
  });
  axios
    .post(uris.admin.login, {
      data: { username, password },
    })
    .then(({ data }) => {
      if (data && data.token) {
        dispatch({ type: ADMIN_LOGIN_SUCCESS });
        localStorage.setItem("admToken", data.token);
        window.location.replace("/analysis/website");
      } else {
        dispatch({
          type: ADMIN_LOGIN_FAILURE,
        });
      }
    })
    .catch(error => {
      console.error(error);
      dispatch({
        type: ADMIN_LOGIN_FAILURE,
      });
    });
};
