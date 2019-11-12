import axios from 'axios'; 
import instance from '../config/axios';
import {
  FETCH_ALL_MOVIES,
  FETCH_MOVIES_DETAILS,
  FETCH_MOVIES_INFO,
  FILTER_MOVIE
} from './types';
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
  };
};

export const fetchFilteredCharacter = filteredCharacter =>{
  return{
    type: FILTER_MOVIE,
    payload: filteredCharacter
  };
};

export const fetchMovieInfo = movieInfo =>{
  return{
    type: FETCH_MOVIES_INFO,
    payload: movieInfo
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
          releaseDate: movie.release_date,
          movieUrl: movie.url
        }
        return newList
      })
      const movieData = sortData.sort((a,b)=> new Date(a.releaseDate) - new Date(b.releaseDate));
      dispatch(fetchMoviesList(movieData));
    };
  };

  export const getSingleMovies = (movieUrl) =>{
    return async dispatch => {
      const res = await axios.get(movieUrl);
      const movies = res.data;
      const {title, opening_crawl} = movies;
      const movieInfo ={
        title,
        opening_crawl
      }
      dispatch(fetchMovieInfo(movieInfo))
      const characters = await getMovieCharacterDetails(movies);
      const movieData = {
        characters
      }
      dispatch(fetchMovies(movieData));
    }
  }

export const filterMovie = (data, filter)=>{
  return async dispatch => {
    let filteredData;
    if(filter === 'all'){
     filteredData = data;
    }
    else{
      filteredData = await data.filter((movie)=> movie.gender === filter);
    }
    dispatch(fetchFilteredCharacter(filteredData));
  }
}