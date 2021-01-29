import {
  UPLOAD_EVENT_START,
  UPLOAD_EVENT_SUCCESS,
  UPLOAD_EVENT_FAILURE,
  EDIT_EVENT_START,
  EDIT_EVENT_SUCCESS,
  EDIT_EVENT_FAILURE,
  DELETE_EVENT_START,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAILURE,
  FETCH_EVENTS_START,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE,
  LOAD_MORE_EVENTS_START,
  LOAD_MORE_EVENTS_SUCCESS,
  LOAD_MORE_EVENTS_FAILURE,
  SET_GOING_START,
  SET_GOING_SUCCESS,
  SET_GOING_FAILURE
} from "../types";
const initialState = {
  events: [],
  currentEvent: null,
  loaders: {
    uploadingEvent: null,
    editingEvent: null,
    deletingEvent: null,
    fetchingEvents: null,
    loadingMoreEvents: null,
    settingGoing: null
  },
  errors: {
    uploadingEvent: false,
    editingEvent: false,
    deletingEvent: false,
    fetchingEvents: false,
    loadingMoreEvents: false,
    settingGoing: false
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    /* adding event start */
    case UPLOAD_EVENT_START: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          uploadingEvent: true
        },
        errors: { ...state.errors, uploadingEvent: false }
      };
    }
    case UPLOAD_EVENT_SUCCESS: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          uploadingEvent: false
        },
        errors: { ...state.errors, uploadingEvent: false },
        events: [payload, ...state.events]
      };
    }
    case UPLOAD_EVENT_FAILURE: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          uploadingEvent: undefined
        },
        errors: { ...state.errors, uploadingEvent: true }
      };
    }
    /* adding event end */

    //Edit event start
    case EDIT_EVENT_START: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          editingEvent: true
        },
        errors: { ...state.errors, editingEvent: false }
      };
    }
    case EDIT_EVENT_SUCCESS: {
      const events = state.events.map(event => {
        if (event._id === payload.id) return { ...event, ...payload.newEvent };
        return event;
      });

      return {
        ...state,
        events,
        loaders: {
          ...state.loaders,
          editingEvent: false
        },
        errors: { ...state.errors, editingEvent: false }
      };
    }

    case EDIT_EVENT_FAILURE: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          editingEvent: undefined
        },
        errors: { ...state.errors, editingEvent: true }
      };
    }
    //edit event end

    //delete event start
    case DELETE_EVENT_START: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          deletingEvent: true
        },
        errors: { ...state.errors, deletingEvent: false }
      };
    }
    case DELETE_EVENT_SUCCESS: {
      const events = state.events.filter(event => event._id !== payload.id);
      return {
        ...state,
        events,
        loaders: {
          ...state.loaders,
          deletingEvent: false
        },
        errors: { ...state.errors, deletingEvent: false }
      };
    }
    case DELETE_EVENT_FAILURE: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          deletingEvent: undefined
        },
        errors: { ...state.errors, deletingEvent: true }
      };
    }
    //delete event end

    //fetch event start
    case FETCH_EVENTS_START: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          fetchingEvents: true
        },
        errors: { ...state.errors, fetchingEvents: false }
      };
    }
    case FETCH_EVENTS_SUCCESS: {
      return {
        ...state,
        events: payload instanceof Array ? [...payload] : [],
        loaders: {
          ...state.loaders,
          fetchingEvents: false
        },
        errors: { ...state.errors, fetchingEvents: false }
      };
    }
    case FETCH_EVENTS_FAILURE: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          fetchingEvents: undefined
        },
        errors: { ...state.errors, fetchingEvents: true }
      };
    }
    //fetch event end

    //load more events start
    case LOAD_MORE_EVENTS_START: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          loadingMoreEvents: true
        },
        errors: { ...state.errors, loadingMoreEvents: false }
      };
    }
    case LOAD_MORE_EVENTS_SUCCESS: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          loadingMoreEvents: false
        },
        errors: { ...state.errors, loadingMoreEvents: false }
      };
    }
    case LOAD_MORE_EVENTS_FAILURE: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          loadingMoreEvents: undefined
        },
        errors: { ...state.errors, loadingMoreEvents: true }
      };
    }
    //load more events end

    //set going start
    case SET_GOING_START: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          settingGoing: true
        },
        errors: { ...state.errors, settingGoing: false }
      };
    }
    case SET_GOING_SUCCESS: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          settingGoing: false
        },
        errors: { ...state.errors, settingGoing: false }
      };
    }

    case SET_GOING_FAILURE: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          settingGoing: undefined
        },
        errors: { ...state.errors, settingGoing: true }
      };
    }
    //set going end

    default:
      return state;
  }
};
