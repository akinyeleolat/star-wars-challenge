import React, { Component, Fragment } from 'react';
import { Select, FormControl, Typography, Grid, Button} from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { getAllMovies, getSingleMovies } from '../../actions/moviesAction';
import PaperSheet from '../layout/PaperSheet';
import DisplayTable from '../queryComponent/DisplayTable';
import DisplayGif from '../../styles/assets/display.gif';
import Loader from '../../styles/assets/giphy.gif';


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
    // filter the current table data and return back to state
    // optionaly called display table 

    renderMovieOption = (moviesList) =>{
      // add loading between each state change
      let movieOption;
      const style ={
        padding: '10px',
        paddingLeft: '30%',
        marginBottom:'20px'
      }
      if(moviesList){
        movieOption = moviesList.map((movie, index) =>
        <option key={index} value={movie.movieUrl}>{movie.title}</option>
        )
    }
      return(
        <Paper style={style}>
          <form  onSubmit={this.handleSubmit}>
          <FormControl>
              <Grid container spacing={2} justify="center">
                <Grid item>
                <Select
                  native
                  value={this.state.movieId}
                  onChange={this.handleChange}
                  inputProps={{
                  name: 'movieId',
                  id: 'movies',
                 }}
                >
                <option value="">Select movie title</option>
                 {movieOption}
                </Select>
                </Grid>
                <Grid item>
                <Button type="submit" color="primary" variant="contained">View Details</Button>
                </Grid>
              </Grid>
          </FormControl>
          </form>
        </Paper>
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
            <div>
              {moviesList.length<1? <img src={Loader} width='70%' alt='loading ...'/>:
              <PaperSheet>
              {this.renderMovieOption(moviesList)}
              <Fragment>
                {!movieDetail? <img src={DisplayGif} width='100%' alt='loading'/>:  (
                  <Fragment>
                  {this.renderMovieTitle(movieDetail)}
                  {this.renderOpeningCrawl(movieDetail)}
                  <DisplayTable tableData={this.state.tableData}/>
                  </Fragment>
                  )}
              </Fragment>
              </PaperSheet> }
            </div>
        )
    }
}
Display.propTypes = {
  movieList: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};



const mapStateToProps = ({movies}) => (
    {
  movieList: movies.movieList,
  movieDetail: movies.movie
});

const mapDispatchToProps = {
  getAllMovies,
  getSingleMovies
};


export default connect(mapStateToProps,mapDispatchToProps)(Display);