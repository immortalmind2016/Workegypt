import {
  CREATE_JOB_FAILURE,
  CREATE_JOB_START,
  CREATE_JOB_SUCCESS,
  DELETE_JOB_FAILURE,
  DELETE_JOB_START,
  DELETE_JOB_SUCCESS,
  EDIT_JOB_FAILURE,
  EDIT_JOB_START,
  EDIT_JOB_SUCCESS,
  FETCH_JOBS_FAILURE,
  FETCH_JOBS_START,
  FETCH_JOBS_SUCCESS,
  FETCH_USER_JOBS_START,
  FETCH_USER_JOBS_SUCCESS,
  FETCH_USER_JOBS_FAILURE,
  FETCH_JOB_APPLICANTS_START,
  FETCH_JOB_APPLICANTS_SUCCESS,
  FETCH_JOB_APPLICANTS_FAILURE,
  GET_JOB_FAILURE,
  GET_JOB_START,
  GET_JOB_SUCCESS,
  ADD_QUESTION_START,
  ADD_QUESTION_SUCCESS,
  ADD_QUESTION_FAILURE,
  DELETE_QUESTION_START,
  DELETE_QUESTION_SUCCESS,
  DELETE_QUESTION_FAILURE,
  GET_APPLICANTS_START,
  GET_APPLICANTS_SUCCESS,
  GET_APPLICANTS_FAILURE,
  APPLY_FOR_JOB_START,
  APPLY_FOR_JOB_SUCCESS,
  APPLY_FOR_JOB_FAILURE,
  GET_APPLIED_JOBS_START,
  GET_APPLIED_JOBS_SUCCESS,
  GET_APPLIED_JOBS_FAILURE,
  CANCEL_JOB_APPLICATION_START,
  CANCEL_JOB_APPLICATION_SUCCESS,
  CANCEL_JOB_APPLICATION_FAILURE,
  LOGOUT_SUCCESS,
} from "../types";

