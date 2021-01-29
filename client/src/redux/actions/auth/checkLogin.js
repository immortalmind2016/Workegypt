import isEmpty from "../../../utils/isEmpty";
import { TOKEN_INVALID, TOKEN_VALID } from "../../types";

export const checkLogin = () => {
  const token = localStorage.getItem("token");
  if (!isEmpty(token)) {
    return {
      type: TOKEN_VALID
    };
  } else {
    return {
      type: TOKEN_INVALID
    };
  }
};
