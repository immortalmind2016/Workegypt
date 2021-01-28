import Axios from "axios";
import { uris } from "../config";

export const setMaintenanceMode = async (mode) =>
  await Axios.post(uris.admin.websiteMode, {
    mode,
  });
