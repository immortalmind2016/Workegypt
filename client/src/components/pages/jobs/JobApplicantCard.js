import React, { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import GenerateInterviewModal from "./GenerateInterviewModal";
const JobApplicantCard = ({
  userName = "userName",
  profileImg = "http://placehold.it/100/888",
  quizScore = "score",
  status = "",
  applicantId, //profile ID
  jobId,
  editApplicantStatus,
  applicantProfileId, // user ID
  createPeer,
}) => {
  const [statusState, setStatus] = useState(undefined);
  const user = useSelector((state) => state.user.userData);
  const onChangeHandler = (e) => {
    setStatus(e.target.value);
    editApplicantStatus(jobId, applicantId, e.target.value);
  };
  useEffect(() => {
    setStatus(status);
  }, [status]);

  const _onInterviewClick = () => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <GenerateInterviewModal
          companyId={user._id}
          email={user.email}
          onClose={onClose}
        />
      ),
    });
  };
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div className="main-card-layout job-applicant-card d-flex flex-column">
        <div className="flex-centered flex-column header">
          <div>
            <div
              className="responsive_img_container rounded-circle border"
              style={{ overflow: "hidden", height: 50, width: 50 }}
            >
              <img src={profileImg} alt="" />
            </div>
          </div>
          <span>{userName}</span>
        </div>
        <div className="row">
          <div className="col-12">
            <hr />
          </div>
        </div>
        <div className="main">
          {quizScore.indexOf("undefined") === -1 && (
            <p className="text-center">
              Quiz Score: <span className="text-muted">{quizScore}</span>
            </p>
          )}
          <div className="status p-2">
            <div className="status-field d-flex justify-content-between">
              <label
                style={{ margin: 0, color: "#BDC147" }}
                htmlFor="shortlisted"
              >
                shortlisted
              </label>
              <input
                id={applicantId}
                type="radio"
                name={applicantId}
                value={"shortlisted"}
                onChange={onChangeHandler}
                data-status="shortlisted"
                checked={statusState === "shortlisted" ? true : false}
              />
            </div>
            <div className="status-field d-flex justify-content-between">
              <label
                style={{ margin: 0, color: "#0FB291" }}
                htmlFor="onContact"
              >
                on contact
              </label>
              <input
                id={applicantId}
                type="radio"
                name={applicantId}
                value={"oncontact"}
                onChange={onChangeHandler}
                data-status="oncontact"
                checked={statusState === "oncontact" ? true : false}
              />
            </div>
            <div className="status-field d-flex justify-content-between">
              <label style={{ margin: 0, color: "#0E7E30" }} htmlFor="accepted">
                accepted
              </label>
              <input
                id={applicantId}
                type="radio"
                name={applicantId}
                value={"accepted"}
                onChange={onChangeHandler}
                data-status="accepted"
                checked={statusState === "accepted" ? true : false}
              />
            </div>
            <div className="status-field d-flex justify-content-between">
              <label style={{ margin: 0, color: "#C50F0F" }} htmlFor="rejected">
                rejected
              </label>
              <input
                id={applicantId}
                type="radio"
                name={applicantId}
                value={"rejected"}
                onChange={onChangeHandler}
                data-status="rejected"
                checked={statusState === "rejected" ? true : false}
              />
            </div>
          </div>
          {/* end of status fields */}
          <div className="buttons-container p-2 d-flex ">
            <Link
              to={`/profile/${applicantProfileId}`}
              className="btn btn-primary w-50 p-1"
              style={{ borderRadius: 0 }}
            >
              profile
            </Link>
            <Link
              onClick={_onInterviewClick}
              className="btn btn-success w-50 p-1"
              style={{ borderRadius: 0 }}
            >
              interview
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplicantCard;
