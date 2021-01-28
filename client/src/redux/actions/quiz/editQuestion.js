import Axios from "axios";
import { uris } from "../../../config";
import {
  EDIT_QUESTION_START,
  EDIT_QUESTION_SUCCESS,
  EDIT_QUESTION_FAILURE
} from "../../types";

export const editQuestion = (
  jobId,
  questionId,
  questionIndex,
  question
) => dispatch => {
  dispatch({
    type: EDIT_QUESTION_START
  });
  Axios.post(uris.quiz.editQuestion + jobId + "/" + questionId, {
    data: { id: questionIndex, ...question }
  })
    .then(({ data }) => {
      dispatch({
        type: EDIT_QUESTION_SUCCESS,
        payload: ""
      });
    })
    .catch(e => {
      console.error(e);
      dispatch({
        type: EDIT_QUESTION_FAILURE
      });
    });
};
