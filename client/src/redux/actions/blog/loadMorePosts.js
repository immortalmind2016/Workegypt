import {
  LOAD_MORE_POSTS_FAILURE,
  LOAD_MORE_POSTS_START,
  LOAD_MORE_POSTS_SUCCESS
} from "../../types";
import axios from "axios";
import { uris } from "../../../config";

export default skipCount => dispatch => {
  dispatch({
    type: LOAD_MORE_POSTS_START
  });
  axios
    .get(uris.blog.loadMorePosts + skipCount)
    .then(({ data, status }) => {
      if (!!data.error || status === 500) {
        return dispatch({
          type: LOAD_MORE_POSTS_FAILURE
        });
      }

      return dispatch({
        type: LOAD_MORE_POSTS_SUCCESS,
        payload: data.posts || []
      });
    })
    .catch(() =>
      dispatch({
        type: LOAD_MORE_POSTS_FAILURE
      })
    );
};
