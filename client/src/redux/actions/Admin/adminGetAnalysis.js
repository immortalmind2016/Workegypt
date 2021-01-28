import {
  ADMIN_GET_ANALYSIS_START,
  ADMIN_GET_ANALYSIS_SUCCESS,
  ADMIN_GET_ANALYSIS_FAILURE,
} from "../../types";
import axios from "axios";
import { uris } from "../../../config";

export const adminGetAnalysis = () => async dispatch => {
  dispatch({
    type: ADMIN_GET_ANALYSIS_START,
  });
  axios
    .get(uris.admin.getAnalysis)
    .then(({ data }) => {
      if (!data) return dispatch({ type: ADMIN_GET_ANALYSIS_FAILURE });
      dispatch({
        type: ADMIN_GET_ANALYSIS_SUCCESS,
        payload: data.analysis,
      });
    })
    .catch(() => {
      dispatch({
        type: ADMIN_GET_ANALYSIS_FAILURE,
      });
    });
};
