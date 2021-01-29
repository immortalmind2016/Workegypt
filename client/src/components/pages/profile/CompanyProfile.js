import React, { Component } from "react";
import { createPortal } from "react-dom";
import JobCard from "./JobsCard";
import PostCard from "./PostCard";
import EditCompanyProfileModal from "./profileComponents/EditCompanyProfileModal";
import $ from "jquery";
import { connect } from "react-redux";
import {
  editProfile,
  editUserData,
  createJob,
  editJob,
  deleteJob,
  getJob,
  fetchUserJobs,
} from "../../../redux/actions";
import CircularLoader from "../../reusable/loaders/CircularLoader";
import { uris } from "../../../config";
import Axios from "axios";
import PostJobModal from "./profileComponents/PostJobModal";
import DotsGroup from "../../reusable/loaders/DotsGroup";
import moment from "moment";
import validator from "validator";

export class CompanyProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      img: ["/images/suitcase.svg", "/images/writing.svg"],
      header: ["Jobs", "Posts"],

      isLoading: true,
      profileImgLoading: null,
      coverImgLoading: null,

      profileImg: "",
      coverImg: "",
      brandingVideo: "",
      showBrandingVideoField: false,
      brandingVideoLoading: false,
      copied: false,
    };
  }
  componentDidMount() {
    if (!!this.props.profile?._id) {
      this.props.fetchUserJobs(this.props.profile?._id);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //fetching Loader
    if (
      this.state.isLoading === true &&
      this.props.jobLoaders.fetchingUserJobs === false
    ) {
      this.setState({ ...this.state, isLoading: false });
    }
    if (prevProps.profile === null && this.props.profile !== null) {
      this.props.fetchUserJobs(this.props.profile?._id);
    }
    //editing loader

    if (
      (prevProps.userLoaders.userIsEditing === true ||
        prevProps.profileLoaders.profileEditing === true) &&
      this.props.userLoaders.userIsEditing === false &&
      this.props.profileLoaders.profileEditing === false
    ) {
      $("#CompanyProfileModal").modal("hide");
    }

    if (
      this.state.brandingVideoLoading &&
      this.props.profileLoaders.profileEditing === false
    ) {
      this.setState({ ...this.state, brandingVideoLoading: false });
    }
  }

  readURL = input => {
    if (input.files && input.files[0]) {
      if (input.files[0].size > 1024 * 1024 * 5) {
        alert("image size is too big maximum image size is 5 Mb");
        return;
      }
      //set loaders to be true
      if (input.id === "chooseCompanyImg") {
        this.setState({ ...this.state, profileImgLoading: true });
      } else {
        this.setState({ ...this.state, coverImgLoading: true });
      }
      //create multipart form
      const formData = new FormData();
      formData.append("image", input.files[0]);

      //uploading image
      Axios.post(uris.profile?.uploadCompanyImg, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      }).then(({ data }) => {
        if (input.id === "chooseCompanyImg") {
          //profile photo
          this.setState({
            ...this.state,
            profilePhotoFile: data.link,
            profileImgLoading: false,
          });
          //editing profile image
          this.props.editProfile(
            {
              image: data.link,
            },
            true
          );
        } else {
          //cover photo
          this.setState({
            ...this.state,
            coverPhotoFile: data.link,
            coverImgLoading: false,
          });
          this.props.editProfile(
            {
              cover_image: data.link,
            },
            true
          );
        }
      });
    }
  };

  onImgLoad = ({ target }) => this.readURL(target);

  handleModalClose = () => {};
  startLoading = () => {
    this.setState({
      ...this.state,
      isLoading: true,
    });
  };
  copyToClipboard = str => {
    const el = document.createElement("textarea");
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    this.setState({ ...this.state, copied: true }, () => {
      setTimeout(() => {
        this.setState({ ...this.state, copied: false });
      }, 1000);
    });
  };

  render() {
    const { profile, user, job } = this.props;
    const ud = user ? user.userData : null;
    const jobs = job && job.userJobs;
    const { profileImgLoading, coverImgLoading, isLoading } = this.state;

    return (
      <>
        {createPortal(
          <>
            <EditCompanyProfileModal
              about={profile && profile?.company_about}
              name={ud && ud.name} //user
              linkedIn={
                profile &&
                profile?.social_links &&
                profile?.social_links.linkedIn
              }
              twitter={
                profile &&
                profile?.social_links &&
                profile?.social_links.twitter
              }
              facebook={
                profile &&
                profile?.social_links &&
                profile?.social_links.facebook
              }
              instagram={
                profile &&
                profile?.social_links &&
                profile?.social_links.instagram
              }
              handleModalClose={this.handleModalClose}
              onChangeHandler={this.onChangeHandler}
              editProfile={this.props.editProfile}
              editUserData={this.props.editUserData}
              startLoading={this.startLoading}
            />

            {/* post job Modal */}
            <PostJobModal
              isEditProcess={false}
              createJob={this.props.createJob}
              jobLoaders={this.props.jobLoaders}
            />
          </>,
          document.getElementById("modals-root")
        )}
        <div className="company-profile avoid-navbar ">
          <div className="container">
            <div className="company-profile__header ">
              {coverImgLoading ? (
                <div
                  style={{
                    height: 250,
                    background: "#FFF",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img width={100} src="/images/pulseBars.svg" alt="" />
                </div>
              ) : (
                <div
                  className="responsive_img_container"
                  style={{ height: 250 }}
                >
                  <img
                    alt=""
                    className="header__background"
                    src={
                      (profile && profile?.cover_image) ||
                      "http://placehold.it/10/999"
                    }
                  />
                </div>
              )}
              <div
                className="header__img responsive_img_container"
                style={{ width: 110, height: 110 }}
              >
                {profileImgLoading ? (
                  <CircularLoader />
                ) : (
                  <img
                    alt=""
                    src={
                      (profile && profile?.image) ||
                      "http://placehold.it/10/ddd"
                    }
                  />
                )}

                <div className="company-profileImg-uploader">
                  <input
                    hidden
                    id="chooseCompanyImg"
                    type="file"
                    name="image"
                    accept=".png , .jpg"
                    onChange={this.onImgLoad}
                  />
                  <label
                    htmlFor="chooseCompanyImg"
                    style={{
                      color: "#333",
                      cursor: "pointer",
                    }}
                  >
                    <i className="fas fa-upload" />
                  </label>
                </div>
              </div>
              <div className="header__text">
                <h4>{(ud && ud.name) || "company name"}</h4>
              </div>
              <div className="company-cover-uploader">
                <input
                  hidden
                  id="chooseCompanyCover"
                  type="file"
                  name="image"
                  accept=".png , .jpg"
                  onChange={this.onImgLoad}
                />
                <label
                  htmlFor="chooseCompanyCover"
                  style={{
                    color: "#333",
                    cursor: "pointer",
                  }}
                >
                  <i className="fas fa-upload" />
                </label>
              </div>
              <button
                data-target="#CompanyProfileModal"
                data-toggle="modal"
                className="edit-profile-btn"
              >
                <i className="fas fa-pen mr-3" />
                <span>Edit profile</span>
              </button>
            </div>

            <div className="company-about row ">
              <h6
                onClick={() =>
                  this.copyToClipboard(
                    window.location.href +
                      "/" +
                      this.props.profile?._id +
                      "/" +
                      this.props.profile?.user._id
                  )
                }
                className="main-card-layout text-secondary text-center share-profile mt-3 w-100 relative-container"
              >
                Copy Profile Link
                <i className="fas fa-share ml-4" />
                {this.state.copied && (
                  <span
                    className="copied-indicator"
                    style={{ top: 0, right: 0 }}
                  >
                    Copied!
                  </span>
                )}
              </h6>
              <div className="company-about__text col-lg-8">
                <h4>About</h4>
                <p>
                  {(profile && profile?.company_about) ||
                    "text explains some information about the company"}
                </p>
              </div>
              <div className="company-about-social col-lg-4">
                <div className="company-location">
                  <h5>{ud && ud.name}</h5>
                  <img alt="" src="images/placeholder.svg" />
                  <span>Cairo,Egypt</span>
                </div>
                <div className="company-contacts d-flex justify-content-center">
                  <div className="company-contacts__icons w-100">
                    <h5 className="mb-4">Contacts</h5>
                    <ul className="list-unstyled d-flex justify-content-center align-items-center w-100">
                      {!profile?.social_links && "No social links added yet"}
                      {profile &&
                        profile?.social_links &&
                        profile?.social_links?.facebook && (
                          <li>
                            <a
                              href={
                                profile &&
                                profile?.social_links &&
                                profile?.social_links.facebook
                              }
                            >
                              <img
                                alt=""
                                className=""
                                src="images/facebook.svg"
                              />
                            </a>
                          </li>
                        )}

                      {profile &&
                        profile?.social_links &&
                        profile?.social_links.instagram && (
                          <li>
                            <a
                              href={
                                profile &&
                                profile?.social_links &&
                                profile?.social_links.instagram
                              }
                            >
                              <img
                                alt=""
                                className=""
                                src="images/instagram.svg"
                              />
                            </a>
                          </li>
                        )}
                      {profile &&
                        profile?.social_links &&
                        profile?.social_links.twitter && (
                          <li>
                            <a
                              href={
                                profile &&
                                profile?.social_links &&
                                profile?.social_links.twitter
                              }
                            >
                              <img
                                alt=""
                                className=""
                                src="images/twitter.svg"
                              />
                            </a>
                          </li>
                        )}
                      {profile &&
                        profile?.social_links &&
                        profile?.social_links.linkedIn && (
                          <li>
                            <a
                              href={
                                profile &&
                                profile?.social_links &&
                                profile?.social_links.linkedIn
                              }
                            >
                              <img
                                alt=""
                                className=""
                                src="images/linkedin.svg"
                              />
                            </a>
                          </li>
                        )}
                    </ul>
                  </div>
                  {/*  <button className="btn btn-success ml-auto">Chat</button> */}
                </div>

                <div className="main-card-layout mt-2">
                  <h6 className="mb-3">
                    Branding Video
                    {profile?.branding_video && (
                      <>
                        <button
                          className="btn btn-primary rounded-circle float-right flex-centered"
                          style={{ width: 25, height: 25 }}
                          onClick={() =>
                            this.setState({
                              ...this.state,
                              showBrandingVideoField: true,
                            })
                          }
                          disabled={this.state.brandingVideoLoading}
                        >
                          <i
                            className="fas fa-pen "
                            style={{ fontSize: 10 }}
                            title="Edit Branding Video"
                          ></i>
                        </button>
                        <div className="clearfix"></div>
                      </>
                    )}
                  </h6>

                  {!this.state.showBrandingVideoField &&
                  profile?.branding_video ? (
                    <div className="embed-responsive embed-responsive-16by9 relative-container">
                      {this.state.brandingVideoLoading ? (
                        <div className="full-loader withe">
                          <div className="spinner spinner-border" />
                        </div>
                      ) : (
                        <iframe
                          style={{ borderRadius: "0 0px 10px 10px" }}
                          title="companyProfileBrandingVideo"
                          className="embed-responsive-item"
                          src={profile?.branding_video}
                          frameborder="0"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                        />
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="input-group">
                        <input
                          type="text"
                          name="brandingVideo"
                          value={this.state.brandingVideo}
                          className={`form-control ${
                            this.state.brandingVideoError && "is-invalid"
                          }`}
                          onChange={({ target }) =>
                            this.setState({
                              ...this.state,
                              brandingVideo: target.value,
                            })
                          }
                        />

                        <div className="input-group-append">
                          <button
                            onClick={() => {
                              if (!validator.isURL(this.state.brandingVideo)) {
                                this.setState({
                                  ...this.state,
                                  brandingVideoError: "URL is not valid",
                                });
                                return;
                              }
                              this.setState({
                                ...this.state,
                                brandingVideoError: "",
                                showBrandingVideoField: false,
                                brandingVideoLoading: true,
                              });
                              let uriToken = this.state.brandingVideo
                                .split("v=")[1]
                                .split("=")[0]
                                .split("&")[0];

                              this.props.editProfile(
                                {
                                  branding_video: `https://www.youtube.com/embed/${uriToken}/`,
                                },
                                true
                              );
                            }}
                            className="btn btn-dark"
                          >
                            Save Link
                          </button>
                        </div>
                        {this.state.brandingVideoError && (
                          <div className="invalid-feedback">
                            {this.state.brandingVideoError}
                          </div>
                        )}
                      </div>
                      <button
                        className="btn btn-link"
                        onClick={() =>
                          this.setState({
                            ...this.state,
                            showBrandingVideoField: false,
                          })
                        }
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="company-profile-content row">
              <div className="col-lg-2">
                <JobCard
                  img={this.state.img[0]}
                  header={this.state.header[0]}
                  span={jobs.length}
                />
              </div>
              <div className="col-lg-6 ">
                <div className="write-post mb-4">
                  <div
                    className="responsive_img_container rounded-circle mr-4"
                    style={{ height: 50, width: 50 }}
                  >
                    <img
                      alt=""
                      src={
                        (profile && profile?.image) ||
                        "http://placehold.it/50/ddd"
                      }
                    />
                  </div>

                  <div className="write-post__text ">
                    <textarea
                      style={{ resize: "none" }}
                      type="text"
                      placeholder="Create Job Now.."
                      onFocus={() => $("#PostJobModal").modal("show")}
                      onKeyDown={e => e.preventDefault()}
                    ></textarea>
                  </div>
                </div>
                <div className="jobs ">
                  <h5 className="text-center mb-5">Jobs</h5>
                  {isLoading ? (
                    <DotsGroup isCentered={true} />
                  ) : (
                    <React.Fragment>
                      {jobs.map(job => (
                        <PostCard
                          key={job._id}
                          jobId={job._id}
                          isBelonging={profile?._id === job.company._id}
                          title={job.title}
                          desc={job.desc}
                          videoSrc={job.videoSrc}
                          companyName={ud && ud.name}
                          postingTime={moment(job.created_date).fromNow()}
                          src={job.company.image}
                        />
                      ))}
                    </React.Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile?.profileData,
  user: state.user,
  profileLoaders: state.profile?.loaders,
  job: state.job,
  jobLoaders: state.job.loaders,
  userLoaders: {
    userDataLoading: state.user.userDataLoading,
    userIsEditing: state.user.userIsEditing,
  },
});
export default connect(mapStateToProps, {
  editProfile,
  editUserData,
  createJob,
  editJob,
  deleteJob,
  getJob,
  fetchUserJobs,
})(CompanyProfile);
