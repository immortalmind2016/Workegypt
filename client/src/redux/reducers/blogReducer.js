import {
  UPLOAD_POST_START,
  UPLOAD_POST_SUCCESS,
  UPLOAD_POST_FAILURE,
  EDIT_POST_START,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAILURE,
  DELETE_POST_START,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  FETCH_POSTS_START,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  LOAD_MORE_POSTS_START,
  LOAD_MORE_POSTS_SUCCESS,
  LOAD_MORE_POSTS_FAILURE
} from "../types";
const initialState = {
  posts: [],
  currentPost: null,
  loaders: {
    uploadingPost: null,
    editingPost: null,
    deletingPost: null,
    fetchingPosts: null,
    loadingMorePosts: null
  },
  errors: {
    uploadingPost: false,
    editingPost: false,
    deletingPost: false,
    fetchingPosts: false,
    loadingMorePosts: false
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    /* adding post start */
    case UPLOAD_POST_START: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          uploadingPost: true
        },
        errors: { ...state.errors, uploadingPost: false }
      };
    }
    case UPLOAD_POST_SUCCESS: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          uploadingPost: false
        },
        errors: { ...state.errors, uploadingPost: false },
        posts: [payload, ...state.posts]
      };
    }
    case UPLOAD_POST_FAILURE: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          uploadingPost: undefined
        },
        errors: { ...state.errors, uploadingPost: true }
      };
    }
    /* adding post end */

    //Edit post start
    case EDIT_POST_START: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          editingPost: true
        },
        errors: { ...state.errors, editingPost: false }
      };
    }
    case EDIT_POST_SUCCESS: {
      const posts = state.posts.map(post => {
        if (post._id === payload.id) return { ...post, ...payload.newPost };
        return post;
      });

      return {
        ...state,
        posts,
        loaders: {
          ...state.loaders,
          editingPost: false
        },
        errors: { ...state.errors, editingPost: false }
      };
    }

    case EDIT_POST_FAILURE: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          editingPost: undefined
        },
        errors: { ...state.errors, editingPost: true }
      };
    }
    //edit post end

    //delete post start
    case DELETE_POST_START: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          deletingPost: true
        },
        errors: { ...state.errors, deletingPost: false }
      };
    }
    case DELETE_POST_SUCCESS: {
      const posts = state.posts.filter(post => post._id !== payload.id);
      return {
        ...state,
        posts,
        loaders: {
          ...state.loaders,
          deletingPost: false
        },
        errors: { ...state.errors, deletingPost: false }
      };
    }
    case DELETE_POST_FAILURE: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          deletingPost: undefined
        },
        errors: { ...state.errors, deletingPost: true }
      };
    }
    //delete post end

    //fetch post start
    case FETCH_POSTS_START: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          fetchingPosts: true
        },
        errors: { ...state.errors, fetchingPosts: false }
      };
    }
    case FETCH_POSTS_SUCCESS: {
      return {
        ...state,
        posts: payload instanceof Array ? [...payload] : [],
        loaders: {
          ...state.loaders,
          fetchingPosts: false
        },
        errors: { ...state.errors, fetchingPosts: false }
      };
    }
    case FETCH_POSTS_FAILURE: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          fetchingPosts: undefined
        },
        errors: { ...state.errors, fetchingPosts: true }
      };
    }
    //fetch post end

    //load more posts start
    case LOAD_MORE_POSTS_START: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          loadingMorePosts: true
        },
        errors: { ...state.errors, loadingMorePosts: false }
      };
    }
    case LOAD_MORE_POSTS_SUCCESS: {
      return {
        ...state,
        posts: [...state.posts, ...payload],
        loaders: {
          ...state.loaders,
          loadingMorePosts: false
        },
        errors: { ...state.errors, loadingMorePosts: false }
      };
    }
    case LOAD_MORE_POSTS_FAILURE: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          loadingMorePosts: undefined
        },
        errors: { ...state.errors, loadingMorePosts: true }
      };
    }
    //load more posts end

    default:
      return state;
  }
};
