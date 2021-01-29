import {
  GET_APPLIED_JOBS_START,
  GET_APPLIED_JOBS_SUCCESS,
  GET_APPLIED_JOBS_FAILURE
} from "../../types";
import { uris } from "../../../config";
import Axios from "axios";
export const getAppliedJobs = () => dispatch => {
  dispatch({
    type: GET_APPLIED_JOBS_START
  });
  Axios.get(uris.applicant.getAppliedJobs)
    .then(({ data }) => {
      dispatch({
        type: GET_APPLIED_JOBS_SUCCESS,
        payload: data.jobs
      });
    })
    .catch(e => {
      console.log(e);
      dispatch({
        type: GET_APPLIED_JOBS_FAILURE
      });
    });
};
