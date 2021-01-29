import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostJobModal from "../profile/profileComponents/PostJobModal";
import $ from "jquery";
import truncate_text from "../../../utils/truncate_text";
function OurJobCard({
  _id,
  companyName = "company name",
  companyAbout = "company about",
  title = "job title",
  desc = "company description",
  src = "https://placehold.it/20/ddd",
  open = true,
  onDeleteHandler,
  onToggleHandler,
  editJobHandler,
  jobLoaders,
  job,
  postingTime
}) {
  const [loading, setLoading] = useState(false);
  const [isOpened, setIsOpened] = useState(!!open);

  useEffect(() => {
    setIsOpened(open);
  }, [open]);
  return (
    <div className="col-12 col-sm-6 col-md-4">
      <div className="d-flex justify-content-center our-jobs__card flex-column">
        {loading ? (
          <div className="full-loader white">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <PostJobModal
              {...job}
              isEditProcess={true}
              editJob={editJobHandler}
              jobLoaders={jobLoaders}
            />
            <div className="d-flex flex-grow-1 flex-column">
              <div className="absoluted-actions">
                <button
                  title={isOpened ? "Close Job" : "Open Job"}
                  className="toggle-privacy "
                  onClick={() => {
                    onToggleHandler(_id, !isOpened);
                    setIsOpened(!isOpened);
                  }}
                >
                  <span className={`circle  ${isOpened ? "on" : "off"}`} />
                </button>
                <button
                  className="delete-job"
                  title="delete job"
                  onClick={() => {
                    setLoading(true);
                    onDeleteHandler(_id);
                  }}
                >
                  <i className="fa fa-times text-danger" />
                </button>
                <button
                  className="edit-job"
                  onClick={() => $(`#${_id}`).modal("show")}
                  title="edit job"
                >
                  <i className="fa fa-pen text-primary" />
                </button>
              </div>
              {/* job header start */}
              <div className="our-jobs__card__header d-flex">
                <Link to={`/job/${_id}`} className="link-unstyled">
                  <div className="responsive_img_container rounded-circle ">
                    <img
                      className="company-logo"
                      src={src || "http://placehold.it/100/ddd"}
                      alt=""
                    />
                  </div>
                </Link>
                <div className="d-flex flex-column ml-3">
                  <Link to={`/job/${_id}`} className="link-unstyled">
                    <h6>{companyName}</h6>
                    <small className="text-muted">{postingTime}</small>
                  </Link>
                  <span className="text-muted">
                    {truncate_text(
                      companyAbout === null ? "" : companyAbout,
                      50
                    )}
                  </span>
                </div>
              </div>
              {/* job header end */}
              <h6 className="our-jobs__card__title text-center my-3">
                {title}
              </h6>
              <p className="text-muted">{truncate_text(desc, 50)}</p>
            </div>
            <div className="d-flex actions-btns-container">
              <Link
                to={`/show-job-applicants/${_id}`}
                className="btn btn-primary flex-grow-1 mr-1 mb-2 mb-lg-0"
              >
                Show Applications
              </Link>
              <Link
                to={`/create-job-quiz/${_id}`}
                className="btn btn-success flex-grow-1 mr-1 mb-2 mb-lg-0"
              >
                {job.quiz_length > 0 ? "Edit" : "creat"} Quiz
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default OurJobCard;
