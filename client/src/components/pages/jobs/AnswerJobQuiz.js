import React, { Component } from "react";
import Countdown, { zeroPad } from "react-countdown";
import $ from "jquery";
import { connect } from "react-redux";
import { applyForJob, getAppliedJobs } from "../../../redux/actions";
// Renderer callback with condition

const renderer = ({ hours, minutes, seconds, completed }) => {
  // Render a countdown
  return (
    <span>
      {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
    </span>
  );
};

class AnswerJobQuiz extends Component {
  constructor(props) {
    super(props);
    this.props.getAppliedJobs();

    this.timer = parseInt(props.job.quiz_time);

    /* localStorage.setItem("timer", Date.now() + comp_reg.quizTime); */
    this.timerRef = React.createRef();
    this.state = {
      timerIsFinished: false,
      timerIsStarted: false,
      chosenLang: "en",
      scorePerQuestion: 1,
      score: 0,
      answers: [],
      overallScore: props.job.quiz_length,
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
        this.props.history.goForward();
      } else {
        this.setState({ ...this.setState, checkAppliedLoader: false });
      }
    }
  }

  startTimer = () => {
    this.timer = Date.now() + parseInt(this.props.job.quiz_time * 1000 * 60);
    this.setState(
      { ...this.state, timerIsStarted: true, timerIsFinished: false },
      () => {
        if (this.timerRef.current) {
          const timer = this.timerRef.current;
          const { api } = timer;
          api.start();
        }
      }
    );
  };

  pauseTimer = () => {
    if (this.timerRef.current) {
      const timer = this.timerRef.current;
      const { api } = timer;
      api.pause();
    }
  };

  setChosenLang = ({ currentTarget }) => {
    this.setState({ ...this.state, chosenLang: currentTarget.value });
  };

  calculateScore = () => {
    let score = 0;
    this.state.answers.forEach(ans => {
      if (ans) {
        score += this.state.scorePerQuestion;
      }
    });
    this.setState({ ...this.state, score, loading: true });
    const { q1, q2, q3 } = JSON.parse(localStorage.primaryQuizAnswers);
    this.props.applyForJob(
      this.props.job._id,
      (score / this.state.overallScore) * 10,
      [q1, q2, q3]
    );

    localStorage.removeItem("primaryQuizAnswers");
  };

  handleScore = ({ target }) => {
    const index = $(target).data("index");
    const isCorrect = $(target).data("correct");
    let answers = [...this.state.answers];
    answers[index] = isCorrect;
    this.setState({ ...this.state, answers });
  };

  render() {
    const { timerIsFinished, timerIsStarted, checkAppliedLoader } = this.state;
    const { job } = this.props;
    if (checkAppliedLoader) {
      return "Loading..";
    }
    return (
      <div className="complete-registration avoid-navbar pt-5">
        <div className="container">
          <div className="answer-job-quiz">
            <section className="questions-header">
              <h6 className="main-card-layout text-secondary text-center">
                {job.company.user.name} Quiz
              </h6>
              <div className="d-flex justify-content-center bg-red">
                <button
                  onClick={this.startTimer}
                  disabled={timerIsFinished || timerIsStarted}
                  className="flex-grow-1  ml-2 start_now-btn btn btn-primary"
                >
                  Start Now
                </button>
              </div>
              <span className="text-center timer" id="timer">
                {timerIsStarted && !timerIsFinished ? (
                  <Countdown
                    ref={this.timerRef}
                    renderer={renderer}
                    autoStart={false}
                    date={this.timer}
                    zeroPadTime={2}
                    onComplete={() => {
                      this.setState(
                        { ...this.state, timerIsFinished: true },
                        () => {
                          this.calculateScore();
                          localStorage.setItem("timer", 0);
                        }
                      );
                    }}
                  />
                ) : this.props.job.quiz_time === 1 ? (
                  this.props.job.quiz_time + " Minute"
                ) : (
                  this.props.job.quiz_time + " Minutes"
                )}
              </span>
            </section>
            {timerIsStarted ? (
              <section className="quiz-body main-card-layout">
                {timerIsFinished ? (
                  this.state.loading ? (
                    <div className="text-center">
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <h3 className="alert alert-success w-100 h-100">
                      Your applied successfully
                    </h3>
                  )
                ) : (
                  <>
                    {job.quiz.length > 0 && (
                      <>
                        {job.quiz.map((quiz, ansIdx) => (
                          <div key={quiz._id} className="section">
                            <h3>{quiz.question}</h3>
                            {quiz.answer1 && (
                              <div className="answer my-2 ">
                                <input
                                  className="mr-3"
                                  data-index={0}
                                  data-correct={quiz.isRight1}
                                  name={quiz._id}
                                  type="radio"
                                  onClick={this.handleScore}
                                  id={quiz + ansIdx}
                                />
                                <label className="m-0" htmlFor={quiz + ansIdx}>
                                  {" "}
                                  {quiz.answer1}
                                </label>
                              </div>
                            )}
                            {quiz.answer2 && (
                              <div className="answer my-2 ">
                                <input
                                  className="mr-3"
                                  data-index={1}
                                  data-correct={quiz.isRight2}
                                  name={quiz._id}
                                  id={quiz._id}
                                  type="radio"
                                  onClick={this.handleScore}
                                />
                                {quiz.answer2}
                              </div>
                            )}
                            {quiz.answer3 && (
                              <div className="answer my-2 ">
                                <input
                                  className="mr-3"
                                  data-index={2}
                                  data-correct={quiz.isRight3}
                                  name={quiz._id}
                                  id={quiz._id}
                                  type="radio"
                                  onClick={this.handleScore}
                                />
                                {quiz.answer3}
                              </div>
                            )}
                            {quiz.answer4 && (
                              <div className="answer my-2 ">
                                <input
                                  className="mr-3"
                                  data-index={3}
                                  data-correct={quiz.isRight4}
                                  name={quiz._id}
                                  id={quiz._id}
                                  type="radio"
                                  onClick={this.handleScore}
                                />
                                {quiz.answer4}
                              </div>
                            )}
                            <hr />
                          </div>
                        ))}
                      </>
                    )}
                    <button
                      onClick={() => {
                        this.calculateScore();
                        this.setState({
                          timerIsFinished: true
                        });
                      }}
                      className="btn btn-success"
                    >
                      Finish Exam
                    </button>
                  </>
                )}
              </section>
            ) : (
              <h6 className="text-center main-card-layout">
                Press start to start your Exam
              </h6>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  job: state.job.currentJob,
  applyingForJob: state.job.loaders.applyingForJob,
  jobLoaders: state.job.loaders,
  userJobs: state.job.userJobs
});

export default connect(mapStateToProps, { applyForJob, getAppliedJobs })(
  AnswerJobQuiz
);
