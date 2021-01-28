import {
  FETCH_CONVERSATIONS_START,
  FETCH_CONVERSATIONS_SUCCESS,
  FETCH_CONVERSATIONS_FAILURE,
} from "../../types";
import axios from "axios";
import { uris } from "../../../config";

export const fetchConversations = () => (dispatch) => {
  dispatch({
    type: FETCH_CONVERSATIONS_START,
  });
  axios
    .get(uris.chat.fetchConversations, {
      timeout: 60000,
    })
    .then(({ data }) => {
      if (!data?.conversations)
        return dispatch({
          type: FETCH_CONVERSATIONS_FAILURE,
        });

      dispatch({
        type: FETCH_CONVERSATIONS_SUCCESS,
        payload: data?.conversations || [],
      });
    })
    .catch((e) => {
      dispatch({
        type: FETCH_CONVERSATIONS_FAILURE,
      });
    });
};
