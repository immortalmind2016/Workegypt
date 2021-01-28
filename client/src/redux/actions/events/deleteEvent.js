import {
  DELETE_EVENT_FAILURE,
  DELETE_EVENT_START,
  DELETE_EVENT_SUCCESS
} from "../../types";
import axios from "axios";
import { uris } from "../../../config";

export default id => dispatch => {
  dispatch({
    type: DELETE_EVENT_START
  });
  axios
    .delete(uris.event.deletePost + id)
    .then(({ data, status }) => {
      if (!!data.error || status === 500) {
        return dispatch({
          type: DELETE_EVENT_FAILURE
        });
      }

      return dispatch({
        type: DELETE_EVENT_SUCCESS,
        payload: { id }
      });
    })
    .catch(() =>
      dispatch({
        type: DELETE_EVENT_FAILURE
      })
    );
};
