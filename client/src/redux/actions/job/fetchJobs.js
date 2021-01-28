import {
  FETCH_JOBS_FAILURE,
  FETCH_JOBS_START,
  FETCH_JOBS_SUCCESS,
} from "../../types";
import { uris } from "../../../config";
import Axios from "axios";

export const fetchJobs = (pageNumber = 0, queryText = "") => dispatch => {
  dispatch({
    type: FETCH_JOBS_START,
  });
  Axios.get(uris.job.getAllJobs + pageNumber + queryText)
    .then(({ data }) => {
      dispatch({
        type: FETCH_JOBS_SUCCESS,
        payload: { jobs: data.jobs, totalResults: data.totalResults },
      });
    })
    .catch(e => {
      console.error(e);
      dispatch({
        type: FETCH_JOBS_FAILURE,
      });
    });
};
