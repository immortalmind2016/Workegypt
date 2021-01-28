import { GET_JOB_FAILURE, GET_JOB_START, GET_JOB_SUCCESS } from "../../types";
import { uris } from "../../../config";
import Axios from "axios";

export const getJob = jobId => dispatch => {
  if (!jobId) {
    console.error("job Id is not received by getJob action");
    return;
  }
  dispatch({
    type: GET_JOB_START
  });
  Axios.get(uris.job.getJob + jobId)
    .then(({ data }) => {
      dispatch({
        type: GET_JOB_SUCCESS,
        payload: data
      });
    })
    .catch(e => {
      console.log(e);
      dispatch({
        type: GET_JOB_FAILURE
      });
    });
};
