import {
  GET_UNREAD_NOTIFICATIONS_FAILURE,
  GET_UNREAD_NOTIFICATIONS_START,
  GET_UNREAD_NOTIFICATIONS_SUCCESS,
} from "../../types";
import axios from "axios";
import { uris } from "../../../config";
export const getUnreadNotifications = () => (dispatch) => {
  dispatch({ type: GET_UNREAD_NOTIFICATIONS_START });
  axios
    .get(uris.notification.getUnread)
    .then(({ data }) => {
      console.log(data);
      dispatch({
        type: GET_UNREAD_NOTIFICATIONS_SUCCESS,
        payload: data.notifications,
      });
    })
    .catch((err) => dispatch({ type: GET_UNREAD_NOTIFICATIONS_FAILURE }));
};
