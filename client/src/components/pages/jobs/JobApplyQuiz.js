import React, { Component } from "react";
import { connect } from "react-redux";
import isEmpty from "../../../utils/isEmpty";
import { applyForJob, getAppliedJobs } from "../../../redux/actions";
const AnswerField = ({
  name = "",
  value = "",
  onChangeHandler,
  maxLength = 0,
  question = "question"
}) => {
  return (
    <div className="answer-field">
      <h5 className="mb-3">{question}</h5>
      <textarea
        className="input--blank"
        name={name}
        value={value}
        onChange={onChangeHandler}
        maxLength={maxLength}
        onPaste={e => {
          e.preventDefault();
          alert("no copy pasting");
        }}
      />

      <span className="badge badge-success badge-pill">
        {parseInt(maxLength) - value.length}
      </span>
    </div>
  );
};

class JobApplyQuiz extends Component {
  constructor(props) {
    super(props);
    this.props.getAppliedJobs();
    const answers = localStorage.primaryQuizAnswers
      ? JSON.parse(localStorage.primaryQuizAnswers)
      : undefined;
    this.state = {
      q1: !!answers ? answers.q1 : "",
      q2: !!answers ? answers.q2 : "",
      q3: !!answers ? answers.q3 : "",
      error: "",
      loading: false,
      checkAppliedLoader: true
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.loading && this.props.applyingForJob === false) {
      this.setState({ ...this.state, loading: false });
      setTimeout(() => {
        this.props.history.push("/applied-jobs-history");
      }, 2000);
    }
    if (
      this.state.checkAppliedLoader &&
      this.props.jobLoaders.gettingAppliedJobs === false
    ) {
      //check if applicant profile is within job applicants to know if he applied before
      const hasApplied = !!this.props.userJobs.find(
        job => job._id === this.props.match.params.jobId
      );
      if (hasApplied) {
        this.props.history.goBack();
      } else {
        this.setState({ ...this.setState, checkAppliedLoader: false });
      }
    }
  }

  onChangeHandler = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  confirmAndSend = () => {
    const { q1, q2, q3 } = this.state;
    if (isEmpty(q1) || isEmpty(q2) || isEmpty(q3)) {
      this.setState({
        ...this.state,

        error: "please answer all the questions below!"
      });
      return;
    }

    this.setState({ ...this.state, error: "", loading: true });

    //should send request
    this.props.applyForJob(this.props.job._id, undefined, [q1, q2, q3]);
  };
  goNext = () => {
    const { q1, q2, q3 } = this.state;
    if (isEmpty(q1) || isEmpty(q2) || isEmpty(q3)) {
      this.setState({
        ...this.state,
        error: "please answer all the questions below!"
      });
      return;
    }

    this.setState({ ...this.state, error: "" });
    const answers = {
      q1,
      q2,
      q3
    };
    //should send request

    localStorage.setItem("primaryQuizAnswers", JSON.stringify(answers));
    this.props.history.push(`/job-apply/${this.props.job._id}/company-quiz`);
  };

  render() {
    const { q1, q2, q3, error, checkAppliedLoader } = this.state;
    const { job } = this.props;
    if (checkAppliedLoader) {
      return "Loading..";
    }
    return (
      <div className="container">
        <div className=" job-apply-quiz avoid-navbar">
          <div className="row px-4 px-md-0">
            <form
              className="main-card-layout col-12 col-md-8 mr-4 order-2 order-md-1"
              onSubmit={e => e.preventDefault()}
            >
              {error && <p className="my-4 text-center text-danger">{error}</p>}
              <AnswerField
                question="Write a brief about your self"
                value={q1}
                name="q1"
                onChangeHandler={this.onChangeHandler}
                maxLength="200"
              />
              <AnswerField
                question="Why should we hire you?"
                value={q2}
                name="q2"
                onChangeHandler={this.onChangeHandler}
                maxLength="210"
              />
              <AnswerField
                question="What are your best skills?"
                value={q3}
                name="q3"
                onChangeHandler={this.onChangeHandler}
                maxLength="20"
              />
              <div className="flex-centered mt-4 d-flex d-md-none">
                {job.quiz_length > 0 ? (
                  <button
                    onClick={this.goNext}
                    className="btn btn-primary w-75 mx-auto"
                  >
                    Next
                  </button>
                ) : (
                  <div className="d-flex flex-column">
                    <button
                      onClick={this.confirmAndSend}
                      type="button"
                      className="btn btn-primary w-75 mx-auto"
                      style={{ minWidth: "200px" }}
                      disabled={this.state.loading}
                    >
                      {this.state.loading ? (
                        <div className="text-center">
                          <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      ) : (
                        "confirm and send"
                      )}
                    </button>
                    {this.props.applyingForJob === false && (
                      <div className="alert alert-success mt-3">
                        you applied successfully
                      </div>
                    )}
                  </div>
                )}
              </div>
            </form>
            <aside className="col ml-auto ml-4 order-1 order-md-2 mb-4 mb-md-0">
              <div className="d-flex main-card-layout flex-column content align-items-center justify-content-around">
                <div className="w-100 d-flex">
                  <div className="mr-4">
                    <div
                      className="responsive_img_container border rounded-circle"
                      style={{ width: 50, height: 50 }}
                    >
                      <img src={job.company.image} alt="" />
                    </div>
                  </div>
                  <div>
                    <h5>{job.company.user.name}</h5>
                    <small className="text-muted">
                      should render company about that is retrieved form
                      database
                    </small>
                  </div>
                </div>
                <h4 className="text-center">English trainer at Vodafone uk</h4>
              </div>
              <div className="flex-centered mt-4 d-none d-md-flex">
                {job.quiz_length > 0 ? (
                  <button
                    onClick={this.goNext}
                    className="btn btn-primary w-75 mx-auto"
                  >
                    Next
                  </button>
                ) : (
                  <div className="d-flex flex-column ">
                    <button
                      onClick={this.confirmAndSend}
                      type="button"
                      className="btn btn-primary w-100 mx-auto"
                      disabled={this.state.loading}
                    >
                      {this.state.loading ? (
                        <div className="text-center">
                          <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      ) : (
                        "confirm and send"
                      )}
                    </button>
                    {this.props.applyingForJob === false && (
                      <div className="alert alert-success mt-3">
                        you applied successfully
                      </div>
                    )}
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile.profileData,
  user: state.user.userData,
  job: state.job.currentJob,
  userJobs: state.job.userJobs,
  applyingForJob: state.job.loaders.applyingForJob,
  jobLoaders: state.job.loaders
});

export default connect(mapStateToProps, { applyForJob, getAppliedJobs })(
  JobApplyQuiz
);
