import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editUserData } from "../../redux/actions";
const bcrypt = require('bcryptjs');
const Settings = () => {
  //redux settings
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.userData);
  const userIsEditing = useSelector(state => state.user.userIsEditing);
  //component settings

  const [accountSettings, setAccountSettings] = useState({
    name: "",
    password: "",
    password2: "",
    oldPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [isAlerting, setAlert] = useState(false);
  const [error, setError] = useState("");
  const onAccountSettingsSave = e => {
    e.preventDefault();
    const ac = { ...accountSettings };
    if (ac.password !== ac.password2) {
      setError("password does not match confirmation!");
      return;
    }
    if (ac.password && ac.password.length < 6) {
      setError("password cannot be less than 6 characters!");
      return;
    }
    if (ac.oldPassword !== user.password) {
      bcrypt.compare(ac.oldPassword, user.password)
      .then(isMatch => {
        if (isMatch) {
          console.log("success");
        }
        setError("old password incorrect!");
         return;
      });
    }
    //dispatch(editUserData({ name: ac.name, password: ac.password }));
    dispatch(editUserData({  password: ac.password }));
    setLoading(true);
    localStorage.removeItem("forgotPassword");
  };
  const onChangeHandler = ({ target }) => {
    setAccountSettings({
      ...accountSettings,
      [target.name]: target.value
    });
  };

  useEffect(() => {
    setAccountSettings({
      name: user.name
    });
  }, [user]);
  useEffect(() => {
    if (loading === true && userIsEditing === false) {
      setLoading(false);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
  }, [userIsEditing, loading]);
  return (
    <div className="setting avoid-navbar pt-5">
      <div className="container">
        <h6 className="mb-4">Settings</h6>
        <div className="card bg-light mb-3" style={{ maxWidth: "80rem" }}>
          <div className="card-header">Account settings</div>
          <div className="card-body">
            <h5 className="card-title mb-4">change username </h5>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={onAccountSettingsSave}>
              <input
                type="text"
                name="name"
                onChange={onChangeHandler}
                value={accountSettings.name}
                className="form-control mb-4 "
                placeholder="username.."
                required
              />

              <input
                type="password"
                name="oldPassword"
                onChange={onChangeHandler}
                value={accountSettings.oldPassword}
                className="form-control mb-4 "
                placeholder="old password.."
                required
              />
              <h5 className="card-title mb-4">change password </h5>

              <input
                type="password"
                name="password"
                onChange={onChangeHandler}
                value={accountSettings.password}
                className="form-control mb-4 "
                placeholder="password"
              />
              <input
                type="password"
                name="password2"
                onChange={onChangeHandler}
                value={accountSettings.password2}
                className="form-control mb-4 "
                placeholder="confirm password"
              />
              <button
                className="btn btn-dark"
                type="submit"
                style={{ minWidth: 100 }}
                disabled={loading}
              >
                {loading ? (
                  <span
                    className="spinner-border text-light spinner-sm"
                    role="status"
                  ></span>
                ) : (
                  "Save"
                )}
              </button>
            </form>
          </div>
        </div>
        {isAlerting && (
          <div className="alert alert-success text-center">
            Saved successfully
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
