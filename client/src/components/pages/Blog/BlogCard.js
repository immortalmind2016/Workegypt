import React from "react";
import BlogPostModal from "./BlogPostModal";
import { useState } from "react";

const BlogCard = ({
  postingTime = "1 min ago",
  url,
  isVideo = false,
  text = "Text",
  postId,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      {localStorage.admToken && (
        <BlogPostModal
          isOpen={modalIsOpen}
          onClose={closeModal}
          url={url}
          isEditProcess={true}
          isVideo={isVideo}
          text={text}
          postId={postId}
        />
      )}
      <div
        className="col-12 col-lg-6 mx-auto mx-lg-0"
        style={{ maxWidth: 600 }}
      >
        <div className="blogCard">
          <div className="blogCard__header d-flex">
            <img
              src="/images/Logo.svg"
              alt="Logo"
              width={50}
              height={50}
              className="mr-2 mb-3 rounded-circle "
            />
            <div className="blogCard__header__text ">
              <h4 className="mb-0">WorkEgypt</h4>
              <p className="mb-0">Telecom and communication company</p>
              <small>{postingTime}</small>
            </div>
            {localStorage.admToken && (
              <i
                className="fas fa-pen ml-auto"
                style={{ cursor: "pointer" }}
                onClick={openModal}
              />
            )}
          </div>
          {!!url && (
            <>
              <div
                className="responsive_img_container"
                style={{ width: "100%", height: 300, borderRadius: 5 }}
              >
                {isVideo ? (
                  <iframe
                    src={url}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <img className="blogCard__img" src={url} alt="" />
                )}
              </div>
              <hr />
            </>
          )}
          <p className="mt-4 mx-5">{text}</p>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
