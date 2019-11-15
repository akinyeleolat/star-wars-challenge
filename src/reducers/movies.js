import {
    FETCH_ALL_MOVIES,
    FETCH_MOVIES_DETAILS,
    FETCH_MOVIES_INFO,
    FILTER_MOVIE,
    ERROR_LOADING
  } from '../actions/types';
  
  const initialState = {
    movieList: [],
    movie:'',
    movieInfo:'',
    filteredCharacter:'',
    error:''
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
      case FILTER_MOVIE:
        return{
          ...state,
          filteredCharacter: action.payload
        }
        case ERROR_LOADING:
          return{
            ...state,
            error: action.payload
          }
      default:
        return state;
    }
  };
  export default MoviesReducers;