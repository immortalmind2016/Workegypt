import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAppliedJobs, cancelJobApplication } from "../../../redux/actions";
import DotsGroup from "../../reusable/loaders/DotsGroup";
import moment from "moment";
import { Link } from "react-router-dom";

const ApplicationHistoryCard = ({ job }) => {
  //redux config
  const dispatch = useDispatch();
  const userProfileId = useSelector(state => state.profile.profileData._id);
  const cancellingApplication = useSelector(
    state => state.job.loaders.cancellingApplication
  );

  //own
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cancellingApplication === false) {
      setLoading(false);
    }
  }, [cancellingApplication]);
  return (
    <div
      className="d-flex  flex-wrap justify-content-center relative-container mb-3"
      style={{ overflow: "hidden" }}
    >
      <div
        className="main-card-layout mr-3 relative-container"
        style={{ width: 250, overflow: "hidden" }}
      >
        {/* delete loader start */}
        {loading && (
          <div className="full-loader white">
            <span className="spinner-border text-danger" role="status"></span>
          </div>
        )}
        {/* delete loader end */}
        {/*  */}
        <button
          type="button "
          className="input--blank "
          style={{
            position: "absolute",
            background: "transparent",
            top: 5,
            right: 5
          }}
          onClick={() => {
            setLoading(true);
            dispatch(cancelJobApplication(job._id));
          }}
        >
          <i className="fas fa-times text-danger" />
        </button>
        {/*  */}

        <div
          className="d-flex flex-centered flex-column flex-grow-2
        h-75
      "
        >
          {/* company image start */}
          <div
            className="responsive_img_container rounded-circle mb-3 border"
            style={{ width: 50, height: 50 }}
          >
            <Link to={`/profile/${job.company._id}/${job.company.user._id}`}>
              <img
                src={
                  (job.company && job.company.image) ||
                  "http://placehold.it/100/100"
                }
                alt=""
              />
            </Link>
          </div>
          {/* company image end */}
          <Link
            to={`/profile/${job.company._id}/${job.company.user._id}`}
            className="link-unstyled"
          >
            <span>{job.company.user.name || "company name"}</span>
          </Link>
          <small className="text-muted">
            {moment(job.created_date).fromNow()}
          </small>
          <p className="text-center mt-3">{job.title}</p>
        </div>
        <div className="flex-grow-1">
          <hr />
          <p className="text-center">
            {job.applicants &&
              job.applicants.find(ap => ap.applicant === userProfileId).status}
          </p>
        </div>
      </div>
    </div>
  );
};

function ApplicantAppliedJobsHistory() {
  //redux config
  const dispatch = useDispatch();
  const jobs = useSelector(state => state.job.userJobs);
  const gettingAppliedJobs = useSelector(
    state => state.job.loaders.gettingAppliedJobs
  );

  //own state
  useEffect(() => {
    dispatch(getAppliedJobs());
  }, []);

  return (
    <div className="avoid-navbar  pt-4 container">
      <h3 className="mb-5">Applied job History</h3>
      {gettingAppliedJobs === false ? (
        <>
          {jobs.length > 0 ? (
            <div className="row">
              {jobs.map(job => {
                return <ApplicationHistoryCard key={job._id} job={job} />;
              })}
            </div>
          ) : (
            "no job applications"
          )}
        </>
      ) : (
        <DotsGroup isCentered={true} />
      )}
    </div>
  );
}

export default ApplicantAppliedJobsHistory;
