import {
  CANCEL_JOB_APPLICATION_START,
  CANCEL_JOB_APPLICATION_SUCCESS,
  CANCEL_JOB_APPLICATION_FAILURE
} from "../../types";
import { uris } from "../../../config";
import Axios from "axios";

export const cancelJobApplication = jobId => dispatch => {
  if (!jobId) {
    console.error("job Id is not received by editApplicantStatus action");
    return;
  }

  dispatch({
    type: CANCEL_JOB_APPLICATION_START
  });
  Axios.delete(uris.applicant.cancelJobApplication + jobId)
    .then(() => {
      dispatch({
        type: CANCEL_JOB_APPLICATION_SUCCESS,
        payload: jobId
      });
    })
    .catch(e => {
      console.log(e);
      dispatch({
        type: CANCEL_JOB_APPLICATION_FAILURE
      });
    });
};
