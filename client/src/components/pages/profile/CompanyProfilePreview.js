import React, { Component } from "react";
import JobCard from "./JobsCard";
import PostCard from "./PostCard";
import { connect } from "react-redux";
import { fetchUserJobs, fetchProfile } from "../../../redux/actions";
import DotsGroup from "../../reusable/loaders/DotsGroup";

export class CompanyProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      img: ["/images/suitcase.svg", "/images/writing.svg"],
      header: ["Jobs", "Posts"],
      span: ["200", "244,2"],
      isLoading: true,
      profileImgLoading: null,
      coverImgLoading: null,

      profileImg: "",
      coverImg: ""
    };
  }
  componentDidMount() {
    this.props.fetchUserJobs(this.props.match.params.companyId);
    this.props.fetchProfile(true, this.props.match.params.userId, true);
  }
  componentDidUpdate(prevProps, prevState) {
    //fetching Loader
    if (
      this.state.isLoading === true &&
      this.props.jobLoaders.fetchingUserJobs === false &&
      this.props.profileLoaders.shownProfileFetching === false
    ) {
      this.setState({ ...this.state, isLoading: false });
    }
  }

  render() {
    const { profile, job } = this.props;
    const ud = profile ? profile.user : null;
    const jobs = job && job.userJobs;
    const { isLoading } = this.state;
    if (isLoading) {
      return "Loading...";
    }
    return (
      <>
        <div className="company-profile avoid-navbar pb-3">
          <div className="container">
            <div className="company-profile__header ">
              <div className="responsive_img_container" style={{ height: 250 }}>
                <img
                  alt=""
                  className="header__background"
                  src={
                    (profile && profile.cover_image) ||
                    "http://placehold.it/10/999"
                  }
                />
              </div>

              <div
                className="header__img responsive_img_container"
                style={{ width: 110, height: 110 }}
              >
                <img
                  alt=""
                  src={
                    (profile && profile.image) || "http://placehold.it/10/ddd"
                  }
                />
              </div>
              <div className="header__text">
                <h4>{profile?.user?.name || "company name"}</h4>
              </div>
            </div>

            <div className="company-about row">
              <div className="company-about__text col-lg-8">
                <h4>About</h4>
                <p>
                  {(profile && profile.company_about) ||
                    "text explains some information about the company"}
                </p>
              </div>
              <div className="company-about-social col-lg-4">
                <div className="company-location">
                  <h5>{ud && ud.name}</h5>
                  <img alt="" src="images/placeholder.svg" />
                  <span>Cairo,Egypt</span>
                </div>
                <div className="company-contacts d-flex justify-content-center mb-3">
                  <div className="company-contacts__icons w-100">
                    <h5 className="mb-4">Contacts</h5>
                    <ul className="list-unstyled d-flex justify-content-center align-items-center w-100">
                      {!profile.social_links && "No social links added yet"}
                      {profile &&
                        profile.social_links &&
                        profile.social_links.facebook && (
                          <li>
                            <a
                              href={
                                profile &&
                                profile.social_links &&
                                profile.social_links.facebook
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
                        profile.social_links &&
                        profile.social_links.instagram && (
                          <li>
                            <a
                              href={
                                profile &&
                                profile.social_links &&
                                profile.social_links.instagram
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
                        profile.social_links &&
                        profile.social_links.twitter && (
                          <li>
                            <a
                              href={
                                profile &&
                                profile.social_links &&
                                profile.social_links.twitter
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
                        profile.social_links &&
                        profile.social_links.linkedIn && (
                          <li>
                            <a
                              href={
                                profile &&
                                profile.social_links &&
                                profile.social_links.linkedIn
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
                {profile.branding_video && (
                  <div className="main-card-layout">
                    <h6 className="text-center">Branding Video</h6>
                    <div className="embed-responsive embed-responsive-16by9 relative-container">
                      <iframe
                        style={{ borderRadius: "0 0px 10px 10px" }}
                        title="profilePreview_company_branding_video"
                        className="embed-responsive-item"
                        src={profile.branding_video}
                        frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      />
                    </div>
                  </div>
                )}
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
                <div className="jobs">
                  <h5 className="text-center mb-5">Jobs</h5>
                  {isLoading ? (
                    <DotsGroup isCentered={true} />
                  ) : (
                    <React.Fragment>
                      {jobs.map(job => (
                        <PostCard
                          key={job._id}
                          jobId={job._id}
                          isBelonging={profile._id === job.company._id}
                          title={job.title}
                          desc={job.desc}
                          videoSrc={job.videoSrc}
                          companyName={ud && ud.name}
                          isPreview={true}
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
  profile: state.profile.currentShownProfile,
  user: state.user,
  profileLoaders: state.profile.loaders,
  job: state.job,
  jobLoaders: state.job.loaders,
  userLoaders: {
    userDataLoading: state.user.userDataLoading,
    userIsEditing: state.user.userIsEditing
  }
});
export default connect(mapStateToProps, {
  fetchUserJobs,
  fetchProfile
})(CompanyProfile);
