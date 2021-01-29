import React, { Component } from "react";
import uuid from "uuid";
import { Link } from "react-router-dom";
import { getJob, getAppliedJobs } from "../../../redux/actions";
import { connect } from "react-redux";
import Loader1 from "../../reusable/loaders/Loader_1";
import moment from "moment";
import isEmpty from "../../../utils/isEmpty";

class JobDescription extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      checkingIfAppliedBefore: false,
      hasApplied: false,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.props.getJob(id);
    }
    if (this.props.user.type === false) {
      this.props.getAppliedJobs();
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.loading && this.props.jobLoaders.gettingJob === false) {
      if (this.props.user.type === false) {
        // if get  job applicants request is sent wait for it
        if (this.props.jobLoaders.gettingAppliedJobs === false) {
          //check if applicant profile is within job applicants to know if he applied before
          const hasApplied =
            this.props.jobs.find(
              job => job._id === this.props.match.params.id
            ) === undefined
              ? false
              : true;

          this.setState({ ...this.state, hasApplied });

          this.setState({ ...this.setState, loading: false });
        }
      } else {
        this.setState({ ...this.setState, loading: false });
      }
    }
  }

  render() {
    if (this.state.loading) {
      return <Loader1 />;
    } else {
      const { job } = this.props;
      if (!!job) {
        const {
          title,
          desc,
          open,
          requirements,
          experience = "not mentioned",
          level = "not mentioned",
          language = "",
          type: nature,
          job_type,
          applicantsNo,
          rejected,
          accepted,
          oncontact,
          shortlisted,
          company,
          created_date,
          salary_range,
          location,
          city,
          Area,
          number_of_vacancies,
          job_role,
        } = job;
        const { company_about } = this.props.profile || {};

        const isBelonging =
          this.props.job.company._id === this.props.profile._id;

        const requirementsArray = requirements
          .split("\n")
          .filter(req => !isEmpty(req));
        return (
          <div className="job-description avoid-navbar pt-5">
            <div className="container">
              <div
                className="row"
                style={{ maxWidth: "80rem", margin: "auto" }}
              >
                <div className="col-12 mb-2">
                  <div className="company padding border-r bg-white">
                    <div className="company__info">
                      <div
                        className="responsive_img_container"
                        style={{ width: 50, height: 50 }}
                      >
                        <img
                          className="company__info__image "
                          src={company.image || "http://placehold.it/100/ddd"}
                          alt=""
                        />
                      </div>
                      <div className="company__info__data ml-sm-4">
                        <p className="company__info__data__name">
                          {company.user.name}
                        </p>
                        <p className="company__info__data__type">
                          {company_about}
                        </p>
                        {/* @missing */}
                        <p className="company__info__data__time">
                          {moment(created_date).toNow(true) + " ago"}
                          <i className="fa fa-clock-o" aria-hidden="true" />
                        </p>
                      </div>
                      <div className="text-right flex-grow-1">
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

                        <h6
                          className={` ml-3 badge badge-${
                            typeof nature === "string" &&
                            nature.trim() === "Job"
                              ? "primary"
                              : "info"
                          } p-2`}
                        >
                          {nature}
                        </h6>
                      </div>
                    </div>
                    <h3 className="text-center w-100">{title}</h3>
                  </div>
                </div>
                <div className="col-12 mb-2">
                  <div className="desc padding border-r bg-white">
                    <h4>Job Description</h4>
                    <p style={{ color: "gray" }}>{desc}</p>
                  </div>
                </div>
                {/* requirements row start */}
                <div className="col-12 col-md-7 mb-2">
                  <div className="row">
                    <div className="col-12 mb-2 pr-0">
                      <div className="padding border-r bg-white">
                        {/* <div>missing data</div>
                        <hr /> */}
                        <h4 className="">Requirements</h4>
                        <ul>
                          {requirementsArray.length > 0 ? (
                            <>
                              {requirementsArray.map(req => (
                                <li key={uuid()}>{req}</li>
                              ))}
                            </>
                          ) : (
                            "Job Provider Did Not Mention Any Requirements"
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* requirements row end */}

                <div
                  className="col-12 col-md-5 mb-2 pl-2"
                  style={{ overflowWrap: "break-word" }}
                >
                  <div className="col-12 p-0 mb-3">
                    <div className="p-inline  padding border-r bg-white">
                      <div className="mb-3">
                        <h5 className=""> Experience:</h5>
                        <span className="text-muted">
                          {experience || "not mentioned"}
                        </span>
                      </div>
                      <div className="mb-3">
                        <h5 className=""> Level:</h5>
                        <span className="text-muted">
                          {level || "not mentioned"}
                        </span>
                      </div>
                      <div className="mb-3">
                        <h5 className=""> Language:</h5>
                        <span className="text-muted">
                          {language || "not mentioned"}
                        </span>
                      </div>
                      <div className="mb-3">
                        <h5 className=""> Role:</h5>
                        <span className="text-muted">
                          {job_role || "not mentioned"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 p-0 mb-2">
                    <div className="p-inline padding border-r bg-white">
                      <div className="mb-3">
                        <h5 className=""> Salary:</h5>
                        <span className="text-muted">
                          {salary_range.from + " To " + salary_range.to ||
                            "not mentioned"}
                        </span>
                      </div>
                      <div className="mb-3">
                        <h5 className=""> Type:</h5>
                        <span className="text-muted">
                          {job_type || "not mentioned"}
                        </span>
                      </div>
                      <div className="mb-3">
                        <h5 className=""> Location:</h5>
                        <span className="text-muted">
                          {location || "not mentioned"}
                          {city && ", "}
                          {city || ""}
                          {Area && ", "}
                          {Area || ""}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 p-0">
                    <div className=" padding border-r bg-white">
                      <div className="d-flex justify-content-center">
                        <h6 className="text-center badge badge-dark mr-2">
                          Applied {applicantsNo || 0} Applicants
                        </h6>
                        <h6 className="text-center badge badge-secondary">
                          Opened {number_of_vacancies || 0} Vacancies
                        </h6>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-3 col-md-6 text-center">
                          <div>
                            <i
                              className="fa fa-calendar mr-2"
                              aria-hidden="true"
                            />
                          </div>
                          <p
                            className="text-center text-info"
                            style={{ color: "black", display: "inline" }}
                          >
                            short listed
                          </p>
                          <p className="text-center ">{shortlisted || 0}</p>
                        </div>
                        <div className="col-3 col-md-6 text-center">
                          <div>
                            <i
                              className="fa fa-phone mr-2"
                              aria-hidden="true"
                            />
                          </div>
                          <p
                            className="text-center text-primary"
                            style={{ display: "inline" }}
                          >
                            on contact
                          </p>
                          <p className="text-center p_color">
                            {oncontact || 0}
                          </p>
                        </div>
                        <div className="col-3 col-md-6 text-center">
                          <div>
                            <i className=" fa fa-check mr-2" />
                          </div>
                          <p
                            className="text-center text-success"
                            style={{ display: "inline" }}
                          >
                            Accepted
                          </p>
                          <p className="text-center p_color">{accepted || 0}</p>
                        </div>
                        <div className="col-3 col-md-6 text-center">
                          <div>
                            <i
                              className="fa fa-phone mr-2"
                              aria-hidden="true"
                            />
                          </div>
                          <p
                            className="text-center text-danger"
                            style={{ display: "inline" }}
                          >
                            rejected
                          </p>
                          <p className="text-center p_color">{rejected || 0}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {isBelonging ? (
                  <div className=" w-100 flex-centered mb-4 ">
                    <Link
                      to={"/create-job-quiz/" + this.props.match.params.id}
                      className="btn btn-primary"
                    >
                      {job.quiz_length > 0
                        ? "Edit Created Quiz"
                        : "Create Quiz Now"}
                    </Link>
                    <Link
                      className="btn btn-info ml-3"
                      to={`/show-job-applicants/${job._id}`}
                    >
                      Show Applicants
                    </Link>
                  </div>
                ) : (
                  open &&
                  (this.state.hasApplied ? (
                    <p
                      className="badge badge-success p-3 mx-auto  "
                      style={{ fontSize: "14px" }}
                    >
                      <i className="fas fa-check-circle mr-3" />
                      you applied successfully
                    </p>
                  ) : (
                    <Link
                      to={
                        "/job-apply/" +
                        this.props.match.params.id +
                        "/primary-quiz"
                      }
                      className="mx-auto mb-4 btn btn-primary"
                    >
                      Apply now
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="job-description avoid-navbar pt-5">
            <h1>job cannot be found</h1>
          </div>
        );
      }
    }
  }
}

const mapStateToProps = state => ({
  job: state.job.currentJob,
  jobLoaders: state.job.loaders,
  jobs: state.job.userJobs,
  profile: state.profile.profileData,
  profileLoaders: state.profile.loaders,
  user: state.user.userData,
  userDataLoading: state.user.userDataLoading,
});

export default connect(mapStateToProps, { getJob, getAppliedJobs })(
  JobDescription
);
