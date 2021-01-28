import { uris } from "../../../config";
import axios from "axios";
import {
  CHANGE_COMPANY_PLAN_FAILURE,
  CHANGE_COMPANY_PLAN_START,
  CHANGE_COMPANY_PLAN_SUCCESS,
} from "../../types";
export const changeCompanyPlan = (type, companyProfileId) => (dispatch) => {
  dispatch({
    type: CHANGE_COMPANY_PLAN_START,
  });
  axios
    .post(uris.admin.subscribeToPlan, { data: { type, companyProfileId } })
    .then(({ data }) => {
      if (data.done) {
        dispatch({ type: CHANGE_COMPANY_PLAN_SUCCESS });
      } else {
        dispatch({ type: CHANGE_COMPANY_PLAN_FAILURE });
      }
    })
    .catch((err) => dispatch({ type: CHANGE_COMPANY_PLAN_FAILURE }));
};
