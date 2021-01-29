import {
  DELETE_JOB_FAILURE,
  DELETE_JOB_START,
  DELETE_JOB_SUCCESS
} from "../../types";
import { uris } from "../../../config";
import Axios from "axios";

export const deleteJob = jobId => dispatch => {
  if (!jobId) {
    console.error("job Id is not received by deleteJob action");
    return;
  }

  dispatch({
    type: DELETE_JOB_START
  });
  Axios.delete(uris.job.deleteJob + jobId)
    .then(({ data }) => {
      dispatch({
        type: DELETE_JOB_SUCCESS,
        payload: jobId
      });
    })
    .catch(e => {
      console.log(e);
      dispatch({
        type: DELETE_JOB_FAILURE
      });
    });
};
