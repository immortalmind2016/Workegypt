import React, { PureComponent } from "react";
import uuid from "uuid";
import Countdown, { zeroPad } from "react-countdown";
import { comp_reg, availableLanguages } from "../../../utils/fixtures";
import { editProfile } from "../../../redux/actions";
import { exams } from "../../../utils/data/profileQuestions";
import $ from "jquery";
import { connect } from "react-redux";
// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
  // Render a countdown
  return (
    <span>
      {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
    </span>
  );
};

class CompleteRegistration extends PureComponent {
  constructor(props) {
    super(props);
    this.timer = Date.now() + comp_reg.quizTime;
    this.timerRef = React.createRef();
    this.state = {
      timerIsFinished: false,
      timerIsStarted: false,
      chosenLang: "en",
      scorePerQuestion: 10,
      score: 0,
      score_Total: 0,
      answers: []
    };
  }

  startTimer = () => {
    this.timer = Date.now() + comp_reg.quizTime;
    this.setState({ ...this.state, timerIsStarted: true }, () => {
      if (this.timerRef.current) {
        const timer = this.timerRef.current;
        const { api } = timer;
        api.start();
      }
    });
  };

  pauseTimer = () => {
    if (this.timerRef.current) {
      const timer = this.timerRef.current;
      const { api } = timer;
      api.pause();
    }
  };

  setChosenLang = ({ currentTarget }) =>
    this.setState({ ...this.state, chosenLang: currentTarget.value });

  calculateScore = overallScore => {
    let score = 0;
    let scoreObject = { ...this.props.scoreObject };
    this.state.answers.forEach(ans => {
      //increase by the score per section if answers only === 1
      if (ans) {
        score += this.state.scorePerQuestion;
      }
    });

    scoreObject[this.state.chosenLang] = this.getGrade(
      // (score / overallScore) * 150
      this.state.score = score
    );
    console.log(score);
    console.log(this.state.score);

    this.props.editProfile(
      {
        score: scoreObject
      },
      false
    );
    this.setState({ ...this.state, score });
    console.log(scoreObject); 
  };

  getGrade = score => {
    if (score <= 24) {
      return "A1.1";
    }

    if (score >= 25 && score < 40) {
      return "A1.2";
    }

    if (score >= 40 && score < 59) {
      return "B1.1";
    }

    if (score >= 60 && score < 74) {
      return "B1.2";
    }

    if (score >= 75 && score < 90) {
      return "B2.1";
    }

    if (score >= 91 && score < 110) {
      return "B2.2";
    }

    if (score >= 111 && score < 129) {
      return "C1";
    }

    if (score >= 130 && score <= 150) {
      return "C2";
    }
  };

  handleScore = ({ target }) => {
    const index = $(target).data("index");
    const isCorrect = $(target).data("correct");
    let answers = [...this.state.answers];
    answers[index] = isCorrect;
    this.setState({ ...this.state, answers });
  };

