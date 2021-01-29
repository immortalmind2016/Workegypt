/**
 * @description
 * this component is used for visitors who are not yet authenticated as users i.e (not logged in)
 */
import React from "react";
import { NavLink, withRouter, Link, useLocation } from "react-router-dom";
const NavbarGuest = (props) => {
  const location = useLocation();

  if (location.pathname === "/reset") return null;
  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light navbar-guest ${
        props.location.pathname !== "/" && "navbar-blue"
      }`}
    >
      <div className="container">
        <ul className="navbar-nav">
          <div
            className="navbar-brand d-flex align-items-center mr-4"
            href="/#"
          >
            <Link
              to="/"
              className="link-unstyled workEgypt"
              style={
                props.location.pathname === "/"
                  ? { color: "#00326f", fontWeight: "bold" }
                  : { color: "#FFF", fontWeight: "bold" }
              }
            >
              <img
                src="/images/Logo.svg"
                alt="Logo"
                width={30}
                height={30}
                className="mr-2 rounded-circle "
              />
              WorkEgypt
            </Link>
          </div>

          <li className="nav-item">
            <NavLink className="nav-link" activeclassname="active" exact to="/">
              Home
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeclassname="active"
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
          {props.location.pathname === "/" ? (
            <>
              <li className="nav-item ml-auto">
                <a
                  className="nav-link nav-item__register"
                  href="/#"
                  data-toggle="modal"
                  data-target="#registerModal"
                >
                  Register
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link nav-item__login"
                  href="/#"
                  data-toggle="modal"
                  data-target="#loginModal"
                >
                  Login
                </a>
              </li>
            </>
          ) : (
            <li className="nav-item ml-auto">
              <button
                className="nav-link nav-item__register btn"
                onClick={() => props.history.goBack()}
              >
                <i className="fas fa-arrow-left" />
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(NavbarGuest);
