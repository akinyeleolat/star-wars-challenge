import instance from '../config/axios';
import { FETCH_ALL_MOVIES, FETCH_MOVIES_DETAILS } from './types';
import getMovieCharacterDetails from '../utils/getMovieCharacter';

export const fetchMoviesList = moviesList => {
    return {
      type: FETCH_ALL_MOVIES,
      payload: moviesList
    };
  };

export const fetchMovies = movie =>{
  return{
    type: FETCH_MOVIES_DETAILS,
    payload: movie
  }
}

export const getAllMovies = () => {
    return async dispatch => {
      const res = await instance.get('/films');
      const movieList = res.data.results;
      const sortData = movieList.map((movie, index)=>{
        const newList = {
         movieId:  (index+1),
          title: movie.title,
          releaseDate: movie.release_date
        }
        return newList
      })
      const movieData = sortData.sort((a,b)=> new Date(a.releaseDate) - new Date(b.releaseDate));
      dispatch(fetchMoviesList(movieData));
    };
  };

  export const getSingleMovies = (movieId) =>{
    return async dispatch => {
      const res = await instance.get(`/films/${movieId}`);
      const movies = res.data;
      const {title, opening_crawl} = movies;
      const characters = await getMovieCharacterDetails(movies);
      const movieData = {
        title,
        opening_crawl,
        characters
      }
      dispatch(fetchMovies(movieData));
    }
  }