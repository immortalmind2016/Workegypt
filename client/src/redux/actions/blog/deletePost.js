import {
  DELETE_POST_FAILURE,
  DELETE_POST_START,
  DELETE_POST_SUCCESS
} from "../../types";
import axios from "axios";
import { uris } from "../../../config";

export default id => dispatch => {
  dispatch({
    type: DELETE_POST_START
  });
  axios
    .delete(uris.blog.deletePost + id)
    .then(({ data, status }) => {
      if (!!data.error || status === 500) {
        return dispatch({
          type: DELETE_POST_FAILURE
        });
      }

      return dispatch({
        type: DELETE_POST_SUCCESS,
        payload: { id }
      });
    })
    .catch(() =>
      dispatch({
        type: DELETE_POST_FAILURE
      })
    );
};
