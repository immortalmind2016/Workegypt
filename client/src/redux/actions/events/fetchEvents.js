import {
  FETCH_EVENTS_FAILURE,
  FETCH_EVENTS_START,
  FETCH_EVENTS_SUCCESS
} from "../../types";
import axios from "axios";
import { uris } from "../../../config";

export default () => dispatch => {
  dispatch({
    type: FETCH_EVENTS_START
  });
  axios
    .get(uris.event.fetchPosts, { timeout: 60000 })
    .then(({ data, status }) => {
      if (!!data.error || status === 500 || Object.keys(data).length === 0) {
        return dispatch({
          type: FETCH_EVENTS_FAILURE
        });
      }

      return dispatch({
        type: FETCH_EVENTS_SUCCESS,
        payload: data.events || []
      });
    })
    .catch(() =>
      dispatch({
        type: FETCH_EVENTS_FAILURE
      })
    );
};
