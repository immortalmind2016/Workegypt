/**
 * @description
 * this component is used for visitors who are not yet authenticated as users i.e (not logged in)
 */
import React from "react";
import { NavLink, Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions";
const NavbarAdmin = (props) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <nav
      className={
        "navbar navbar-expand-lg navbar-light navbar-guest navbar-blue"
      }
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
      }}
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
                location.pathname === "/"
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

          {/*           <li className="nav-item">
            <NavLink
              className="nav-link"
              activeclassname="active"
              exact
              to="/jobs"
            >
              Jobs
            </NavLink>
          </li> */}

          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeclassname="active"
              exact
              to="/analysis"
            >
              Analysis
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

          {/*           <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                exact
                to="/contact"
              >
                Contact
              </NavLink>
            </li> */}
          {/*          <li className="nav-item">
              <a className="nav-link" activeclassname="active" href="/privacy">
                Privacy
              </a>
            </li> */}
          <li className="nav-item ml-auto">
            <button
              onClick={() => dispatch(logout(history))}
              className="btn btn-link nav-link"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
