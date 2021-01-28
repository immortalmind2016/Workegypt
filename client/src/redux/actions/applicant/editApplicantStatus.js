import {
  EDIT_APPLICANT_STATUS_START,
  EDIT_APPLICANT_STATUS_SUCCESS,
  EDIT_APPLICANT_STATUS_FAILURE
} from "../../types";
import { uris } from "../../../config";
import Axios from "axios";

export const editApplicantStatus = (jobId, applicantId, status) => dispatch => {
  if (!jobId) {
    console.error("job Id is not received by editApplicantStatus action");
    return;
  }
  if (!applicantId) {
    console.error("applicantId  is not received by editApplicantStatus action");
    return;
  }

  if (!status) {
    console.error("status  is not received by editApplicantStatus action");
    return;
  }

  dispatch({
    type: EDIT_APPLICANT_STATUS_START
  });
  Axios.put(uris.applicant.editStatus + jobId + "/" + applicantId, {
    data: { status }
  })
    .then(({ data }) => {
      dispatch({
        type: EDIT_APPLICANT_STATUS_SUCCESS,
        payload: ""
      });
    })
    .catch(e => {
      console.log(e);
      dispatch({
        type: EDIT_APPLICANT_STATUS_FAILURE
      });
    });
};
