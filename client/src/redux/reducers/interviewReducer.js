import { SET_INTERVIEW_CODE, REMOVE_INTERVIEW_CODE } from "../types";
const initialState = {
  interviewCode: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_INTERVIEW_CODE: {
      return { ...state, interviewCode: payload };
    }
    case REMOVE_INTERVIEW_CODE: {
      return { ...state, interviewCode: null };
    }

    default:
      return state;
  }
};
