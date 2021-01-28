import React from "react";
import { Link } from "react-router-dom";

const Post = ({
  userName = "userName",
  profileImg = "https://placehold.it/100/ddd",
  jobTitle = "title",
  imageSrc = "",
  videoSrc = "",
  postingTime = "1 min ago",
  about = "about",
  _id,
  companyId,
  userId,
  open,
  isBelonging,
  isAuth
}) => {
  //type props can be (video | image | text)
  return (
    <div className="post">
      <div className="d-flex flex-column flex-grow-1">
        <div className="post__header row">
          <div className="col-12 ">
            <div className="w-100 d-flex">
              <div>
                {isAuth && (
                  <div
                    className="responsive_img_container border rounded-circle"
                    style={{
                      width: 50,
                      height: 50
                    }}
                  >
                    <Link to={`/profile/${companyId}/${userId}`}>
                      <img className="" src={profileImg} alt="" />
                    </Link>
                  </div>
                )}
              </div>

              <div className="post__header__text w-100">
                <div className="d-flex flex-column">
                  <Link
                    to={`/profile/${companyId}/${userId}`}
                    className="link-unstyled"
                  >
                    <h5>{userName}</h5>
                  </Link>
                  <small>
                    {postingTime}
                    <img src="images/circular-wall-clock.svg" alt="" />
                  </small>
                </div>
                <h3 className="text-center">{jobTitle}</h3>
                <p>{about}</p>
              </div>
              <div className="flex flex-grow-1 text-right">
                {!open ? (
                  <h6 className="badge badge-danger p-2">
                    <i className="far fa-times-circle mr-2"></i>
                    closed
                  </h6>
                ) : (
                  <h6 className="badge badge-success p-2">
                    <i className="fas fa-check-circle mr-2"></i>
                    opened
                  </h6>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* only show if post is video type */}
        {videoSrc && (
          <video
            className=""
            width="100%"
            height="100%"
            controls
            src={videoSrc}
            type="video/mp4"
          />
        )}

        {/* only show if post is image type */}
        {!videoSrc && imageSrc && (
          <div
            className="responsive_img_container"
            style={{
              width: "100%",
              height: "15rem"
            }}
          >
            <img src={imageSrc} alt="" />
          </div>
        )}
      </div>
      {isAuth ? (
        <Link to={`/job/${_id}`} className="btn btn-primary apply-btn">
          <img src="/images/tap.svg" width="20" height="20" alt="" />
          <span className="ml-2">show details</span>
        </Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default Post;
