import {
  CHANGE_COMPANY_PLAN_FAILURE,
  CHANGE_COMPANY_PLAN_SUCCESS,
  CHANGE_COMPANY_PLAN_START,
  ADMIN_LOGIN_START,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAILURE,
  ADMIN_GET_ANALYSIS_START,
  ADMIN_GET_ANALYSIS_SUCCESS,
  ADMIN_GET_ANALYSIS_FAILURE,
  ADMIN_GET_ANALYSIS_WEBSITE_START,
  ADMIN_GET_ANALYSIS_WEBSITE_SUCCESS,
  ADMIN_GET_ANALYSIS_WEBSITE_FAILURE,
  FETCH_COMPANIES_START,
  FETCH_COMPANIES_SUCCESS,
  FETCH_COMPANIES_FAILURE,
} from "../types";
const initialState = {
  analysis: null,
  websiteAnalysis: null,
  companies: {},
  loaders: {
    subscribingToPlan: null,
    login: null,
    getAnalysis: null,
    getWebsiteAnalysis: null,
    editEvent: null,
    fetchCompanies: null,
  },

  errors: {
    login: false,
    getWebsiteAnalysis: false,
    editEvent: false,
  },
};

const adminReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    //   company plan subscription start
    case CHANGE_COMPANY_PLAN_START: {
      return {
        ...state,
        loaders: { ...state.loaders, subscribingToPlan: true },
      };
    }
    case CHANGE_COMPANY_PLAN_SUCCESS: {
      return {
        ...state,
        loaders: { ...state.loaders, subscribingToPlan: false },
      };
    }
    case CHANGE_COMPANY_PLAN_FAILURE: {
      return {
        ...state,
        loaders: { ...state.loaders, subscribingToPlan: undefined },
      };
    }
    //   company plan subscription end

    // admin login start
    case ADMIN_LOGIN_START: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          login: true,
        },
        errors: {
          ...state.errors,
          login: false,
        },
      };
    }
    case ADMIN_LOGIN_SUCCESS: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          login: false,
        },
        errors: {
          ...state.errors,
          login: false,
        },
      };
    }
    case ADMIN_LOGIN_FAILURE: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          login: undefined,
        },
        errors: {
          ...state.errors,
          login: true,
        },
      };
    }
    // admin login end

    // admin get analysis start
    case ADMIN_GET_ANALYSIS_START: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          getAnalysis: true,
        },
        errors: {
          ...state.errors,
          getAnalysis: false,
        },
      };
    }
    case ADMIN_GET_ANALYSIS_SUCCESS: {
      return {
        ...state,
        analysis: payload,
        loaders: {
          ...state.loaders,
          getAnalysis: false,
        },
        errors: {
          ...state.errors,
          getAnalysis: false,
        },
      };
    }
    case ADMIN_GET_ANALYSIS_FAILURE: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          getAnalysis: undefined,
        },
        errors: {
          ...state.errors,
          getAnalysis: true,
        },
      };
    }
    // admin get analysis end

    // admin get website start
    case ADMIN_GET_ANALYSIS_WEBSITE_START: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          getWebsiteAnalysis: true,
        },
        errors: {
          ...state.errors,
          getWebsiteAnalysis: false,
        },
      };
    }
    case ADMIN_GET_ANALYSIS_WEBSITE_SUCCESS: {
      return {
        ...state,
        websiteAnalysis: payload,
        loaders: {
          ...state.loaders,
          getWebsiteAnalysis: false,
        },
        errors: {
          ...state.errors,
          getWebsiteAnalysis: false,
        },
      };
    }
    case ADMIN_GET_ANALYSIS_WEBSITE_FAILURE: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          getWebsiteAnalysis: undefined,
        },
        errors: {
          ...state.errors,
          getWebsiteAnalysis: true,
        },
      };
    }
    // admin get website end
    case FETCH_COMPANIES_START: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          fetchCompanies: true,
        },
      };
    }
    case FETCH_COMPANIES_SUCCESS: {
      return {
        ...state,
        companies: payload || {},

        loaders: {
          ...state.loaders,
          fetchCompanies: false,
        },
      };
    }

    case FETCH_COMPANIES_FAILURE: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          fetchCompanies: undefined,
        },
      };
    }

    default:
      return state;
  }
};

export default adminReducer;
