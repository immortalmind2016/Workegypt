import {
  GET_APPLICANTS_START,
  GET_APPLICANTS_SUCCESS,
  GET_APPLICANTS_FAILURE
} from "../../types";
import { uris } from "../../../config";
import Axios from "axios";
export const getApplicants = jobId => dispatch => {
  if (!jobId) {
    console.error("job Id is not received by getApplicants action");
    return;
  }

  dispatch({
    type: GET_APPLICANTS_START
  });
  Axios.get(uris.applicant.getApplicants + jobId, {})
    .then(({ data }) => {
      dispatch({
        type: GET_APPLICANTS_SUCCESS,
        payload: data.job.applicants
      });
    })
    .catch(e => {
      console.log(e);
      dispatch({
        type: GET_APPLICANTS_FAILURE
      });
    });
};
