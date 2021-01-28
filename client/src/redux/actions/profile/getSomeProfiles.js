import { uris } from "../../../config";
import axios from "axios";
import {
  GET_SOME_PROFILES_START,
  GET_SOME_PROFILES_SUCCESS,
  GET_SOME_PROFILES_FAILURE,
} from "../../types";

export const getSomeProfiles = (
  currentPaginationIndex,
  queryString = ""
) => dispatch => {
  dispatch({
    type: GET_SOME_PROFILES_START,
  });

  axios
    .get(uris.profile.getSomeProfiles + currentPaginationIndex + queryString)
    .then(({ data }) => {
      dispatch({
        type: GET_SOME_PROFILES_SUCCESS,
        payload: { profiles: data.profiles, totalResults: data.totalResults },
      });
    })
    .catch(err => {
      dispatch({
        type: GET_SOME_PROFILES_FAILURE,
      });
      console.log(err);
    });
};