const initialState = {
  jobs: [],
  totalResults: 0,
  userJobs: [],
  jobApplicants: [],
  currentJob: null,
  loaders: {
    creatingJob: null,
    editingJob: null,
    deletingJob: null,
    fetchingJobs: null,
    fetchingUserJobs: null,
    fetchingJobApplicants: null,
    gettingJob: null,
    addingQuestion: null,
    deletingQuestion: null,
    gettingApplicants: null,
    applyingForJob: null,
    gettingAppliedJobs: null,
    cancellingApplication: null,
  },
  errors: {
    creatingJob: false,
    editingJob: false,
    deletingJob: false,
    fetchingJobs: false,
    fetchingUserJobs: false,
    fetchingJobApplicants: false,
    gettingJob: false,
    addingQuestion: false,
    deletingQuestion: false,
    gettingApplicants: false,
    applyingForJob: false,
    gettingAppliedJobs: false,
    cancellingApplication: false,
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_JOB_START: {
      const st = { ...state };
      st.loaders.creatingJob = true;
      return st;
    }
    case CREATE_JOB_SUCCESS: {
      const st = { ...state };
      st.loaders.creatingJob = false;
      st.jobs = [{ ...payload }, ...st.jobs];
      st.userJobs = [{ ...payload }, ...st.userJobs];
      return st;
    }
    case CREATE_JOB_FAILURE: {
      const st = { ...state };
      st.errors = { ...st.errors, creatingJob: true };
      st.loaders = { ...st.loaders, creatingJob: undefined };
      return st;
    }
    case DELETE_JOB_START: {
      const st = { ...state };
      st.loaders = { ...st.loaders, deletingJob: true };
      return st;
    }
    case DELETE_JOB_SUCCESS: {
      const st = { ...state };
      st.loaders = { ...st.loaders, deletingJob: false };

      st.jobs = [...st.jobs.filter((job) => job._id !== payload)];
      st.userJobs = [...st.userJobs.filter((job) => job._id !== payload)];

      return st;
    }
    case DELETE_JOB_FAILURE: {
      const st = { ...state };
      st.errors = { ...st.errors, deletingJob: true };
      st.loaders = { ...st.loaders, deletingJob: undefined };
      return st;
    }
    case EDIT_JOB_START: {
      const st = { ...state };
      st.loaders = { ...st.loaders, editingJob: true };
      return st;
    }
    case EDIT_JOB_SUCCESS: {
      const st = { ...state };
      st.loaders = { ...st.loaders, editingJob: false };
      st.jobs = st.jobs.map((job) =>
        payload.jobId === job._id ? payload.newJob : job
      );
      st.userJobs = st.userJobs.map((job) =>
        payload.jobId === job._id ? payload.newJob : job
      );
      return st;
    }
    case EDIT_JOB_FAILURE: {
      const st = { ...state };
      st.errors = { ...st.errors, editingJob: true };
      st.loaders = { ...st.loaders, editingJob: undefined };
      return st;
    }
    case FETCH_JOBS_START: {
      const st = { ...state };
      st.loaders = { ...st.loaders, fetchingJobs: true };
      return st;
    }
    case FETCH_JOBS_SUCCESS: {
      const st = { ...state };
      st.loaders = { ...st.loaders, fetchingJobs: false };
      st.jobs = payload.jobs ? [...payload.jobs] : [];
      st.totalResults = payload.totalResults;
      return st;
    }
    case FETCH_JOBS_FAILURE: {
      const st = { ...state };
      st.errors = { ...st.errors, fetchingJobs: true };
      st.loaders = { ...st.loaders, fetchingJobs: undefined };
      return st;
    }

    case FETCH_USER_JOBS_START: {
      const st = { ...state };
      st.loaders = { ...st.loaders, fetchingUserJobs: true };
      return st;
    }
    case FETCH_USER_JOBS_SUCCESS: {
      const st = { ...state };
      st.loaders = { ...st.loaders, fetchingUserJobs: false };
      st.userJobs = [...payload];
      return st;
    }
    case FETCH_USER_JOBS_FAILURE: {
      const st = { ...state };
      st.errors = { ...st.errors, fetchingUserJobs: true };
      st.loaders = { ...st.loaders, fetchingUserJobs: undefined };
      return st;
    }

    case FETCH_JOB_APPLICANTS_START: {
      const st = { ...state };
      st.loaders = { ...st.loaders, fetchingJobApplicants: true };
      return st;
    }
    case FETCH_JOB_APPLICANTS_SUCCESS: {
      const st = { ...state };
      st.loaders = { ...st.loaders, fetchingJobApplicants: false };

      st.jobApplicants = [...payload];
      return st;
    }
    case FETCH_JOB_APPLICANTS_FAILURE: {
      const st = { ...state };
      st.errors = { ...st.errors, fetchingJobApplicants: true };
      st.loaders = { ...st.loaders, fetchingJobApplicants: undefined };
      return st;
    }

    case GET_JOB_START: {
      const st = { ...state };
      st.loaders = { ...st.loaders, gettingJob: true };
      return st;
    }
    case GET_JOB_SUCCESS: {
      const st = { ...state };
      st.loaders = { ...st.loaders, gettingJob: false };
      st.currentJob = { ...payload };
      return st;
    }
    case GET_JOB_FAILURE: {
      const st = { ...state };
      st.errors = { ...st.errors, gettingJob: true };
      st.loaders = { ...st.loaders, gettingJob: undefined };
      return st;
    }

    case ADD_QUESTION_START: {
      const st = { ...state };
      st.loaders = { ...st.loaders, addingQuestion: true };
      return st;
    }
    case ADD_QUESTION_SUCCESS: {
      const st = { ...state };
      st.loaders = { ...st.loaders, addingQuestion: false };
      st.currentJob = {
        ...st.currentJob,
        quiz: [...payload],
      };

      return st;
    }
    case ADD_QUESTION_FAILURE: {
      const st = { ...state };
      st.errors = { ...st.errors, addingQuestion: true };
      st.loaders = { ...st.loaders, addingQuestion: undefined };
      return st;
    }

    case DELETE_QUESTION_START: {
      const st = { ...state };
      st.loaders = { ...st.loaders, deletingQuestion: true };
      return st;
    }
    case DELETE_QUESTION_SUCCESS: {
      const st = { ...state };
      st.loaders = { ...st.loaders, deletingQuestion: false };
      st.currentJob = {
        ...st.currentJob,
        quiz: st.currentJob.quiz.filter((quiz) => quiz._id !== payload),
      };

      return st;
    }
    case DELETE_QUESTION_FAILURE: {
      const st = { ...state };
      st.errors = { ...st.errors, deletingQuestion: true };
      st.loaders = { ...st.loaders, deletingQuestion: undefined };
      return st;
    }
    //applicants
    case GET_APPLICANTS_START: {
      const st = { ...state };
      st.loaders = { ...st.loaders, gettingApplicants: true };
      return st;
    }
    case GET_APPLICANTS_SUCCESS: {
      const st = { ...state };
      st.loaders = { ...st.loaders, gettingApplicants: false };
      st.jobApplicants = [...payload];
      return st;
    }
    case GET_APPLICANTS_FAILURE: {
      const st = { ...state };
      st.errors = { ...st.errors, gettingApplicants: true };
      st.loaders = { ...st.loaders, gettingApplicants: undefined };
      return st;
    }

    case APPLY_FOR_JOB_START: {
      const st = { ...state };
      st.loaders = { ...st.loaders, applyingForJob: true };
      return st;
    }
    case APPLY_FOR_JOB_SUCCESS: {
      const st = { ...state };
      st.loaders = { ...st.loaders, applyingForJob: false };
      return st;
    }
    case APPLY_FOR_JOB_FAILURE: {
      const st = { ...state };
      st.errors = { ...st.errors, applyingForJob: true };
      st.loaders = { ...st.loaders, applyingForJob: undefined };
      return st;
    }

    case GET_APPLIED_JOBS_START: {
      const st = { ...state };
      st.loaders = { ...st.loaders, gettingAppliedJobs: true };
      return st;
    }
    case GET_APPLIED_JOBS_SUCCESS: {
      const st = { ...state };
      st.loaders = { ...st.loaders, gettingAppliedJobs: false };
      st.userJobs = [...payload];
      return st;
    }
    case GET_APPLIED_JOBS_FAILURE: {
      const st = { ...state };
      st.errors = { ...st.errors, gettingAppliedJobs: true };
      st.loaders = { ...st.loaders, gettingAppliedJobs: undefined };
      return st;
    }

    case CANCEL_JOB_APPLICATION_START: {
      const st = { ...state };
      st.loaders = { ...st.loaders, cancellingApplication: true };
      return st;
    }
    case CANCEL_JOB_APPLICATION_SUCCESS: {
      const st = { ...state };
      st.userJobs = st.userJobs.filter((job) => job._id !== payload);
      return st;
    }
    case CANCEL_JOB_APPLICATION_FAILURE: {
      const st = { ...state };
      st.errors = { ...st.errors, cancellingApplication: true };
      st.loaders = { ...st.loaders, cancellingApplication: undefined };
      return st;
    }
    case LOGOUT_SUCCESS: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
};
