import React from "react";
import { useState } from "react";
/* comment */
function AdminSettings() {
  const [adminData, setAdminData] = useState({
    username: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState("");
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setAdminData((prevAdminData) => ({ ...prevAdminData, [name]: value }));
  };
  const saveChanges = () => {
    for (let key in adminData) {
      if (!adminData[key] || adminData[key]?.toString().trim() === "") {
        setError("Please fill in all fields!");
        return;
      }
    }

    setError("");
    //send request below
    //
  };
  return (
    <div className="flex-centered flex-column" style={{ height: "100vh" }}>
      <p className="mb-4" style={{ color: "#777" }}>
        Change Admin Email Setting
      </p>
      <input
        placeholder="username"
        autoComplete="off"
        className="general-input py-2 mb-3"
        name="username"
        onChange={onChangeHandler}
        value={adminData.username}
        required
        type="text"
        style={{ minWidth: "300px" }}
      />
      <input
        placeholder="old password"
        className="general-input py-2 mb-3"
        autoComplete="off"
        name="oldPassword"
        onChange={onChangeHandler}
        value={adminData.oldPassword}
        required
        type="password"
        style={{ minWidth: "300px" }}
      />
      <input
        placeholder="new password"
        className="general-input py-2 mb-3"
        autoComplete="off"
        name="newPassword"
        onChange={onChangeHandler}
        value={adminData.newPassword}
        required
        type="password"
        style={{ minWidth: "300px" }}
      />
      <input
        placeholder="confirm new password"
        className="general-input py-2 mb-3"
        autoComplete="off"
        name="confirmNewPassword"
        onChange={onChangeHandler}
        value={adminData.confirmNewPassword}
        required
        type="confirmNewPassword"
        style={{ minWidth: "300px" }}
      />

      <button
        className="btn btn-primary"
        style={{ minWidth: 300 }}
        onClick={saveChanges}
      >
        Save Changes
      </button>
      {error && <p className="text-danger mt-4">{error}</p>}
    </div>
  );
}

export default AdminSettings;
