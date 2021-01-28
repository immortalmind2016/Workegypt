import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addQuestion,
  deleteQuestion,
  editQuestion,
  getJob,
  editJob,
} from "../../../redux/actions";
import QuizElement from "./QuizElement";
import QuizElementPreview from "./QuizElementPreview";
import DotsGroup from "../../reusable/loaders/DotsGroup";
import moment from "moment";
import isEmpty from "../../../utils/isEmpty";
import $ from "jquery";
export class CreateJobQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      time: 60,
      prevTime: 60,
      isTooltipSet: false,
    };
    const { jobId } = this.props.match.params;
    this.props.getJob(jobId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.loading && this.props.jobLoader === false) {
      this.setState({
        ...this.state,
        loading: false,
        prevTime: !this.props.job.quiz_time ? 60 : this.props.job.quiz_time,
        time: !this.props.job.quiz_time ? 60 : this.props.job.quiz_time,
      });
    }

    if (
      this.state.isTooltipSet === false &&
      !isEmpty(document.querySelector('[data-toggle="tooltip"]'))
    ) {
      $('[data-toggle="tooltip"]').tooltip();
    }
  }
  componentWillUnmount() {
    $('[data-toggle="tooltip"]').tooltip("dispose");
  }

  onChangeHandler = ({ target }) => {
    const { name, value } = target;
    if ((value.length === 1 && value === "0") || isNaN(value)) return;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };
  render() {
    const { jobId } = this.props.match.params;
    const { job, addingJobQuestion } = this.props;

    return (
      <div className="avoid-navbar container pt-3">
        <div className="create-job-quiz">
          <h3 className="text-secondary my-5">Create Job Quiz</h3>

          {this.state.loading ? (
            <DotsGroup />
          ) : (
            <>
              <div className="main-card-layout mb-5">
                <div className="d-flex">
                  <div>
                    <div
                      className="responsive_img_container border rounded-circle"
                      style={{ width: 50, height: 50 }}
                    >
                      <img src={job.company.image} alt="" />
                    </div>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="ml-4">{job.company.user.name}</span>
                    <span className="ml-4">
                      {moment(job.created_date).toNow(true) + " ago"}
                    </span>
                  </div>
                </div>
                <h6 className="text-center">{job.title}</h6>
              </div>

              <div className="row">
                <div className="col-12">
                  <h6 className="mb-2">Note that:</h6>
                  <span>
                    by default quiz time is set to 1 hour please edit the input
                    below to change this, the time is written in minutes!
                  </span>
                  <div className="d-flex align-items-center mb-5 mt-3 ">
                    <input
                      name="time"
                      onChange={this.onChangeHandler}
                      value={this.state.time}
                      onBlur={() => {
                        if (!isEmpty(this.state.time)) {
                          this.props.editJob(this.props.match.params.jobId, {
                            quiz_time: isEmpty(this.state.time)
                              ? 60
                              : this.state.time,
                          });
                        }
                      }}
                      type="text"
                      placeholder="Type Quiz time in minutes starting from 1.."
                      className="form-control border p-2 flex-grow-1 "
                      style={{ border: "none" }}
                      maxLength="3"
                    />

                    <span className=" flex-grow-1 w-25 ml-5">Minutes</span>
                  </div>
                </div>
              </div>
              <div className="row">
                {job.quiz.map((quiz) => (
                  <QuizElementPreview
                    key={quiz._id}
                    questionId={quiz._id}
                    jobId={job._id}
                    onChangeHandler={this.onChangeHandler}
                    onAddAnswer={this.onAddAnswer}
                    onAddQuizElement={this.onAddQuizElement}
                    question={quiz.question}
                    isEditingProcess={true}
                    answers={[
                      {
                        answerTitle: quiz.answer1,
                        isRight: quiz.isRight1,
                      },
                      {
                        answerTitle: quiz.answer2,
                        isRight: quiz.isRight2,
                      },
                      {
                        answerTitle: quiz.answer3,
                        isRight: quiz.isRight3,
                      },
                      {
                        answerTitle: quiz.answer4,
                        isRight: quiz.isRight4,
                      },
                    ]}
                    deleteQuestion={this.props.deleteQuestion}
                  />
                ))}
                <QuizElement
                  onChangeHandler={this.onChangeHandler}
                  onAddAnswer={this.onAddAnswer}
                  onAddQuizElement={this.onAddQuizElement}
                  jobId={jobId}
                  addQuestion={this.props.addQuestion}
                  editQuestion={this.props.editQuestion}
                  deleteQuestion={this.props.deleteQuestion}
                  addingJobQuestion={addingJobQuestion}
                  editJob={this.props.editJob}
                />
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  job: state.job.currentJob,
  jobLoader: state.job.loaders.gettingJob,
  addingJobQuestion: state.job.loaders.addingQuestion,
});

export default connect(mapStateToProps, {
  addQuestion,
  deleteQuestion,
  editQuestion,
  getJob,
  editJob,
})(CreateJobQuiz);
