import {
  EDIT_EVENT_FAILURE,
  EDIT_EVENT_START,
  EDIT_EVENT_SUCCESS
} from "../../types";
import axios from "axios";
import { uris } from "../../../config";

export default (id, newEvent) => dispatch => {
  dispatch({
    type: EDIT_EVENT_START
  });
  axios
    .put(uris.event.editPost + id, { data: newEvent })
    .then(({ data, status }) => {
      if (!!data.error || status === 500) {
        return dispatch({
          type: EDIT_EVENT_FAILURE
        });
      }

      return dispatch({
        type: EDIT_EVENT_SUCCESS,
        payload: { id, newEvent }
      });
    })
    .catch(() =>
      dispatch({
        type: EDIT_EVENT_FAILURE
      })
    );
};
