import { uris } from "../../../config";
import Axios from "axios";
import {
  UPLOAD_CV_START,
  UPLOAD_CV_SUCCESS,
  UPLOAD_CV_FAILURE
} from "../../types";
export const fetchProfile = (
  userType,
  id,
  isViewingProfile = false
) => dispatch => {
  dispatch({
    type: UPLOAD_CV_START
  });

  Axios.post(uris.profile.uploadCv)
    .then(({ data }) => {
      dispatch({
        type: UPLOAD_CV_SUCCESS
      });
    })
    .catch(e => {
      dispatch({ type: UPLOAD_CV_FAILURE });
    });
};
