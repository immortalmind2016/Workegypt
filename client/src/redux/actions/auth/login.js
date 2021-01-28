/**
 * @todo replace data.id with data.token
 */
import axios from "axios";
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED } from "../../types";
import { uris } from "../../../config";
import { fetchUserData } from "../index";
export const login = (email, password, confirmation_token) => async (
  dispatch
) => {
  //starting the action
  dispatch({
    type: LOGIN_START,
  });
  //async request

  axios
    .post(uris.user.login, {
      data: { email, password, confirmation_token },
    })
    .then((req) => {
      if (!!req.data) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            name: req?.data?.name,
            type: req?.data?.type,
          },
        });

        axios.defaults.headers.common["Authorization"] = `${req.data.token}`;
        localStorage.setItem("token", req.data.token);
        dispatch(fetchUserData());
      }
    })
    .catch(({ response }) => {
      dispatch({
        type: LOGIN_FAILED,
        payload: {
          ...response?.data,
        },
      });
    });
};
