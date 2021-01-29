import {
  FETCH_JOB_APPLICANTS_START,
  FETCH_JOB_APPLICANTS_SUCCESS,
  FETCH_JOB_APPLICANTS_FAILURE
} from "../../types";
import { uris } from "../../../config";
import Axios from "axios";

export const fetchJobApplicants = jobId => dispatch => {
  if (!jobId) {
    console.error("jobId is not provided to fetchJobApplicants");
    return;
  }
  dispatch({
    type: FETCH_JOB_APPLICANTS_START
  });
  Axios.get(uris.job.getJobApplicants + jobId)
    .then(({ data }) => {
      dispatch({
        type: FETCH_JOB_APPLICANTS_SUCCESS,
        payload: data.job.applicants
      });
    })
    .catch(e => {
      console.log(e);
      dispatch({
        type: FETCH_JOB_APPLICANTS_FAILURE
      });
    });
};
