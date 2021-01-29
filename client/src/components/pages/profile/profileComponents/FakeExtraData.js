import React from "react";
const FakeExtraData = ({
  openContact = () => {},
  contactOpeningLoader,
  contactOpeningError,
}) => {
  return (
    <section
      style={{ minHeight: 100 }}
      className="profile__extra-info main-card-layout fake-extra-data"
    >
      <div className="open-contact d-flex flex-column px-3">
        <small style={{ textTransform: "capitalize" }}>
          Once you open contacts you will be able to message this applicant,
          preview CV and Contact information.
        </small>
        <button
          onClick={openContact}
          className="btn btn-primary my-3 w-100"
          type="button"
        >
          {contactOpeningLoader ? (
            <span className="spinner spinner-border"></span>
          ) : (
            "OPEN CONTACTS"
          )}
        </button>
        {contactOpeningError && (
          <small className="text-danger">
            Request failed please try again!
          </small>
        )}
      </div>
      <div className="info">
        <div className="d-flex flex-grow-1 align-items-center w-100">
          <div className="content">
            <div className="d-flex justify-content-center align-items-center">
              <img src="/images/age.svg" alt="" />
              <h6 className="info__title ml-2">Age</h6>
            </div>
            <span className="text-muted text-center">__ years</span>
          </div>
        </div>

        <div className="d-flex flex-grow-1 align-items-center w-100">
          <div className="content">
            <div className="d-flex justify-content-center align-items-center">
              <img className="  " src="/images/students-cap.svg" alt="" />
              <h6 className="info__title ml-2">Graduation Year</h6>
            </div>

            <span className="text-muted text-center">{"__"}</span>
          </div>
        </div>
      </div>

      <div className="info">
        <div className="d-flex flex-grow-1 align-items-center w-100">
          <div className="content">
            <div className="d-flex justify-content-center align-items-center">
              <i className="fas fa-map" />
              <h6 className="info__title ml-2">live in</h6>
            </div>
            <span className="text-muted">{"__"}</span>
          </div>
        </div>
        <div className="d-flex flex-grow-1 align-items-center w-100">
          <div className="content">
            <div className="d-flex justify-content-center align-items-center">
              <i className="fab fa-gratipay " />
              <h6 className="info__title ml-2">Marital Status</h6>
            </div>
            <span className="text-muted">{"__"}</span>
          </div>
        </div>
      </div>

      <div className="info">
        <div className="d-flex flex-grow-1 align-items-center w-100">
          <div className="content">
            <div className="d-flex justify-content-center align-items-center">
              <i className="fas fa-phone-square-alt "></i>
              <h6 className="info__title ml-2">Phone Number</h6>
            </div>
            <span className="text-muted">{"__"}</span>
          </div>
        </div>
        <div className="d-flex flex-grow-1 align-items-center w-100">
          <div className="content">
            <div className="d-flex justify-content-center align-items-center">
              <i className="fas fa-phone " style={{ color: "#666" }} />
              <h6 className="info__title ml-2" style={{ color: "#666" }}>
                Alternative Number
              </h6>
            </div>
            <span className="text-muted">{"__"}</span>
          </div>
        </div>
      </div>

      <div className="info">
        <div className="d-flex flex-grow-1 align-items-center w-100">
          <div className="content">
            <div className="d-flex justify-content-center align-items-center">
              <i className="fas fa-map-marker-alt"></i>
              <h6 className="info__title ml-2">Where Would You Like To Work</h6>
            </div>
            <span className="text-muted">{"__"}</span>
          </div>
        </div>
      </div>

      <div className="info">
        <div className="d-flex flex-grow-1 align-items-center w-100">
          <div className="content">
            <div className="d-flex justify-content-center align-items-center">
              <i className="fas fa-dollar-sign"></i>
              <h6 className="info__title ml-2">Expected Salary</h6>
            </div>
            <span className="text-muted">$$$$$ Dollars</span>
          </div>
        </div>
      </div>

      <div className="info">
        <div className="d-flex flex-grow-1 align-items-center w-100">
          <div className="content">
            <div className="d-flex justify-content-center align-items-center mb-3">
              <i className="fas fa-paperclip"></i>
              <h6 className="info__title ml-2">Social Links</h6>
            </div>

            <div className="d-flex justify-content-around">
              <i className="fab fa-facebook-square fa-2x" />
              <i className="fab fa-twitter-square fa-2x" />
              <i className="fab fa-instagram-square fa-2x" />
              <i className="fab fa-linkedin fa-2x" />
              <i className="fab fa-behance-square fa-2x" />
              <i className="fab fa-github-square fa-2x" />
              <i className="fab fa-stack-overflow fa-2x" />
              <i className="fab fa-youtube fa-2x" />
              <i className="fab fa-blogger fa-2x" />
              <i className="fas fa-anchor fa-2x mr-2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FakeExtraData;
