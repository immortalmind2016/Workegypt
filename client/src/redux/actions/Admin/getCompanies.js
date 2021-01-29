import Axios from "axios";
import { uris } from "../../../config";
import {
  FETCH_COMPANIES_START,
  FETCH_COMPANIES_SUCCESS,
  FETCH_COMPANIES_FAILURE,
} from "../../types";

export const getCompanies = (
  pageNumber = 0,
  searchBy = "name",
  searchText = ""
) => (dispatch) => {
  dispatch({ type: FETCH_COMPANIES_START });
  Axios.get(
    `${uris.admin.getCompanies}/${pageNumber}?searchBy=${searchBy}&searchText=${searchText}`
  )
    .then(({ data }) => {
      dispatch({ type: FETCH_COMPANIES_SUCCESS, payload: data });
    })
    .catch(() => {
      dispatch({ type: FETCH_COMPANIES_FAILURE });
    });
};
