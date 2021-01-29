import {
  GET_CONVERSATION_START,
  GET_CONVERSATION_SUCCESS,
  GET_CONVERSATION_FAILURE,
} from "../../types";
import { uris } from "../../../config";
import axios from "axios";
export const getConversation = (remoteUserID) => (dispatch) => {
  dispatch({
    type: GET_CONVERSATION_START,
  });
  axios
    .get(uris.chat.getConversation + remoteUserID)
    .then(({ data }) => {
      dispatch({
        type: GET_CONVERSATION_SUCCESS,
        payload: data || {},
      });
    })
    .catch((e) => {
      console.log(e);
      dispatch({
        type: GET_CONVERSATION_FAILURE,
      });
    });
};
