import Axios from "axios";
import { uris } from "../config";

export const resetPassword = async (newPassword, token) =>
  await Axios.post(uris.user.resetPassword, {
    newPassword,
    token,
  });
