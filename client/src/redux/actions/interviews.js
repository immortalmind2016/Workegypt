import { SET_INTERVIEW_CODE, REMOVE_INTERVIEW_CODE } from "../types";
export const setInterviewCode = (code) => (dispatch) => {
  dispatch({
    type: SET_INTERVIEW_CODE,
    payload: code,
  });
};
export const removeInterviewCode = () => (dispatch) => {
  dispatch({
    type: REMOVE_INTERVIEW_CODE,
  });
};
