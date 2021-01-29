import React from "react";
import { Link } from "react-router-dom";
const PostCard = ({
  title = "post Title",
  desc = "post description",
  companyName = "company name",
  videoSrc = "",
  isBelonging,
  jobId,
  isPreview,
  src,
  postingTime
}) => {
  return (
    <div className="postCard">
      <div className="d-flex flex-column flex-grow-1">
        <div className="postCard__header d-flex align-items-end">
          <div
            className="responsive_img_container rounded-circle border"
            style={{ width: 50, height: 50, overflow: "hidden" }}
          >
            <img
              className=""
              src={src || "http://placehold.it/100/ddd"}
              alt=""
            />
          </div>
          <div className="postCard__header__text ">
            <h5>{companyName}</h5>
            <small>{postingTime}</small>
          </div>
        </div>
        <h3 className="postCard__title">{title}</h3>
        <p>{desc}</p>
        {videoSrc && (
          <video style={{ height: 200 }} controls draggable src={videoSrc} />
        )}
      </div>
      {isBelonging && !isPreview ? (
        <div className="d-flex w-100">
          <Link
            to={"/create-job-quiz/" + jobId}
            className="btn btn-success btn-sm"
          >
            create quiz
          </Link>
          <Link to={"/job/" + jobId} className="btn btn-primary btn-sm">
            preview job
          </Link>
        </div>
      ) : (
        <Link
          className="btn btn-success"
          to={`/job-apply/${jobId}/primary-quiz`}
        >
          apply now
        </Link>
      )}
    </div>
  );
};

export default PostCard;
