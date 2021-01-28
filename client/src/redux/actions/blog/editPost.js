import {
  EDIT_POST_FAILURE,
  EDIT_POST_START,
  EDIT_POST_SUCCESS
} from "../../types";
import axios from "axios";
import { uris } from "../../../config";

export default (id, newPost) => dispatch => {
  dispatch({
    type: EDIT_POST_START
  });
  axios
    .put(uris.blog.editPost + id, { data: newPost }, { timeout: 60000 })
    .then(({ data, status }) => {
      if (!!data.error || status === 500) {
        return dispatch({
          type: EDIT_POST_FAILURE
        });
      }

      return dispatch({
        type: EDIT_POST_SUCCESS,
        payload: { id, newPost }
      });
    })
    .catch(() =>
      dispatch({
        type: EDIT_POST_FAILURE
      })
    );
};
