import {
  EDIT_JOB_FAILURE,
  EDIT_JOB_START,
  EDIT_JOB_SUCCESS
} from "../../types";
import { uris } from "../../../config";
import Axios from "axios";

export const editJob = (jobId, newJob) => dispatch => {
  if (!jobId) {
    console.error("job Id is not received by editJob action");
    return;
  }
  if (!newJob) {
    console.error("newJob  is not received by editJob action");
    return;
  }

  dispatch({
    type: EDIT_JOB_START
  });
  Axios.put(uris.job.editJob + jobId, { data: { ...newJob } })
    .then(({ data }) => {
      dispatch({
        type: EDIT_JOB_SUCCESS,
        payload: {
          newJob: { ...data.job },
          jobId
        }
      });
    })
    .catch(e => {
      console.log(e);
      dispatch({
        type: EDIT_JOB_FAILURE
      });
    });
};
