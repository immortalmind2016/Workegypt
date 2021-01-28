import axios from "axios";
import { REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILED } from "../../types";
import { uris } from "../../../config";
import isEmpty from "../../../utils/isEmpty";
export const register = (name, email, password, type) => dispatch => {
  //starting the action
  dispatch({
    type: REGISTER_START
  });

  //async request
  axios
    .post(uris.user.register, {
      data: {
        name,
        email,
        password,
        type
      }
    })
    .then(req => {
      if (!isEmpty(req.data.error)) {
        dispatch({
          type: REGISTER_SUCCESS
        });
      } else {
        dispatch({
          type: REGISTER_FAILED
        });
      }
    })
    .catch(e => {
      dispatch({
        type: REGISTER_FAILED
      });
      console.error("Error in request ", e);
    });
};