  render() {
    const { timerIsFinished, chosenLang, timerIsStarted } = this.state;
    const {
      section1: sec1,
      section2: sec2,
      section3: sec3,
      section4: sec4
    } = exams[chosenLang];
    const sec1Score =
      sec1 && sec1.questions.length * this.state.scorePerQuestion;
    const sec2Score =
      sec2 && sec2.questions.length * this.state.scorePerQuestion;
    const sec3Score =
      sec3 && sec3.questions.length * this.state.scorePerQuestion;
    const sec4Score =
      sec4 && sec4.questions.length * this.state.scorePerQuestion;
    const overallScore = sec1Score + sec2Score + sec3Score + sec4Score;

    var noselect = {
      webkitTouchCallout: "none", /* iOS Safari */
        webkitUserSelect: "none", /* Safari */
         khtmlUserSelect: "none", /* Konqueror HTML */
           mozUserSelect: "none", /* Old versions of Firefox */
            msUserSelect: "none", /* Internet Explorer/Edge */
                userSelect: "none" /* Non-prefixed version, currently
                                      supported by Chrome, Edge, Opera and Firefox */
    }

    return (
      <div className="complete-registration avoid-navbar pt-5">
        <div className="container">
          <section className="header mb-5">
            <h6
              className="main-card-layout__title"
              style={{
                maxWidth: 200
              }}
            >
              Complete your registration
            </h6>
            <p className="text-secondary">
              Measure your command of a language with our Language Proficiency
              Tests and strength your profile
            </p>
          </section>
          <section className="questions-header">
            <h6 className="main-card-layout text-secondary text-center">
              WorkEgypt Quiz
            </h6>
            <div className="d-flex justify-content-center bg-red">
              <select
                value={this.state.chosenLang}
                className="flex-grow-1 w-50 mr-2 btn border select-language main-card-layout"
                onChange={this.setChosenLang}
                disabled={timerIsFinished || timerIsStarted ? true : false}
              >
                {availableLanguages.map(lang => (
                  <option key={uuid()} value={lang.value}>
                    {lang.name}
                  </option>
                ))}
              </select>
              <button
                onClick={this.startTimer}
                disabled={timerIsFinished || timerIsStarted ? true : false}
                className="flex-grow-1 w-50 ml-2 start_now-btn btn btn-primary"
              >
                Start
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
                        this.calculateScore(overallScore);
                        localStorage.setItem("timer", 0);

                        setTimeout(() => {
                          this.props.history.push("/profile");
                        }, 5000);
                      }
                    );
                  }}
                />
              ) : (
                "60 Minutes"
              )}
            </span>
          </section>
          {timerIsStarted ? (
            <section className="quiz-body main-card-layout">
              {timerIsFinished ? (
                <>
                  <h3 className="text-center mb-4">Your score is..</h3>
                  <h3 className="text-center text-primary">
                    {/* {this.getGrade((this.state.score / overallScore) * 150)} */}
                    {this.getGrade(this.state.score)}
                  </h3>
                </>
              ) : (
                <>
                  {/* section 1 start */}
                  {sec1 && (
                    <div className="section" style={noselect}>
                      <h3>{sec1.title}</h3>
                      {sec1.questions.map((quest, index) => (
                        <React.Fragment key={quest + index}>
                          <div className="question my-4">
                            <h6>{quest}</h6>
                            {sec1.answers[index].map((ans, ansIdx) => (
                              <div key={ansIdx} className="answer my-2 ">
                                <input
                                  className="mr-3"
                                  data-index={index}
                                  data-correct={ans === sec1.correct[index]}
                                  name={quest}
                                  type="radio"
                                  onClick={this.handleScore}
                                  id={ans + ansIdx}
                                />
                                <label className="m-0" htmlFor={ans + ansIdx}>
                                  {ans}
                                </label>
                              </div>
                            ))}
                          </div>
                          <hr />
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                  {/* section 1 end */}

                  {/* section 2 start */}
                  {sec2 && (
                    <div className="section" style={noselect}>
                      <h3>{sec2.title}</h3>
                      {sec2.questions.map((quest, index) => (
                        <React.Fragment key={quest + index}>
                          <div className="question my-4">
                            <h6>{quest}</h6>
                            {sec2.answers[index].map((ans, ansIdx) => (
                              <div key={ansIdx} className="answer my-2 ">
                                <input
                                  className="mr-3"
                                  data-index={index}
                                  data-correct={ans === sec2.correct[index]}
                                  name={quest}
                                  type="radio"
                                  onClick={this.handleScore}
                                  id={ans + ansIdx}
                                />
                                <label className="m-0" htmlFor={ans + ansIdx}>
                                  {ans}
                                </label>
                              </div>
                            ))}
                          </div>
                          <hr />
                        </React.Fragment>
                      ))}
                    </div>
                  )}

                  {/* section 2 end */}

                  {/* section 3 start */}
                  {sec3 && (
                    <div className="section" style={noselect}>
                      <h3>{sec3.title}</h3>
                      {sec3.questions.map((quest, index) => (
                        <React.Fragment key={quest + index}>
                          <div className="question my-4">
                            <h6>{quest}</h6>
                            {sec3.answers[index].map((ans, ansIdx) => (
                              <div key={ansIdx} className="answer my-2 ">
                                <input
                                  className="mr-3"
                                  data-index={index}
                                  data-correct={ans === sec3.correct[index]}
                                  name={quest}
                                  type="radio"
                                  onClick={this.handleScore}
                                  id={ans + ansIdx}
                                />
                                <label className="m-0" htmlFor={ans + ansIdx}>
                                  {ans}
                                </label>
                              </div>
                            ))}
                          </div>
                          <hr />
                        </React.Fragment>
                      ))}
                    </div>
                  )}

                  {/* section 3 end */}

                  {/* section 4  start */}
                  {sec4 && (
                    <div className="section" style={noselect}>
                      <h3>{sec4.title}</h3>
                      {sec4.questions.map((quest, index) => (
                        <React.Fragment key={quest + index}>
                          <div className="question my-4">
                            <h6>{quest}</h6>
                            {sec4.answers[index].map((ans, ansIdx) => (
                              <div key={ansIdx} className="answer my-2 ">
                                <input
                                  className="mr-3"
                                  data-index={index}
                                  data-correct={ans === sec4.correct[index]}
                                  name={quest}
                                  type="radio"
                                  onClick={this.handleScore}
                                  id={ans + ansIdx}
                                />
                                <label className="m-0" htmlFor={ans + ansIdx}>
                                  {ans}
                                </label>
                              </div>
                            ))}
                          </div>
                          <hr />
                        </React.Fragment>
                      ))}
                    </div>
                  )}

                  {/* section 4 end */}
                  <button
                    onClick={() => {
                      this.calculateScore(overallScore);
                      this.setState({
                        timerIsFinished: true
                      });

                      setTimeout(() => {
                        this.props.history.push("/profile");
                      }, 5000);
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
              Please select language and press start to start your Exam
            </h6>
          )}
        </div>
      </div>
    );
  }
}
export const mapStateToProps = state => ({
  scoreObject: state.profile.profileData.score
});
export default connect(mapStateToProps, { editProfile })(CompleteRegistration);
