import axios from "axios";
import { uris } from "../config";
export const generateCode = async () =>
  await axios.get(uris.interview.generate);

export const validateCode = async (code) =>
  await axios.post(uris.interview.validate, { code });
