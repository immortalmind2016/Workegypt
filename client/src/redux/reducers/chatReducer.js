import {
  GET_CONVERSATION_START,
  GET_CONVERSATION_SUCCESS,
  GET_CONVERSATION_FAILURE,
  FETCH_CONVERSATIONS_START,
  FETCH_CONVERSATIONS_SUCCESS,
  FETCH_CONVERSATIONS_FAILURE,
  ADD_NEW_MESSAGE,
  CHECK_AND_ADD_NEW_CONVERSATION,
} from "../types";

const initialState = {
  conversations: [],
  currentConversation: {},
  loaders: {
    gettingConversation: null,
    fetchingConversations: null,
    creatingConversation: null,
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CONVERSATION_START: {
      return {
        ...state,
        loaders: { ...state.loaders, gettingConversation: true },
      };
    }
    case GET_CONVERSATION_SUCCESS: {
      let st = { ...state };
      st.currentConversation = { ...payload };

      return {
        ...st,
        loaders: { ...state.loaders, gettingConversation: false },
      };
    }
    case GET_CONVERSATION_FAILURE: {
      return {
        ...state,
        loaders: { ...state.loaders, gettingConversation: undefined },
      };
    }
    /* ######################################## */
    case FETCH_CONVERSATIONS_START: {
      return {
        ...state,
        loaders: { ...state.loaders, fetchingConversations: true },
      };
    }
    case FETCH_CONVERSATIONS_SUCCESS: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          fetchingConversations: false,
        },
        conversations: [...payload],
      };
    }
    case FETCH_CONVERSATIONS_FAILURE: {
      return {
        ...state,
        loaders: { ...state.loaders, fetchingConversations: undefined },
      };
    }

    case ADD_NEW_MESSAGE: {
      let currentConv = { ...state.currentConversation };
      if (currentConv.messages) {
        currentConv.messages.push({ ...payload });
        return {
          ...state,
          currentConversation: { ...currentConv },
        };
      } else {
        return state;
      }
    }

    case CHECK_AND_ADD_NEW_CONVERSATION: {
      let newConv = state.conversations.filter(
        (conv) => conv._id !== payload._id
      );
      newConv.unshift({ ...payload });
      return {
        ...state,
        conversations: newConv,
      };
    }
    default:
      return state;
  }
};
