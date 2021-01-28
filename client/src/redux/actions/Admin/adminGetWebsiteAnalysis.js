import {
  ADMIN_GET_ANALYSIS_WEBSITE_START,
  ADMIN_GET_ANALYSIS_WEBSITE_SUCCESS,
  ADMIN_GET_ANALYSIS_WEBSITE_FAILURE,
} from "../../types";
import axios from "axios";
import { uris } from "../../../config";

export const adminGetWebsiteAnalysis = () => async (dispatch) => {
  dispatch({
    type: ADMIN_GET_ANALYSIS_WEBSITE_START,
  });
  axios
    .get(uris.admin.getWebsiteAnalysis)
    .then(({ data }) => {
      if (!data) return dispatch({ type: ADMIN_GET_ANALYSIS_WEBSITE_FAILURE });
      dispatch({
        type: ADMIN_GET_ANALYSIS_WEBSITE_SUCCESS,
        payload: data.analysis,
      });
    })
    .catch(() => {
      dispatch({
        type: ADMIN_GET_ANALYSIS_WEBSITE_FAILURE,
      });
    });
};
