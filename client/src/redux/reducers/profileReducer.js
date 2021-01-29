import {
  EDIT_PROFILE,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE,
  FETCH_PROFILE,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  LOGOUT_SUCCESS,
  UPLOAD_CV_START,
  UPLOAD_CV_SUCCESS,
  UPLOAD_CV_FAILURE,
  GET_SOME_PROFILES_START,
  GET_SOME_PROFILES_SUCCESS,
  GET_SOME_PROFILES_FAILURE,
  OPEN_CONTACT_SUCCESS,
} from "../types";
const initialState = {
  profileData: null,
  currentShownProfile: null,
  someProfiles: [],
  totalResults: 0,
  loaders: {
    profileEditing: null,
    profileFetching: null,
    shownProfileFetching: null,
    uploadingCV: null,
    gettingSomeProfiles: null,
  },
  errors: {
    profileEditing: false,
    profileFetching: false,
    uploadingCV: false,
    gettingSomeProfiles: false,
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    //sub__profile-editing

    case EDIT_PROFILE: {
      return { ...state, loaders: { ...state.loaders, profileEditing: true } };
    }
    case EDIT_PROFILE_SUCCESS: {
      return {
        ...state,
        loaders: { ...state.loaders, profileEditing: false },
        profileData: { ...payload.profile },
      };
    }

    case EDIT_PROFILE_FAILURE: {
      return {
        ...state,
        loaders: { ...state.loaders, profileEditing: undefined },
        errors: { ...state.errors, profileEditing: true },
      };
    }

    //sub__profile-fetching
    case FETCH_PROFILE: {
      return { ...state, loaders: { ...state.loaders, profileFetching: true } };
    }

    case FETCH_PROFILE_SUCCESS: {
      if (!!payload.isViewingProfile) {
        return {
          ...state,
          loaders: { ...state.loaders, shownProfileFetching: false },

          currentShownProfile: { ...payload.profile },
        };
      } else {
        return {
          ...state,
          loaders: { ...state.loaders, profileFetching: false },
          profileData: { ...payload.profile },
        };
      }
    }
    case FETCH_PROFILE_FAILURE: {
      return {
        ...state,
        loaders: { ...state.loaders, profileFetching: undefined },
        errors: { ...state.errors, profileFetching: true },
      };
    }

    //uploading cv
    case UPLOAD_CV_START: {
      return { ...state, loaders: { ...state.loaders, uploadingCV: true } };
    }

    case UPLOAD_CV_SUCCESS: {
      return {
        ...state,
        loaders: { ...state.loaders, uploadingCV: false },
      };
    }
    case UPLOAD_CV_FAILURE: {
      return {
        ...state,
        loaders: { ...state.loaders, uploadingCV: undefined },
        errors: { ...state.errors, uploadingCV: true },
      };
    }
    //logging out
    case LOGOUT_SUCCESS: {
      return {
        ...initialState,
      };
    }

    // getting some profiles
    case GET_SOME_PROFILES_START: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          gettingSomeProfiles: true,
        },
      };
    }
    case GET_SOME_PROFILES_SUCCESS: {
      return {
        ...state,
        someProfiles: payload?.profiles || [],
        totalResults: payload.totalResults || 0,
        loaders: {
          ...state.loaders,
          gettingSomeProfiles: false,
        },
      };
    }
    case GET_SOME_PROFILES_FAILURE: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          gettingSomeProfiles: undefined,
        },
      };
    }

    case OPEN_CONTACT_SUCCESS: {
      const st = { ...state };
      const count = state.profileData?.subscribe?.count;

      st.profileData.subscribe = {
        ...st.profileData.subscribe,
        count: count - 1,
      };
      console.log("state", st);
      console.log("count", count);
      if (count) {
        return { ...st };
      } else {
        return { ...state };
      }
    }

    default:
      return state;
  }
};
