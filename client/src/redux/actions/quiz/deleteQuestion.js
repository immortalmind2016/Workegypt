import Axios from "axios";
import { uris } from "../../../config";
import {
  DELETE_QUESTION_START,
  DELETE_QUESTION_SUCCESS,
  DELETE_QUESTION_FAILURE
} from "../../types";

export const deleteQuestion = (jobId, id) => dispatch => {
  dispatch({
    type: DELETE_QUESTION_START
  });
  Axios.delete(uris.quiz.removeQuestion + jobId + "/" + id)
    .then(({ data }) => {
      dispatch({
        type: DELETE_QUESTION_SUCCESS,
        payload: id
      });
    })
    .catch(e => {
      console.error(e);
      dispatch({
        type: DELETE_QUESTION_FAILURE
      });
    });
};
