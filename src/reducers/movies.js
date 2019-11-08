import {
    FETCH_ALL_MOVIES,
    FETCH_MOVIES_DETAILS
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