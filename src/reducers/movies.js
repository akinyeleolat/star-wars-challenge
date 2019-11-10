import {
    FETCH_ALL_MOVIES,
    FETCH_MOVIES_DETAILS,
    FETCH_MOVIES_INFO
  } from '../actions/types';
  
  const initialState = {
    movieList: [],
    movie:''
  };

  const MoviesReducers = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ALL_MOVIES:
        return {
          ...state,
          movieList: action.payload
        };
      case FETCH_MOVIES_INFO:
        return{
          ...state,
          movieInfo: action.payload
        }
      case FETCH_MOVIES_DETAILS:
        return{
          ...state,
          movie: action.payload
        }
      default:
        return state;
    }
  };
  export default MoviesReducers;