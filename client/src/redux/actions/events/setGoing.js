import {
  SET_GOING_START,
  SET_GOING_SUCCESS,
  SET_GOING_FAILURE,
} from "../../types";
import axios from "axios";
import { uris } from "../../../config";

export default (eventId) => (dispatch) => {
  dispatch({
    type: SET_GOING_START,
  });
  axios
    .post(uris.event.setGoing, { data: { id: eventId } })
    .then(({ data, status }) => {
      if (!!data.error || status === 500) {
        return dispatch({
          type: SET_GOING_FAILURE,
        });
      }

      return dispatch({
        type: SET_GOING_SUCCESS,
      });
    })
    .catch(() =>
      dispatch({
        type: SET_GOING_FAILURE,
      })
    );
};
