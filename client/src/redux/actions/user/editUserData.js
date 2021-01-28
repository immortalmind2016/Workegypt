import Axios from "axios";
import { uris } from "../../../config";
import {
  EDIT_USER_SUCCESS,
  EDIT_USER_START,
  EDIT_USER_FAILURE
} from "../../types";
export const editUserData = newData => dispatch => {
  dispatch({
    type: EDIT_USER_START
  });
  Axios.put(uris.user.editAccount, { data: newData })
    .then(({ data }) => {
      dispatch({
        type: EDIT_USER_SUCCESS,
        payload: { ...data.user }
      });
    })
    .catch(e => {
      console.error(e);
      dispatch({
        type: EDIT_USER_FAILURE
      });
    });
};
