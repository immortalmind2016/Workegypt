import { LOGOUT_START, LOGOUT_SUCCESS, LOGOUT_FAILURE } from "../../types";
import { uris } from "../../../config";
import Axios from "axios";

export const logout = history => dispatch => {
  if (localStorage.admToken) {
    localStorage.removeItem("admToken");
    window.location.replace("/");
  }
  dispatch({
    type: LOGOUT_START,
  });
  Axios.put(
    uris.user.editAccount,
    { data: { last_logout: Date.now() } },
    {
      headers: {
        Authorization: localStorage.token,
      },
    }
  )
    .then(() => {
      history.push("/");
      if (localStorage.token) localStorage.removeItem("token");
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch(e => {
      console.error(e);
      dispatch({
        type: LOGOUT_FAILURE,
      });
    });
};
