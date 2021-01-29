import React, { useState, useEffect } from "react";
import isEmpty from "../../../utils/isEmpty";
import $ from "jquery";
const Answer = ({ isRight, answerTitle }) => (
  <li className={`list-group-item ${isRight ? "text-success" : "text-danger"}`}>
    {answerTitle}
  </li>
);

function QuizElementPreview({
  questionId,
  jobId,
  deleteQuestion,
  question,
  answers
}) {
  const [loading, setLoading] = useState(false);
  const onDeleteQuizElement = () => {
    setLoading(true);
    deleteQuestion(jobId, questionId);
  };
  useEffect(() => {
    return () => {
      $('[data-toggle="tooltip"]').tooltip("dispose");
    };
  }, []);

  return (
    <div className="col-12 col-sm-6 col-md-4  mb-5">
      <div className="quiz-element">
        <ul className="list-group">
          <li
            className="list-group-item bg-dark text-light"
            aria-disabled="true"
            style={{ position: "relative" }}
          >
            <button
              className="btn btn-danger btn-sm rounded-circle flex-centered"
              onClick={onDeleteQuizElement}
              data-toggle="tooltip"
              data-placement="top"
              title="Delete Quiz Element"
              style={{
                position: "absolute",
                top: "-12px",
                right: "-15px",
                width: 30,
                height: 30
              }}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-grow spinner-grow-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Loading...</span>
                </>
              ) : (
                <i className="fas fa-trash fa-sm " />
              )}
            </button>

            <h6>Quiz Element</h6>
          </li>
          <li className="list-group-item " aria-disabled="true">
            <div className="question">
              <p>{question}</p>
            </div>
          </li>
          {answers
            .filter(ans => !isEmpty(ans.answerTitle))
            .map((ans, index) => (
              <Answer
                key={ans + index}
                answerTitle={ans.answerTitle}
                isRight={ans.isRight}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}

export default QuizElementPreview;
