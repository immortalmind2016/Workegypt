import Axios from "axios";
import { uris } from "../../../config";

export const resendConfirmation = email => {
  Axios.post(uris.user.confirmPassword, { data: { email } })
    .then(({ data }) => "")
    .then(error => console.log(error));
};
