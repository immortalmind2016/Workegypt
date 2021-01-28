import {
  OPEN_CONTACT_START,
  OPEN_CONTACT_SUCCESS,
  OPEN_CONTACT_FAILURE,
} from "../../types";
import Axios from "axios";
import { uris } from "../../../config";
export const openContact = (userId) => (dispatch) => {
  dispatch({ type: OPEN_CONTACT_START });
  if (!userId) return console.log("userId has to be provided");
  Axios.post(uris.company.openContact, { data: { id: userId } })
    .then(({ data }) => {
      console.log(data);
      if (data)
        dispatch({
          type: OPEN_CONTACT_SUCCESS,
        });
      else
        dispatch({
          type: OPEN_CONTACT_FAILURE,
        });
    })
    .catch((e) => {
      console.log(e);
      dispatch({
        type: OPEN_CONTACT_FAILURE,
      });
    });
};
