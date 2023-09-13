const { createStore, applyMiddleware } = require("redux");
const axios = require("axios");
const thunk = require("redux-thunk").default;
const REQUEST_START = "REQUEST_START";
const REQUEST_SUCCESS = "REQUEST_SUCCESS";
const REQUEST_FAILURE = "REQUEST_FAILURE";

const initialState = {
  Post: [],
  error: "",
  loading: false,
};

const fetchPost = () => {
  return {
    type: REQUEST_START,
  };
};
const fetchPostSuccess = (post) => {
  return {
    type: REQUEST_SUCCESS,
    payload: post,
  };
};
const fetchPostFailure = (err) => {
  return {
    type: REQUEST_FAILURE,
    payload: err,
  };
};

const fetchPosts = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchPost());
      const data = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      dispatch(fetchPostSuccess(data));
    } catch (error) {
      dispatch(fetchPostFailure(error.message));
    }
  };
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_START:
      return {
        ...state,
        loading: true,
      };
    case REQUEST_SUCCESS:
      return {
        ...state,
        Post: action.payload,
        loading: true,
      };
    case REQUEST_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
  }
};

const store = createStore(postReducer, applyMiddleware(thunk));
store.subscribe(() => {
  const data = store.getState();
  console.log("🚀 ~ file: post.js:48 ~ store.subscribe ~ data:", data);
});

store.dispatch(fetchPosts());
