import React, { Component } from "react";
class Contact extends Component {
  state = {};
  componentDidMount() {}
  render() {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          color: "#FFF",
          textAlign: "center",
        }}
      >
        <img
          src="images/contact_background.jpg"
          style={{
            position: "absolute",
            zIndex: "-2",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
          alt=""
        />
        <span
          style={{
            position: "absolute",
            display: "block",
            zIndex: "-1",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            height: "100%",
            width: "100%",
            backgroundColor: " rgba(0, 10, 50,0.5)",
          }}
        />
        <div className="container avoid-navbar">
          <div className="row pt-4">
            <div className="col">
              <h3 className="mb-5" style={{ position: "relative" }}>
                Contact Links
                <span
                  style={{
                    display: "block",
                    position: "absolute",
                    background: "#6aFfff",
                    height: 2,
                    width: 75,
                    left: -30,
                    right: 0,
                    margin: "auto",
                    marginTop: 10,
                  }}
                />
              </h3>
              <div className="d-flex justify-content-center">
                <ul className="list-unstyled" style={{ width: 130 }}>
                  <a
                    className="ml-5 text-light"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.facebook.com/WorkEgyptHiring/"
                  >
                    <li className="mb-3 d-flex justify-content-between ">
                      <img className="" src="images/facebook.svg" alt="" />
                      Facebook
                    </li>
                  </a>
                  <a
                    className="ml-5 text-light"
                    href="https://www.instagram.com/workegypthiring"
                    target="_blank"
                  >
                    <li className="mb-3 d-flex justify-content-between">
                      <img className="" src="images/instagram.svg" alt="" />
                      Instagram
                    </li>
                  </a>
                  <a
                    className="ml-5 text-light"
                    href="https://www.linkedin.com/company/workegypt"
                    target="_blank"
                  >
                    <li className="mb-3 d-flex justify-content-between">
                      <img className="" src="images/linkedin.svg" alt="" />
                      LinkedIn
                    </li>
                  </a>
                  <a
                    className="ml-5 text-light"
                    href="https://chat.whatsapp.com/IEhYoefAapt7OetIrxyD3T"
                    target="_blank"
                  >
                    <li className="mb-3 d-flex justify-content-between">
                      <img
                        className=""
                        style={{ width: 25 }}
                        src="images/whatsapp.svg"
                        alt=""
                      />
                      WhatsApp
                    </li>
                  </a>
                </ul>
              </div>
            </div>
            <div className="col">
              <h3 style={{ position: "relative" }} className="mb-5">
                Payment
                <span
                  style={{
                    display: "block",
                    position: "absolute",
                    background: "#6aFfff",
                    height: 2,
                    width: 51,
                    left: -16,
                    right: 0,
                    margin: "auto",
                    marginTop: 10,
                  }}
                />
              </h3>
              <ul className="list-unstyled">
                <li>please contact us to pay more quota</li>
                <li>+20 109 213 8126</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Contact;
