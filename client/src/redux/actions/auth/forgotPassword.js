import Axios from "axios";
import { uris } from "../../../config";

export const forgotPassword = email => {
  Axios.post(uris.user.forgotPassword, { data: { email } });
};
