import {
  UPLOAD_POST_START,
  UPLOAD_POST_SUCCESS,
  UPLOAD_POST_FAILURE
} from "../../types";
import axios from "axios";
import { uris } from "../../../config";

export default newPost => dispatch => {
  dispatch({
    type: UPLOAD_POST_START
  });
  axios
    .post(uris.blog.uploadPost, { data: newPost })
    .then(({ data, status }) => {
      if (!!data.error || status === 500) {
        return dispatch({
          type: UPLOAD_POST_FAILURE
        });
      }

      return dispatch({
        type: UPLOAD_POST_SUCCESS,
        payload: data.post
      });
    })
    .catch(() =>
      dispatch({
        type: UPLOAD_POST_FAILURE
      })
    );
};
