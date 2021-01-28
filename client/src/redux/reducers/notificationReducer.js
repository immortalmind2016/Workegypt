import {
  GET_UNREAD_NOTIFICATIONS_START,
  GET_UNREAD_NOTIFICATIONS_SUCCESS,
} from "../types";

const initialState = {
  unread: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_UNREAD_NOTIFICATIONS_SUCCESS: {
      return { ...state, unread: payload };
    }

    default:
      return state;
  }
};
