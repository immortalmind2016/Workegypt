import Axios from "axios";
import { uris } from "../../../config";
import {
  EDIT_PROFILE,
  EDIT_PROFILE_FAILURE,
  EDIT_PROFILE_SUCCESS
} from "../../types";

export const editProfile = (profileData, userType) => dispatch => {
  dispatch({
    type: EDIT_PROFILE
  });

  const reqUri = !userType
    ? uris.profile.editApplicant
    : uris.profile.editCompany;

  Axios.put(
    reqUri,
    {
      data: {
        ...profileData
      }
    },
    {
      timeout: 9999999,
      headers: {
        Authorization: localStorage.token
      }
    }
  )
    .then(({ data }) => {
      dispatch({
        type: EDIT_PROFILE_SUCCESS,
        payload: {
          userType,
          profile: data.profile
        }
      });
    })
    .catch(e => {
      console.error("edit applicant profile error! ", e);
      dispatch({
        type: EDIT_PROFILE_FAILURE
      });
    });
};
