import {
  FETCH_USER_JOBS_START,
  FETCH_USER_JOBS_SUCCESS,
  FETCH_USER_JOBS_FAILURE
} from "../../types";
import { uris } from "../../../config";
import Axios from "axios";

export const fetchUserJobs = companyId => dispatch => {
  dispatch({
    type: FETCH_USER_JOBS_START
  });
  Axios.get(uris.job.getCompanyJobs + companyId)
    .then(({ data }) => {
      dispatch({
        type: FETCH_USER_JOBS_SUCCESS,
        payload: data.jobs.reverse()
      });
    })
    .catch(e => {
      console.log(e);
      dispatch({
        type: FETCH_USER_JOBS_FAILURE
      });
    });
};
