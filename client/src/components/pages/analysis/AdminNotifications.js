import React, { useState } from "react";
import validator from "validator";
import { createNotification } from "../../../services/notification";
import isEmpty from "../../../utils/isEmpty";

const AdminNotifications = () => {
  const [notf, setNotf] = useState({
    title: "",
    body: "",
    to: "2",
    type: "info",
    url: "",
  });
  const [urlError, setUrlError] = useState(false);
  const [loading, setLoading] = useState(null);
  const _handleChange = (e) => {
    const { name, value } = e.target;
    setNotf((prevNotf) => ({ ...prevNotf, [name]: value }));
  };
  const _handleSubmit = (e) => {
    e.preventDefault();
    if (isEmpty(notf.title) || isEmpty(notf.body)) return;
    else if (notf.type === "url" && !validator.isURL(notf.url)) {
      setUrlError(true);
      return;
    }
    setUrlError(false);
    // if success
    let sentNotf = { ...notf, url: notf.type === "url" ? notf.url : undefined };
    setLoading(true);
    createNotification(sentNotf)
      .then(() => {
        setLoading(false);
      })
      .catch((e) => {
        setLoading(undefined);
      });
  };
  return (
    <div className="avoid-navbar admin-notifications">
      <h2>Create Notification</h2>
      <div className="card" style={{ borderRadius: 15 }}>
        <div className="card-body">
          <form onSubmit={_handleSubmit}>
            <div className="form-group mb-5">
              <label for="title">Title</label>
              <input
                type="text"
                name="title"
                value={notf.title}
                onChange={_handleChange}
                className="form-control"
                id="title"
                required
              />
            </div>
            <div className="form-group mb-5">
              <label for="body">Body</label>
              <textarea
                type="text"
                name="body"
                value={notf.body}
                onChange={_handleChange}
                className="form-control"
                id="body"
                required
              />
            </div>
            {notf.type === "url" && (
              <div className="form-group mb-5">
                <label for="url">Url</label>
                <input
                  type="url"
                  name="url"
                  value={notf.url}
                  onChange={_handleChange}
                  className={`form-control ${urlError ? "is-invalid" : ""}`}
                  id="title"
                />
                {urlError ? (
                  <small id="url" class="invalid-feedback">
                    Url is invalid
                  </small>
                ) : (
                  <small>opens when user click on notification</small>
                )}
              </div>
            )}
            <div className="form-group mb-5">
              <label for="type">Notification type</label>
              <select
                id="type"
                name="type"
                value={notf.type}
                onChange={_handleChange}
                className="form-control"
              >
                <option value="info">Information</option>
                <option value="url">With Url</option>
              </select>
            </div>
            <div className="form-group mb-5">
              <label for="sendTo">Send to</label>
              <select
                id="sendTo"
                name="to"
                value={notf.to}
                onChange={_handleChange}
                class="form-control"
              >
                <option value={0}>Applicants</option>
                <option value={1}>Companies</option>
                <option value={2}>All users</option>
              </select>
            </div>

            {loading === false && (
              <div
                class="alert alert-success alert-dismissible fade show my-4"
                role="alert"
              >
                Notification send successfully
                <button
                  type="button"
                  class="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )}
            {loading === undefined && (
              <div
                class="alert alert-danger alert-dismissible fade show my-4"
                role="alert"
              >
                Error sending notification! Please try again.
                <button
                  type="button"
                  class="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )}
            <button
              type="submit"
              style={{ minWidth: 100 }}
              className="btn btn-primary"
            >
              {loading ? (
                <span className="spinner-border" />
              ) : (
                "Send Notification"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminNotifications;
