import {
  LOAD_MORE_EVENTS_FAILURE,
  LOAD_MORE_EVENTS_START,
  LOAD_MORE_EVENTS_SUCCESS
} from "../../types";
import axios from "axios";
import { uris } from "../../../config";

export default skipCount => dispatch => {
  dispatch({
    type: LOAD_MORE_EVENTS_START
  });
  axios
    .get(uris.event.loadMorePosts + skipCount)
    .then(({ data, status }) => {
      if (!!data.error || status === 500) {
        return dispatch({
          type: LOAD_MORE_EVENTS_FAILURE
        });
      }

      return dispatch({
        type: LOAD_MORE_EVENTS_SUCCESS,
        payload: data.events || []
      });
    })
    .catch(() =>
      dispatch({
        type: LOAD_MORE_EVENTS_FAILURE
      })
    );
};
