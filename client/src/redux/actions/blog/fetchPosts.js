import {
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_START,
  FETCH_POSTS_SUCCESS
} from "../../types";
import axios from "axios";
import { uris } from "../../../config";

export default () => dispatch => {
  dispatch({
    type: FETCH_POSTS_START
  });
  axios
    .get(uris.blog.fetchPosts)
    .then(({ data, status }) => {
      if (!!data.error || status === 500) {
        return dispatch({
          type: FETCH_POSTS_FAILURE
        });
      }

      return dispatch({
        type: FETCH_POSTS_SUCCESS,
        payload: data.posts instanceof Array ? data.posts.reverse() : []
      });
    })
    .catch(() =>
      dispatch({
        type: FETCH_POSTS_FAILURE
      })
    );
};
