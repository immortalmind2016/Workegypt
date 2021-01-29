import {
  CREATE_CONVERSATION_START,
  CREATE_CONVERSATION_SUCCESS,
  CREATE_CONVERSATION_FAILURE,
} from "../../types";

import axios from "axios";
import { uris } from "../../../config";

export const createConversation = (remoteUserId) => (dispatch) => {
  dispatch({
    type: CREATE_CONVERSATION_START,
  });
  axios
    .post(uris.chat.createConversation + remoteUserId)
    .then(({ data, status }) => {
      console.log(data, status);
      /* if (!data?.messages)
        return dispatch({
          type: CREATE_CONVERSATION_FAILURE,
        });
      dispatch({
        type: CREATE_CONVERSATION_SUCCESS,
        payload: data?.messages || [],
      }); */
    })
    .catch((e) =>
      dispatch({
        type: CREATE_CONVERSATION_FAILURE,
      })
    );
};
