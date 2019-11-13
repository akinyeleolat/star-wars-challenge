import axios from 'axios'; 
import { memoize } from 'redux-promise-memo';
import instance from '../config/axios';
import {
  FETCH_ALL_MOVIES,
  FETCH_MOVIES_DETAILS,
  FETCH_MOVIES_INFO,
  FILTER_MOVIE
} from './types';

import getMovieCharacterDetails from '../utils/getMovieCharacter';

const _fetchMoviesList = moviesList => {
    return {
      type: FETCH_ALL_MOVIES,
      payload: moviesList
    };
  };

export const memoizedFetchMoviesList = memoize(_fetchMoviesList, FETCH_ALL_MOVIES);

const _fetchMovies = movie =>{
  return{
    type: FETCH_MOVIES_DETAILS,
    payload: movie
  };
};

export const memoizedFetchMovies = memoize(_fetchMovies,FETCH_MOVIES_DETAILS)

const _fetchFilteredCharacter = filteredCharacter =>{
  return{
    type: FILTER_MOVIE,
    payload: filteredCharacter
  };
};
export const memoizedFilteredCharacter = memoize(_fetchFilteredCharacter,FILTER_MOVIE)

const _fetchMovieInfo = movieInfo =>{
  return{
    type: FETCH_MOVIES_INFO,
    payload: movieInfo
  }
}

export const memoizedFetchMovieInfo = memoize(_fetchMovieInfo, FETCH_MOVIES_INFO)

export const getAllMovies = () => {
    return async dispatch => {
      const res = await instance.get('/films');
      console.log('status',res.status)
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
      dispatch(memoizedFetchMoviesList(movieData));
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
      dispatch(memoizedFetchMovieInfo(movieInfo))
      const characters = await getMovieCharacterDetails(movies);
      const movieData = {
        characters
      }
      dispatch(memoizedFetchMovies(movieData));
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
    dispatch(memoizedFilteredCharacter(filteredData));
  }
}