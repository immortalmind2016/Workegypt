import Axios from "axios";
import { uris } from "../../../config";
import {
  ADD_QUESTION_START,
  ADD_QUESTION_SUCCESS,
  ADD_QUESTION_FAILURE
} from "../../types";

export const addQuestion = (jobId, question) => dispatch => {
  dispatch({
    type: ADD_QUESTION_START
  });
  Axios.post(uris.quiz.addQuestion + jobId, { data: { question } })
    .then(({ data }) => {
      dispatch({
        type: ADD_QUESTION_SUCCESS,
        payload: data.job.quiz
      });
    })
    .catch(e => {
      console.error(e);
      dispatch({
        type: ADD_QUESTION_FAILURE
      });
    });
};
