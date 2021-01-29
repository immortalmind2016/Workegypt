import {
  CREATE_JOB_FAILURE,
  CREATE_JOB_START,
  CREATE_JOB_SUCCESS
} from "../../types";
import { uris } from "../../../config";
import Axios from "axios";

export const createJob = newJob => dispatch => {
  if (!newJob) {
    console.error("new job is not received by createJob action");
    return;
  }
  dispatch({
    type: CREATE_JOB_START
  });
  Axios.post(uris.job.createJob, { data: { ...newJob } })
    .then(({ data }) => {
      dispatch({
        type: CREATE_JOB_SUCCESS,
        payload: data.job
      });
    })
    .catch(e => {
      console.log(e);
      dispatch({
        type: CREATE_JOB_FAILURE
      });
    });
};
