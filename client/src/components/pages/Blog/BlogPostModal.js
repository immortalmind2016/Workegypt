import React from "react";
import Modal from "react-modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPost, deletePost, editPost } from "../../../redux/actions";
import { useEffect } from "react";
import axios from "axios";
import { uris } from "../../../config";

const customStyles = {
  content: {
    maxWidth: 500,
    backgroundColor: "transparent",
    color: "#333",
    margin: "auto",
    height: "auto",
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  overlay: {
    background: "rgba(10,10,10,0.3)",
    display: "flex",

    justifyContent: "center",
    alignItems: "center"
  }
};
const inputStyle = { resize: "none", width: "100%" };
function BlogPostModal({
  isOpen,
  onClose,
  isEditProcess,
  url = "",
  isVideo = false,
  text = "",
  postId
}) {
  const dispatch = useDispatch();
  const loaders = useSelector(state => state.blog.loaders);
  const errors = useSelector(state => state.blog.errors);
  const { uploadingPost, editingPost, deletingPost } = loaders || {};
  const {
    uploadingPost: uploadingPostErr,
    editingPost: editingPostErr,
    deletingPost: deletingPostErr
  } = errors || {};

  const [post, setPost] = useState({
    text: "",
    url: "",
    isVideo: false
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState();
  const [imageUploading, setImageUploading] = useState();
  const [uploadSuccess, setUploadSuccess] = useState();
  const onChangeHandler = ({ target }) => {
    let controlledVal =
      target.type === "checkbox" ? target.checked : target.value;

    setPost(prevPost => ({ ...prevPost, [target.name]: controlledVal }));
  };

  useEffect(() => {
    setImageUploading(null);
    setSuccess(null);
    setUploadSuccess(null);
    if (isEditProcess) {
      setPost({ url, isVideo, text });
    }
  }, []);
  //handling loaders
  useEffect(() => {
    let timeout;
    if (
      (loading && uploadingPost === false) ||
      (loading && editingPost === false) ||
      (loading && deletingPost === false)
    ) {
      setLoading(false);
      setSuccess(true);
      timeout = setTimeout(() => {
        onClose();
      }, 1500);
    }
  }, [uploadingPost, editingPost, deletingPost]);
  //handling errors
  useEffect(() => {
    if (
      (loading && uploadingPostErr === true) ||
      (loading && editingPostErr === true) ||
      (loading && deletingPostErr === true)
    ) {
      setSuccess(false);
      setLoading(false);
    }
  }, [uploadingPostErr, editingPostErr, deletingPostErr]);

  const onPostHandler = e => {
    e.preventDefault();
    setLoading(false);
    let uriV;
    if (post.url?.includes("embed")) {
      uriV = post.uri.split("embed/")[1];
    } else {
      uriV = post.url?.split("v=")[1]?.split("&")[0];
    }
    const newPost = {
      video: post.isVideo,
      video_link: post.isVideo ? `https://www.youtube.com/embed/${uriV}` : "",

      image_link: post.isVideo ? "" : post.url,
      text: post.text
    };
    setLoading(true);
    if (isEditProcess) {
      dispatch(editPost(postId, newPost));
    } else {
      dispatch(uploadPost(newPost));
    }
  };
  const uploadImage = e => {
    setUploadSuccess(undefined);
    if (!(e.target.files && e.target.files[0])) return;
    let formData = new FormData();
    formData.append("image", e.target.files[0]);
    setImageUploading(true);
    axios
      .post(uris.profile.uploadCompanyImg, formData, {
        headers: {
          "content-type": "multipart/form-data"
        }
      })
      .then(({ data }) => {
        if (data?.error) return setUploadSuccess(false);
        console.log(data.link);
        setImageUploading(false);
        setUploadSuccess(true);
        setPost(prevPost => ({ ...prevPost, url: data?.link }));
      })
      .catch(() => setUploadSuccess(false));
  };
  useEffect(() => {
    if (imageUploading && typeof uploadSuccess === "boolean") {
      setImageUploading(false);
    }
  }, [uploadSuccess, imageUploading]);
  return (
    <Modal
      onAfterClose={() => {
        if (!isEditProcess) {
          setPost({
            url: "",
            text: "",
            isVideo: false
          });
        }
        setImageUploading(null);
        setSuccess(null);
        setUploadSuccess(null);
      }}
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <form
        onSubmit={onPostHandler}
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#FFF",
          borderRadius: 10,
          width: "100%"
        }}
      >
        {success && (
          <div className="alert alert-success text-center">
            Finished Successfully
          </div>
        )}
        {success === false && (
          <div className="alert alert-danger text-center">
            An Error Occurred, Please Try Again!
          </div>
        )}
        {loading && (
          <div
            className="spinner-border"
            role="status"
            style={{
              margin: "auto",
              marginBottom: 12
            }}
          >
            <span className="sr-only">Loading...</span>
          </div>
        )}
        <textarea
          placeholder="Write your text here.."
          onChange={onChangeHandler}
          required
          style={{ ...inputStyle, height: 100, marginBottom: 10 }}
          className="general-input"
          value={post.text}
          name="text"
        />
        {post.isVideo ? (
          <input
            placeholder="Past a youtube video url.."
            onChange={onChangeHandler}
            style={{ ...inputStyle, marginBottom: 10 }}
            className="general-input"
            value={post.url}
            type="url"
            name="url"
          />
        ) : (
          <>
            <input
              onChange={uploadImage}
              className="general-input"
              type="file"
              accept=".jpg, .png"
              id="blog_post_image"
              hidden
              name="url"
            />
            <label
              htmlFor="blog_post_image"
              className="general-input"
              style={{
                ...inputStyle,
                marginBottom: 10,
                textAlign: "center",
                cursor: "pointer"
              }}
            >
              {imageUploading === true ? (
                <div className="spinner-border text-secondary">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Upload Image"
              )}
            </label>
            {post.url && (
              <div className="d-flex justify-content-center align-items-center">
                <div
                  className="responsive_img_container"
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    padding: 2,
                    borderColor: "#DDD",
                    borderWidth: 2
                  }}
                >
                  <img src={post.url} alt="" style={{ borderRadius: "50%" }} />
                </div>
              </div>
            )}
            {uploadSuccess === false && (
              <span className="text-danger">
                Image Upload Error, Please Try Again!
              </span>
            )}
            {uploadSuccess === true && (
              <span className="text-success">Image Uploaded Successfully</span>
            )}
          </>
        )}

        <div className="d-flex align-items-center my-3">
          <label htmlFor="isVideo" className="mr-3">
            Upload Video
          </label>
          <input
            type="checkbox"
            checked={post.isVideo}
            onChange={onChangeHandler}
            id="isVideo"
            name="isVideo"
            style={{ width: 15, height: 15 }}
          />
        </div>

        <div className="d-flex">
          {isEditProcess ? (
            <>
              <button
                className="btn"
                style={{
                  background: "#1abc9c",
                  color: "#FFF",
                  width: 100,
                  borderRadius: 20
                }}
                onClick={onPostHandler}
              >
                Save Edits
              </button>

              <button
                className="btn ml-auto"
                style={{
                  background: "#EA2027",
                  color: "#FFF",
                  width: 100,
                  borderRadius: 20
                }}
                type="button"
                onClick={() => {
                  setLoading(true);
                  dispatch(deletePost(postId));
                }}
              >
                Delete
              </button>
            </>
          ) : (
            <button
              className="btn"
              onClick={onPostHandler}
              style={{
                background: "#1abc9c",
                color: "#FFF",
                width: 100,
                borderRadius: 20
              }}
            >
              Post
            </button>
          )}
          <button
            className="btn"
            onClick={onClose}
            type="button"
            style={{
              background: "#34495e",
              color: "#FFF",
              width: 100,
              borderRadius: 20,
              marginLeft: 10
            }}
          >
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default BlogPostModal;
