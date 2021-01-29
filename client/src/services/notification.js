import axios from "axios";
import { uris } from "../config";
export const markAsRead = async (notificationId) =>
  await axios.put(uris.notification.markAsRead, {
    _id: notificationId,
  });

export const createNotification = async (notifData = {}) =>
  await axios.post(uris.notification.create, { ...notifData });
