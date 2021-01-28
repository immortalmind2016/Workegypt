import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../redux/actions";
function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const admin = useSelector(state => state.admin);
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(adminLogin(username, password));
  };

  useEffect(() => {
    if (admin.loaders.login === true) setLoading(true);
    else if (admin.loaders.login === false) {
      setLoading(false);
    } else if (admin.loaders.login === undefined) setLoading(undefined);
  }, [admin.loaders.login]);
  return (
    <form
      className="d-flex justify-content-center align-items-center flex-column pt-5"
      style={{ height: "90vh" }}
      onSubmit={handleSubmit}
    >
      <h1 className="text-center display-4">
        <span
          style={{
            color: "#3c82d8",
          }}
        >
          WorkEgypt
        </span>{" "}
        Dashboard Access
      </h1>

      <div
        className="main-card-layout p-4"
        style={{ maxWidth: 500, minWidth: 400, margin: "auto" }}
      >
        <h1 className="text-center mb-5">Admin Login</h1>
        <div className="form-group">
          <label htmlFor="admin-username">Admin Username:</label>
          <input
            id="admin-username"
            className="form-control"
            placeholder="Admin username..."
            style={{ height: 40, borderRadius: "1rem " }}
            value={username}
            type="text"
            required
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="admin-password">Admin password:</label>
          <input
            id="admin-password"
            className="form-control"
            type="password"
            style={{ height: 40, borderRadius: "1rem " }}
            placeholder="Admin Password..."
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        {loading === undefined && (
          <span className="text-danger">
            Login Failed Please Make sure Username and Password are correct!
          </span>
        )}
        <hr />
        <button
          type="submit"
          disabled={!!loading}
          className="btn btn-primary btn-block"
        >
          {loading === true ? "Loading..." : "Login"}
        </button>
      </div>
    </form>
  );
}

export default AdminLogin;
