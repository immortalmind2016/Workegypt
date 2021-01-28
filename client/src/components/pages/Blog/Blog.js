import React, { useEffect } from "react";
import BlogCard from "./BlogCard";
import Modal from "react-modal";
import BlogPostModal from "./BlogPostModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, loadMorePosts } from "../../../redux/actions";

import { useState } from "react";
import DotsGroup from "../../reusable/loaders/DotsGroup";
import moment from "moment";
// modal settings

Modal.setAppElement("#modals-root");

const Blog = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.blog.posts);
  const loaders = useSelector(state => state.blog.loaders);
  const errors = useSelector(state => state.blog.errors);
  const [getMoreCounter, setGetMoreCounter] = useState(0);
  const { fetchingPosts, loadingMorePosts } = loaders || {};
  const {
    fetchingPosts: fetchingPostsErr,
    loadingMorePosts: loadingMorePostsErr,
  } = errors || {};

  const [loading, setLoading] = useState(true);
  const [moreLoading, setMoreLoading] = useState(null);
  const [localErrors, setLocalErrors] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  useEffect(() => {
    dispatch(fetchPosts());
    /*    dispatch(
      editPost("5e8d23dd0b181635b1d28a91", {
        text: "hello world"
      })
    ); */
    /*dispatch(deletePost("5e8d239c0b181635b1d28a90")); */
  }, []);

  useEffect(() => {
    if (loading && fetchingPosts === false) setLoading(false);
    if (loading && fetchingPostsErr === true) {
      setLoading(false);
      setLocalErrors({
        ...localErrors,
        fetchErr: "Network Connection Instable, please Try Refreshing Page.",
      });
    }
    if (moreLoading && loadingMorePosts === false) setMoreLoading(false);
    if (moreLoading && loadingMorePostsErr === true) {
      setMoreLoading(false);
    }
  }, [fetchingPosts, fetchingPostsErr, loadingMorePosts, loadingMorePostsErr]);
  return (
    <>
      {localStorage.admToken && (
        <BlogPostModal isOpen={modalIsOpen} onClose={closeModal} />
      )}
      <div className="blog">
        <div className="container">
          {localStorage.admToken && (
            <div className="blog__header">
              <img
                src="/images/Logo.svg"
                alt="Logo"
                width={50}
                height={50}
                className="mr-2 rounded-circle "
              />
              <input
                className="general-input"
                onKeyDown={e => e.preventDefault()}
                onFocus={e => e.preventDefault()}
                placeholder="Write your post now...."
                onClick={openModal}
              />
            </div>
          )}

          {loading ? (
            <DotsGroup isCentered={true} />
          ) : (
            <div className="row">
              {posts instanceof Array && posts.length > 0 ? (
                <>
                  {posts.map(post => (
                    <BlogCard
                      key={post._id}
                      postId={post._id}
                      isVideo={post.video}
                      postingTime={moment(post.created_date).fromNow()}
                      text={post.text}
                      url={post.video ? post.video_link : post.image_link}
                    />
                  ))}
                  <div
                    style={{
                      background: "rgb(250,250,250)",
                      borderRadius: 20,
                      width: "100%",
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      border: "1px solid #DDD",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      dispatch(loadMorePosts((getMoreCounter + 1) * 5));
                      setMoreLoading(true);
                      setGetMoreCounter(getMoreCounter + 1);
                    }}
                  >
                    {moreLoading === true ? (
                      <span className="spinner-border text-secondary" />
                    ) : (
                      <span>Load more</span>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {localErrors.fetchErr ? (
                    <div
                      className="alert alert-danger text-center"
                      style={{ maxWidth: 400, margin: "auto" }}
                    >
                      {localErrors.fetchErr}
                    </div>
                  ) : (
                    <p style={{ color: "#444" }}>No Posts Added Yet.</p>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Blog;
