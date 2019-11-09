import React, { Component, Fragment } from 'react';
import { Select, FormControl, InputLabel, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllMovies, getSingleMovies } from '../../actions/moviesAction';
import Paper from '../layout/Paper';
import DisplayTable from '../queryComponent/DisplayTable';
import './display.css';

class Display extends Component {
    constructor(props){
        super(props)
        this.state = {
            tableData: [],
            movieId: '',
        }
    }
    componentDidMount(){
      this.props.getAllMovies()
    }
    handleChange =  event => {
        this.setState({movieId: event.target.value});
    };

    handleSubmit = async(event)  => {
      event.preventDefault();
      const {movieId} = this.state;
      if(movieId){
       await this.props.getSingleMovies(movieId)
        }
        const {movieDetail} = this.props
      if(movieDetail){
        this.setMovieCharacter(movieDetail);
      }
    };

    renderMovieOption = (moviesList) =>{
      // style button and display horizontally
      // add loading between each state change
      let movieOption;
      if(moviesList){
        movieOption = moviesList.map((movie, index) =>
        <option key={index} value={movie.movieUrl}>{movie.title}</option>
        )
      }
      return(
        <Fragment>
          <form  onSubmit={this.handleSubmit}>
          <FormControl>
          <InputLabel  htmlFor="movies">Movies</InputLabel>
          <Select
                  native
                  value={this.state.movieId}
                  onChange={this.handleChange}
                  inputProps={{
                  name: 'movieId',
                  id: 'movies',
                 }}
                >
          <option value="" />
          {movieOption}
          </Select>
          <button type="submit">View Details</button>
          </FormControl>
          </form>
        </Fragment>
      )
    }
    renderMovieTitle = (data) =>{
      const {title} = data;
      return(
        <h1>{title}</h1>
      )
    }

    renderOpeningCrawl = data =>{
      const {opening_crawl} = data;
      // add animation
      return(
        <Typography>{opening_crawl}</Typography>
      )
    }

    setMovieCharacter = data =>{
      const {characters} = data;
      if(characters){
        this.setState({tableData: characters})
      }
    }
    
    render() {
      const moviesList = this.props.movieList;
      const movieDetail = this.props.movieDetail;
        return (
            <div className='display'>
              <Paper>
              {this.renderMovieOption(moviesList)}
              <Paper>
                {!movieDetail? '...loading':  (
                  <Fragment>
                  {this.renderMovieTitle(movieDetail)}
                  {this.renderOpeningCrawl(movieDetail)}
                  <DisplayTable tableData={this.state.tableData}/>
                  </Fragment>
                  )}
              </Paper>
              </Paper> 
            </div>
        )
    }
}
Display.propTypes = {
  movieList: PropTypes.array.isRequired,
};



const mapStateToProps = ({movies}) => (
    {
  movieList: movies.movieList,
  movieDetail: movies.movie
});

export default connect(
  mapStateToProps,
  { getAllMovies, getSingleMovies }
)(Display);