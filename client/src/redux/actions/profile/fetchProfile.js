import { uris } from "../../../config";
import Axios from "axios";
import {
  FETCH_PROFILE,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE
} from "../../types";
export const fetchProfile = (
  userType,
  id,
  isViewingProfile = false
) => dispatch => {
  dispatch({
    type: FETCH_PROFILE
  });
  const reqUri = !userType
    ? uris.profile.getApplicant
    : uris.profile.getCompany;
  Axios.get(reqUri + "/" + id, {
    timeout: 999999,
    headers: {
      Authorization: localStorage.token
    }
  })
    .then(({ data }) => {
      dispatch({
        type: FETCH_PROFILE_SUCCESS,
        payload: { profile: { ...data.profile }, isViewingProfile }
      });
    })
    .catch(e => {
      dispatch({ type: FETCH_PROFILE_FAILURE });

      console.error("fetching profile data error! ", e);
    });
};
