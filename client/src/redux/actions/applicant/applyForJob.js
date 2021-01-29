import {
  APPLY_FOR_JOB_START,
  APPLY_FOR_JOB_SUCCESS,
  APPLY_FOR_JOB_FAILURE
} from "../../types";
import { uris } from "../../../config";
import Axios from "axios";
export const applyForJob = (jobId, quiz_score, answers) => dispatch => {
  if (!jobId) {
    console.error("job Id is not received by applyForJob action");
    return;
  }

  if (!answers) {
    console.error("answers  is not received by applyForJob action");
    return;
  }

  dispatch({
    type: APPLY_FOR_JOB_START
  });
  Axios.post(uris.applicant.applyForJob + jobId, {
    data: { quiz_score, answers }
  })
    .then(req => {
      if (req.status === 200) {
        dispatch({
          type: APPLY_FOR_JOB_SUCCESS
        });
      } else {
        dispatch({
          type: APPLY_FOR_JOB_FAILURE
        });
      }
    })
    .catch(e => {
      console.log(e);
      dispatch({
        type: APPLY_FOR_JOB_FAILURE
      });
    });
};
