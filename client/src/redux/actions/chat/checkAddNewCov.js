import { CHECK_AND_ADD_NEW_CONVERSATION } from "../../types";
export const checkAddNewConv = (conversation) => ({
  type: CHECK_AND_ADD_NEW_CONVERSATION,
  payload: conversation,
});
