import { ADD_NEW_MESSAGE } from "../../types";

export const addNewMsg = (message) => ({
  type: ADD_NEW_MESSAGE,
  payload: message,
});
