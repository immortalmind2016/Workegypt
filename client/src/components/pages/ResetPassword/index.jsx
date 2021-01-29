import React, { useEffect, useState } from "react";
import qs from "query-string";
import { Redirect, useLocation } from "react-router-dom";
import { resetPassword } from "../../../services/user";
const ResetPassword = () => {
  const location = useLocation();
  const [redirect, setRedirect] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const _handleSubmit = (e) => {
    e.preventDefault();
    const query = qs.parse(location.search);

    if (newPassword !== newPasswordConfirm)
      return setError("Password does not match confirmation!");

    setError("");
    setLoading(true);
    resetPassword(newPassword, query.token)
      .then(() => setRedirect(true))
      .catch((e) => {
        setLoading(false);
        setError("Failed, Please try again !");
      });
  };

  useEffect(() => {
    const query = qs.parse(location.search);
    if (!query?.token) setRedirect(true);
    else {
      console.log(query.token);
    }
  }, []);
  if (redirect) return <Redirect to="/" />;
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ width: "100vw", height: "100vh" }}
    >
      <form
        className="card"
        style={{ minWidth: 300, width: "50vw", borderRadius: 10 }}
        onSubmit={_handleSubmit}
      >
        <h2 className="card-header">Reset password - WorkEgypt</h2>
        <div className="card-body">
          <div className="form-group">
            <label for="newPass">New password</label>
            <input
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              className="general-input w-100"
              id="newPass"
              placeholder="New Password"
            />
          </div>
          <div className="form-group">
            <label for="newPassConfirm">New password confirm</label>
            <input
              value={newPasswordConfirm}
              onChange={(e) => setNewPasswordConfirm(e.target.value)}
              required
              type="password"
              className="general-input w-100"
              id="newPassConfirm"
              placeholder="Confirm password"
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button disabled={loading} className="btn btn-block btn-primary mt-5">
            {loading ? (
              <span className="spinner-border text-light"></span>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
