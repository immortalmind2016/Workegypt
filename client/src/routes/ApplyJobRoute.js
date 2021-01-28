import React from "react";
import { JobApplyQuiz, AnswerJobQuiz } from "../components/pages";
import { Route } from "react-router-dom";
function ApplyJobRoute() {
  return (
    <>
      <Route path="/job-apply/:jobId/primary-quiz" component={JobApplyQuiz} />
      <Route path="/job-apply/:jobId/company-quiz" component={AnswerJobQuiz} />
    </>
  );
}

export default ApplyJobRoute;
