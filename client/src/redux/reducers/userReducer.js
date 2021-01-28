import {
  FETCH_USER_START,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  EDIT_USER_SUCCESS,
  EDIT_USER_START,
  EDIT_USER_FAILURE,
  OPEN_CONTACT_START,
  OPEN_CONTACT_SUCCESS,
  OPEN_CONTACT_FAILURE,
  LOGOUT_SUCCESS,
} from "../types";
const initialState = {
  userData: undefined,
  userDataLoading: null,
  userIsEditing: null,
  contactOpeningLoader: null,

  errors: {
    fetchUserData: false,
    editUserData: false,
    contactOpening: null,
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_USER_START: {
      let st = { ...state };
      st.userDataLoading = true;
      return st;
    }

    case FETCH_USER_SUCCESS: {
      let st = { ...state };
      st.userDataLoading = false;
      st.userData = { ...st.userData, ...payload };
      return st;
    }
    case FETCH_USER_FAILURE: {
      let st = { ...state };
      st.userDataLoading = null;
      st.errors = { ...st.errors, fetchUserData: true };
      return st;
    }

    case EDIT_USER_START: {
      let st = { ...state };
      st.userIsEditing = true;

      return st;
    }
    case EDIT_USER_SUCCESS: {
      let st = { ...state };
      st.userIsEditing = false;
      st.userData = { ...st.userData, ...payload };
      return st;
    }

    case EDIT_USER_FAILURE: {
      let st = { ...state };
      st.userIsEditing = false;
      st.errors = { ...st.errors, editUserData: true };
      return st;
    }

    case OPEN_CONTACT_START: {
      return {
        ...state,
        contactOpeningLoader: true,
        errors: {
          ...state.errors,
          contactOpening: false,
        },
      };
    }
    case OPEN_CONTACT_SUCCESS: {
      return {
        ...state,
        contactOpeningLoader: false,
        errors: {
          ...state.errors,
          contactOpening: false,
        },
      };
    }
    case OPEN_CONTACT_FAILURE: {
      return {
        ...state,
        contactOpeningLoader: undefined,
        errors: {
          ...state.errors,
          contactOpening: true,
        },
      };
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
