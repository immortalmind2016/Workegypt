import $ from "jquery";
import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

/* 
Only FaceBook link exists. we need to Add 
LinkedIn also:
WhatsApp: https://chat.whatsapp.com/IEhYoefAapt7OetIrxyD3T
Instagram: 
 */
const Footer = ({ setFormShow, isAuth, userType }) => (
  <footer className="footer">
    <div className="container">
      <div className="row">
        <div className="footer__links col-lg-4">
          <h5>WorkEgypt</h5>

          <ul className="footer-list list-unstyled ml-auto">
            <li className="footer-item">
              <NavLink
                className="footer-link"
                activeclassname="active"
                exact
                to="/"
              >
                Home
              </NavLink>
            </li>

            <li className="footer-item">
              <a
                className="footer-link"
                activeclassname="active"
                href="/privacy"
              >
                Privacy
              </a>
            </li>

            <li className="footer-item">
              {isAuth && userType === false && (
                <Link to={"/jobs"} className="btn footer-link btn-link p-0">
                  Find a Job Now
                </Link>
              )}
              {!isAuth && (
                <button
                  onClick={() => {
                    setFormShow();
                    $("#registerModal").modal("show");
                  }}
                  className="btn footer-link btn-link p-0"
                >
                  Find a Job Now
                </button>
              )}
            </li>
            {/*  */}

            <li className="footer-item">
              {isAuth && userType === true && (
                <Link to={"/profile"} className="btn footer-link btn-link p-0">
                  Start Hiring Now
                </Link>
              )}
              {!isAuth && (
                <button
                  onClick={() => {
                    this.setState({ ...this.state, formShown: "company" });
                    $("#registerModal").modal("show");
                  }}
                  className="btn footer-link btn-link p-0"
                >
                  Start Hiring Now
                </button>
              )}
            </li>
          </ul>
        </div>
        <div className="follow-us col-lg-4">
          <h4>Follow Us</h4>
          <div className="follow-us-list mx-auto text-center">
            <ul className="list-unstyled">
              <li>
                <img className="" src="images/facebook.svg" alt="" />
                <a
                  className="general-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.facebook.com/WorkEgyptHiring/"
                >
                  Facebook
                </a>
              </li>
              <li>
                <img className="" src="images/instagram.svg" alt="" />
                <a
                  className="general-link"
                  href="https://www.instagram.com/workegypthiring"
                  target="_blank"
                >
                  Instagram
                </a>
              </li>
            </ul>
            <ul className="list-unstyled ml-auto ">
              <li>
                <img className="" src="images/linkedin.svg" alt="" />
                <a
                  className="general-link"
                  href="https://www.linkedin.com/company/workegypt"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <img
                  className=""
                  style={{ width: 25 }}
                  src="images/whatsapp.svg"
                  alt=""
                />
                <a
                  className="general-link"
                  href="https://chat.whatsapp.com/IEhYoefAapt7OetIrxyD3T"
                  target="_blank"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="copy-right col-lg-4">
          <h5>2020 WORKEGYPT</h5>
          <span> &copy; All right reserved by WORKEGYPT</span> <br />
          <small>thames team</small>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
