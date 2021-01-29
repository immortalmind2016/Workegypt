import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import { getUnreadNotifications } from "../../redux/actions";
import recMsgSound from "../../assets/message_sound.mp3";
import { socket } from "../../index";
import { setTextFilter } from "../../redux/actions";
import Notifications from "../Notifications";
import { GET_UNREAD_NOTIFICATIONS_SUCCESS } from "../../redux/types";
const planToColor = {
  gold: "#B5A900",
  silver: "#949494",
  plat: "#31B4C9",
  none: "#FF6600",
};
const NavbarUser = ({
  img = "",
  name = "user name",
  _logout,
  profession = "profession",
  type,
}) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchInputText, setSearchInputText] = useState("");
  const [loadingUnreadNotf, setLoadingUnreadNotf] = useState(true);
  const notf = useSelector((state) => state.notf);
  const user = useSelector((state) => state.user.userData);
  const profileData = useSelector((state) => state.profile.profileData);
  const currentPayPlan = profileData?.subscribe?.type
    ? profileData.subscribe?.type
    : "none";
  let planText = currentPayPlan;
  if (planText === "plat") planText = "Platinum";
  if (planText === "none") planText = "No plan";
  const currentCount = profileData?.subscribe?.count
    ? profileData.subscribe.count
    : "0";
  const [recMsg, setRecMsg] = useState(null);
  const [playSound, setPlaySound] = useState(false);

  useEffect(() => {
    setRecMsg(false);
    if (!location?.pathname?.toString()?.includes("chat")) {
      socket.on("NewMessage", ({ message }) => {
        console.log(message);
        if (message?.info?.to === user?._id) {
          setPlaySound(true);
          setRecMsg(true);
        }
      });
    }

    socket.on("notification", (data) => {
      const newNotifs = [data, ...notf.unread];
      dispatch({
        type: GET_UNREAD_NOTIFICATIONS_SUCCESS,
        payload: newNotifs,
      });
    });
  }, [setRecMsg, location, socket, notf]);

  useEffect(() => {
    if (loadingUnreadNotf === true) {
      dispatch(getUnreadNotifications());
    }
  }, [dispatch, loadingUnreadNotf, getUnreadNotifications]);

  const searchForJobs = (e) => {
    e.preventDefault();
    dispatch(setTextFilter(searchInputText));
  };
  if (location.pathname === "/interview/room" || location.pathname === "/reset")
    return null;
  return (
    <nav className="navbar navbar-expand-md  bg-light navbar-user  relative-container">
      {playSound && (
        <audio
          src={recMsgSound}
          autoPlay
          hidden
          onEnded={() => setPlaySound(false)}
        />
      )}
      <div className="navbar-brand d-flex align-items-center" href="/#">
        <Link
          to="/"
          className="link-unstyled"
          style={{ color: "#FFF", fontWeight: "bold" }}
        >
          <img className="mr-2" src="/images/Logo.svg" alt="Logo" />
          WorkEgypt
        </Link>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarUser"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        style={{ outline: "none" }}
      >
        <i className="fas fa-bars text-light" />
      </button>

      <div className="collapse navbar-collapse" id="navbarUser">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                exact
                to="/jobs"
              >
                Jobs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeclassname="active"
                exact
                to="/blog"
              >
                Blog
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeclassname="active"
                exact
                to="/events"
              >
                Events
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                exact
                to="/contact"
              >
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" activeclassname="active" href="/privacy">
                Privacy
              </a>
            </li>

            <form className="form-inline" onSubmit={searchForJobs}>
              <div
                className={`relative-container search-box-container ${
                  location.pathname !== "/jobs" && "invisible"
                }`}
              >
                <input
                  className="form-control mr-sm-2"
                  type="text"
                  placeholder="Search for jobs"
                  aria-label="Search"
                  value={searchInputText}
                  onChange={(e) => setSearchInputText(e.target.value)}
                />

                <button className="btn--icon search-button" type="submit">
                  <img
                    src="/images/magnifying-glass-browser.svg"
                    alt="search"
                  />
                </button>
              </div>
            </form>

            <div className="navbar-user__data">
              <div className="navbar-user__data__info">
                <a
                  className="link-unstyled"
                  href="/#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div
                    className="mr-2 responsive_img_container rounded-circle"
                    style={{
                      width: 35,
                      height: 35,
                      padding: 2,
                      border: "1px solid #999",
                    }}
                  >
                    <img className="rounded-circle" src={img} alt="" />
                  </div>
                </a>
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <div className="relative-container">
                    <a
                      className="link-unstyled text-light"
                      href="/#"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <h6>{name}</h6>
                    </a>

                    <span
                      className="dropdown"
                      style={{
                        position: "absolute",
                        right: "0",
                        top: "1.5rem",
                      }}
                    >
                      <a
                        className="dropdown-toggle"
                        href="/#"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <></>
                      </a>

                      <div
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <a
                          className="dropdown-item bg-secondary dropdown-header disabled"
                          href="/#"
                        >
                          {profession}
                        </a>

                        <Link to={"/profile"} className="dropdown-item">
                          <i className="fas fa-user"></i>
                          Profile
                        </Link>
                        <Link to={"/interview/join"} className="dropdown-item">
                          <i className="fas fa-handshake"></i>
                          Interviews
                        </Link>

                        {type ? (
                          <>
                            <Link className="dropdown-item" to="/our-jobs">
                              <i className="fas fa-briefcase"></i>
                              Our Jobs
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="/search-profiles"
                            >
                              <i className="fas fa-search"></i>
                              Search applicants
                            </Link>
                          </>
                        ) : (
                          <Link
                            className="dropdown-item"
                            to="/applied-jobs-history"
                          >
                            <i className="fas fa-briefcase"></i>
                            My Applications
                          </Link>
                        )}

                        <Link className="dropdown-item" to="/settings">
                          <i className="fas fa-cogs"></i>
                          settings
                        </Link>
                        <div className="dropdown-divider"></div>
                        <button
                          className="dropdown-item"
                          to="/"
                          onClick={(e) => {
                            e.preventDefault();

                            _logout(history);
                          }}
                        >
                          <i className="fas fa-sign-out-alt"></i>
                          Logout
                        </button>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
              <span className="vr-line mx-4"></span>
              <div className="navbar-user__data__notification">
                <div
                  className="relative-container"
                  onClick={() => {
                    history.push("/chat");
                    setRecMsg(false);
                  }}
                >
                  <img
                    className="mr-3"
                    src="/images/chat-speech-balloon.svg"
                    alt="chat"
                  />
                  <span
                    style={{
                      top: "-0.5rem",
                      right: "0.5rem",
                      fontSize: 8,
                    }}
                    className="badge badge-pill badge-danger notification-badge"
                  >
                    {recMsg === true && "new"}
                  </span>
                </div>
                <Notifications notfs={notf?.unread} />
              </div>
              {user?.type === true && (
                <p
                  className="badge badge-pill ml-2"
                  style={{
                    background: planToColor[currentPayPlan],
                    color: "#FFF",
                  }}
                >
                  {planText}&nbsp;{currentCount}
                </p>
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default NavbarUser;
