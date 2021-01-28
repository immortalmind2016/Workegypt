import {
  FETCH_USER_FAILURE,
  FETCH_USER_START,
  FETCH_USER_SUCCESS,
  LOGOUT_START,
  LOGOUT_SUCCESS,
} from "../../types";
import Axios from "axios";
import { uris } from "../../../config";
import { fetchProfile } from "../profile/fetchProfile";
export const fetchUserData = (history) => (dispatch) => {
  dispatch({
    type: FETCH_USER_START,
  });
  Axios.get(uris.user.getUserData, {
    timeout: 9999999,
    headers: {
      Authorization: localStorage.token,
    },
  })
    .then(({ data }) => {
      dispatch(fetchProfile(data.user.type, data.user._id, false));
      dispatch({
        type: FETCH_USER_SUCCESS,
        payload: data.user,
      });
    })
    .catch((e) => {
      localStorage.removeItem("token");
      dispatch({ type: FETCH_USER_FAILURE });
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    });
};
