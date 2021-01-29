import {
  UPLOAD_EVENT_START,
  UPLOAD_EVENT_SUCCESS,
  UPLOAD_EVENT_FAILURE
} from "../../types";
import axios from "axios";
import { uris } from "../../../config";

export default newEvent => dispatch => {
  dispatch({
    type: UPLOAD_EVENT_START
  });
  axios
    .post(uris.event.uploadPost, { data: newEvent })
    .then(({ data, status }) => {
      if (!!data.error || status === 500) {
        return dispatch({
          type: UPLOAD_EVENT_FAILURE
        });
      }

      return dispatch({
        type: UPLOAD_EVENT_SUCCESS,
        payload: data.event
      });
    })
    .catch(() =>
      dispatch({
        type: UPLOAD_EVENT_FAILURE
      })
    );
};
