import React, { useState } from "react";
import isEmpty from "../../../utils/isEmpty";
const Answer = ({
  answerIndex = 0,
  isRight,
  question = "qq",
  answerTitle,
  onChangeHandler,
  onAddQuizElement
}) => (
  <li className="list-group-item p-0">
    <div className="input-group w-100 h-100 ">
      <div className="input-group-prepend ">
        <div className="input-group-text " style={{ border: "none" }}>
          <input
            onChange={onChangeHandler}
            name={question}
            data-name="isRight"
            data-index={answerIndex}
            title="choose as a right answer"
            type="radio"
            aria-label="Radio button for following text input"
            checked={isRight}
            id={question + answerIndex}
          />
          <label htmlFor={question + answerIndex} className="ml-2 mb-0">
            Right answer
          </label>
        </div>
      </div>
      <input
        name="answerTitle"
        onChange={onChangeHandler}
        value={answerTitle}
        type="text"
        data-name="answerTitle"
        data-index={answerIndex}
        placeholder="Type your answer"
        className="form-control"
        aria-label="Text input with radio button"
        style={{ border: "none" }}
      />
    </div>
  </li>
);

const QuizElement = ({ jobId, addQuestion, isEditingProcess, editJob }) => {
  //state
  const [quizEl, setQuizEl] = useState({
    question: "",
    time: "",
    answers: [{ answerTitle: "", isRight: false }],
    rightSelected: false,
    reachedMaxAns: false,
    error: ""
  });

  const clearFields = () => {
    setQuizEl({
      question: "",
      answers: [{ answerTitle: "", isRight: false }],
      rightSelected: false,
      reachedMaxAns: false,

      error: ""
    });
  };

  const onChangeHandler = e => {
    const { name, value } = e.target;
    const dataName = e.target.getAttribute("data-name");
    const dataIndex = e.target.getAttribute("data-index");
    switch (dataName) {
      case "isRight": {
        let answers = [...quizEl.answers];
        answers = answers.map(ans => {
          ans.isRight = false;
          return ans;
        });

        answers[dataIndex].isRight = true;

        setQuizEl({
          ...quizEl,
          answers: [...answers],
          rightSelected: true
        });
        break;
      }

      case "answerTitle": {
        let answers = [...quizEl.answers];
        answers[dataIndex] = { ...answers[dataIndex], answerTitle: value };
        setQuizEl({ ...quizEl, answers });
        break;
      }

      default:
        setQuizEl({
          ...quizEl,
          [name]: value
        });
        break;
    }
  };

  const onAddAnswer = () => {
    //validate
    const prevAns = quizEl.answers[quizEl.answers.length - 1];
    if (isEmpty(prevAns.answerTitle)) {
      setQuizEl({
        ...quizEl,
        error: "please complete the answer before adding a new one!"
      });
      return;
    }
    if (quizEl.answers.length >= 4) {
      setQuizEl({
        ...quizEl,
        reachedMaxAns: true
      });
      return;
    }
    setQuizEl({
      ...quizEl,
      reachedMaxAns: false,
      error: ""
    });

    let answers = [...quizEl.answers, { answerTitle: "", isRight: false }];
    setQuizEl({ ...quizEl, answers, error: "" });
  };

  const onAddQuizElement = () => {
    const filteredAnswers = quizEl.answers.filter(
      ans => !isEmpty(ans.answerTitle)
    );

    if (filteredAnswers.length < 2) {
      setQuizEl({
        ...quizEl,
        error: "at least two answers added!"
      });
    } else if (isEmpty(quizEl.question)) {
      setQuizEl({
        ...quizEl,
        error: "please provide a question!"
      });
    } else if (!quizEl.rightSelected) {
      setQuizEl({
        ...quizEl,
        error: "please choose a right answer"
      });
    } else {
      setQuizEl({
        ...quizEl,
        error: ""
      });
      const [answer1, answer2, answer3, answer4] = filteredAnswers;

      const question = {
        question: quizEl.question,
        answer1: (answer1 && answer1.answerTitle) || "",
        answer2: (answer2 && answer2.answerTitle) || "",
        answer3: (answer3 && answer3.answerTitle) || "",
        answer4: (answer4 && answer4.answerTitle) || "",
        isRight1: (answer1 && answer1.isRight) || false,
        isRight2: (answer1 && answer2.isRight) || false,
        isRight3: (answer3 && answer3.isRight) || false,
        isRight4: (answer4 && answer4.isRight) || false
      };
      editJob(jobId, { quiz_time: quizEl.time });
      addQuestion(jobId, question);
      clearFields();
    }
  };

  const onEditQuizElement = () => {};
  const onDeleteQuizElement = () => {};
  return (
    <div className="col-12 col-sm-6 col-md-4  mb-3">
      <div className="quiz-element ">
        <ul className="list-group">
          <li
            className="list-group-item bg-dark text-light"
            aria-disabled="true"
            style={{ position: "relative" }}
          >
            {isEditingProcess ? (
              <>
                <button
                  className="btn btn-success btn-sm rounded-circle"
                  onClick={onEditQuizElement}
                  title="edit quiz"
                  style={{
                    position: "absolute",
                    top: "-12px",
                    right: "20px",
                    width: 30,
                    height: 30
                  }}
                >
                  <i className="fas fa-pen fa-sm" />
                </button>
                <button
                  className="btn btn-danger btn-sm rounded-circle"
                  onClick={onDeleteQuizElement}
                  title="delete quiz"
                  style={{
                    position: "absolute",
                    top: "-12px",
                    right: "-15px",
                    width: 30,
                    height: 30
                  }}
                >
                  <i className="fas fa-trash fa-sm " />
                </button>
              </>
            ) : (
              <button
                className="btn btn-primary rounded-circle"
                onClick={onAddQuizElement}
                style={{
                  position: "absolute",
                  top: "-12px",
                  right: "-15px"
                }}
              >
                <i
                  className="fas fa-plus"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Add Quiz Element"
                />
              </button>
            )}

            <h6>Quiz Element</h6>
          </li>

          <li className="list-group-item " aria-disabled="true">
            <div className="question">
              <input
                name="question"
                onChange={onChangeHandler}
                placeholder="write your question.. "
                className="w-100 h-100 input--blank"
                value={quizEl.question}
              />
            </div>
          </li>

          {quizEl.answers.map((ans, index) => (
            <Answer
              key={ans + index}
              onChangeHandler={onChangeHandler}
              answerTitle={ans.answerTitle}
              isRight={ans.isRight}
              answerIndex={index}
              onAddQuizElement={onAddQuizElement}
            />
          ))}
          <button
            disabled={quizEl.reachedMaxAns}
            onClick={onAddAnswer}
            className="btn btn-primary"
          >
            Add Answer
            <i className="fas fa-plus ml-4" />
          </button>
          {quizEl.error && <p className="text-danger">{quizEl.error}</p>}
        </ul>
      </div>
    </div>
  );
};

export default QuizElement;
