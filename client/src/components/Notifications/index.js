import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { GET_UNREAD_NOTIFICATIONS_SUCCESS } from "../../redux/types";
import { markAsRead } from "../../services/notification";
const NotificationItem = ({ notf, _handleRead }) => {
  const { notificationType: type, isRead, job, title, body, url } = notf;
  let content = null;

  if (type === "job") {
    content = (
      <Link style={{ textDecoration: "none" }} to={`/job/${job}`}>
        <div
          className={`notification-item dropdown-item ${!isRead && "unread"}`}
        >
          <h5>{title}</h5>
          <p>{body}</p>
        </div>
      </Link>
    );
  } else if (type === "url") {
    content = (
      <a href={url} style={{ textDecoration: "none" }} target="_blank">
        <div
          className={`notification-item dropdown-item ${!isRead && "unread"}`}
        >
          <h5>{title}</h5>
          <p>{body}</p>
        </div>
      </a>
    );
  } else {
    content = (
      <div
        className={`notification-item dropdown-item  ${!isRead && "unread"}`}
        style={{ cursor: "default" }}
      >
        <h5>{title}</h5>
        <p>{body}</p>
      </div>
    );
  }

  return (
    <>
      <div
        className="navbar-item p-2"
        onClick={() => {
          if (!!notf._id) {
            _handleRead(notf._id);
          } else {
            _handleRead(notf.notificationId);
          }
        }}
      >
        {content}
      </div>
      <div className="dropdown-divider" />
    </>
  );
};

const Notifications = ({ notfs = [] }) => {
  const dispatch = useDispatch();
  const _handleRead = async (id) => {
    try {
      await markAsRead(id);
      const newNotfs = notfs.filter((notf) => notf._id !== id);
      dispatch({
        type: GET_UNREAD_NOTIFICATIONS_SUCCESS,
        payload: newNotfs,
      });
    } catch (error) {}
  };
  return (
    <div className="relative-container">
      <a
        type="button"
        data-toggle="dropdown"
        data-display="static"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <img src="/images/bell.svg" alt="bell" />
        {notfs.length > 0 && (
          <span className="badge badge-danger notification-badge">
            {notfs.length}
          </span>
        )}
      </a>
      <div className="dropdown-menu notification-dropdown">
        {notfs.length <= 0 && (
          <h3 className="text-center mt-5">No available notifications</h3>
        )}
        {notfs.map((notf, key) => (
          <NotificationItem
            key={notf.title + notf.body + key}
            notf={notf}
            _handleRead={_handleRead}
          />
        ))}
      </div>
    </div>
  );
};

export default Notifications;
