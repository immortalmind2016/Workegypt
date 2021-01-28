import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGIN_START,
  REGISTER_FAILED,
  REGISTER_START,
  REGISTER_SUCCESS,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  TOKEN_VALID,
  TOKEN_INVALID
} from "../types";
const initialState = {
  isAuth: false,
  isLogging: null,
  isRegistering: null,
  name: undefined,
  isLoggingOut: null,
  error: {
    login_err: false,
    register_err: false
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    //sub__login
    case LOGIN_START: {
      return {
        ...state,
        isLogging: true,
        error: {
          ...state.error,
          login_err: false
        }
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLogging: false,
        error: { ...state.error, login_err: false },
        isAuth: true,
        name: payload.name
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        isLogging: false,
        error: {
          ...state.error,
          login_err: { ...payload }
        }
      };
    }

    //sub__register
    case REGISTER_START: {
      return {
        ...state,
        isRegistering: true
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        isRegistering: false,
        error: { ...state.error, register_err: false }
      };
    }

    case REGISTER_FAILED: {
      return {
        ...state,
        isRegistering: false,
        error: {
          ...state.error,
          register_err: true
        }
      };
    }

    //sub__validate-token
    case TOKEN_VALID: {
      return {
        ...state,
        isAuth: true
      };
    }

    case TOKEN_INVALID: {
      return {
        ...state,
        isAuth: false
      };
    }
    //sub__logout
    case LOGOUT_START: {
      return {
        ...state,
        isLoggingOut: true
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...initialState,
        isAuth: false,
        isLoggingOut: false
      };
    }

    default:
      return state;
  }
};
