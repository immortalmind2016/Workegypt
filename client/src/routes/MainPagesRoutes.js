import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  Home,
  Profile,
  ApplicantProfilePreview,
  CompanyProfilePreview,
  CompanyProfile,
  Timeline,
  CompleteRegistration,
  JobDescription,
  CreateJobQuiz,
  ShowJobApplicants,
  ApplicantAppliedJobsHistory,
  Contact,
  Privacy,
  JobApply,
  NotFound,
  OurJobs,
  Settings,
  Analysis,
  Chat,
  Payment,
  SearchProfiles,
  AdminLogin,
  InterviewRoom,
  JoinInterview,
} from "../components/pages";
import Blog from "../components/pages/Blog/Blog";
import Events from "../components/pages/Events/Events";
import Interview from "../components/pages/Interview/Interview";
import PrivateRoute from "../components/reusable/PrivateRoute";
import StrictApplicantRoute from "../components/reusable/StrictApplicantRoute";
import StrictCompanyRoute from "../components/reusable/StrictCompanyRoute";
import { useSelector } from "react-redux";
import StrictAdminRoute from "../components/reusable/StrictAdminRoute";
import MeetingHome from "../components/pages/AgoraMain";
import Meeting from "../components/pages/meeting";
import ResetPassword from "../components/pages/ResetPassword";
export default () => {
  const type = useSelector((state) => state.user?.userData?.type);
  return (
    <Switch>
      {/* both applicant and company */}
      <PrivateRoute exact path="/job/:id" component={JobDescription} />
      <PrivateRoute
        exact
        path="/interview/:company/:applicant"
        component={Interview}
      />
      <PrivateRoute
        exact
        path="/profile"
        component={type === true ? CompanyProfile : Profile}
      />
      <PrivateRoute exact path="/settings" component={Settings} />
      <PrivateRoute exact path="/chat" component={Chat} />
      <PrivateRoute path="/chat/:remoteUserID" component={Chat} />
      <PrivateRoute path="/interview/join" component={MeetingHome} />
      <PrivateRoute path="/interview/room" component={Meeting} />
      {/* <div className="full"> */}
      <Route exact path="/interview/join" component={MeetingHome} />
      <Route path="/meeting" component={Meeting} />
      {/* </div> */}

      {/* applicant only */}
      <StrictApplicantRoute
        exact
        path="/complete-registration"
        component={CompleteRegistration}
      />
      <StrictApplicantRoute path="/job-apply/:jobId" component={JobApply} />

      <StrictApplicantRoute
        exact
        path="/applied-jobs-history"
        component={ApplicantAppliedJobsHistory}
      />
      {/* company only */}

      <StrictCompanyRoute exact path="/our-jobs" component={OurJobs} />
      <StrictCompanyRoute
        exact
        path="/create-job-quiz/:jobId"
        component={CreateJobQuiz}
      />
      <StrictCompanyRoute
        exact
        path="/show-job-applicants/:jobId"
        component={ShowJobApplicants}
      />
      <StrictCompanyRoute
        exact
        path="/profile/:applicantId"
        component={ApplicantProfilePreview}
      />
      <StrictCompanyRoute
        exact
        path="/search-profiles"
        component={SearchProfiles}
      />

      {/* for admins only */}
      <StrictAdminRoute path="/analysis" component={Analysis} />

      {/* for non auth users */}
      <Route
        exact
        path="/profile/:companyId/:userId"
        component={CompanyProfilePreview}
      />
      <Route exact path="/" component={Home} />
      <Route exact path="/jobs" component={Timeline} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/privacy" component={Privacy} />
      <Route exact path="/blog" component={Blog} />
      <Route exact path="/admin-login" component={AdminLogin} />
      <Route exact path="/events" component={Events} />
      <Route exact path="/reset" component={ResetPassword} />
      <Route component={NotFound} />
    </Switch>
  );
};
