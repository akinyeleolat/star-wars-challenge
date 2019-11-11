import React, { Component, Fragment } from 'react';
import { Select, FormControl, Typography, Grid, Button} from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/icons/LocalActivity';
import { getAllMovies, getSingleMovies } from '../../actions/moviesAction';
import PaperSheet from '../layout/PaperSheet';
import DisplayTable from '../queryComponent/DisplayTable';
import DisplayGif from '../../styles/assets/display.gif';
import Loader from '../../styles/assets/giphy.gif';
import StarLoader from '../../styles/assets/star-wars.gif';
import Animate from '../layout/Animate';
import AnimateTitle from '../layout/AnimateTitle';


class Display extends Component {
    constructor(props){
        super(props)
        this.state = {
            tableData: [],
            movieId: '',
            isLoading: false
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
       this.setState({isLoading: true})
        }

      const {movieDetail} = this.props
      if(movieDetail){
        this.setMovieCharacter(movieDetail);
        setTimeout(() =>this.setState({isLoading:false}),2000)
      }
    };
    // filter the current table data and return back to state
    // optionaly called display table 

    renderMovieOption = (moviesList) =>{
      let movieOption;
      const style ={
        padding: '10px',
        paddingLeft: '25%',
        marginBottom:'20px',
        background:'#ccc'
      };
      const selectStyle = {
        width:'200px'
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
                 style={selectStyle}
                >
                <option value="">Select movie title</option>
                 {movieOption}
                </Select>
                </Grid>
                <Grid item>
                <Button type="submit" color="inherit" variant="outlined"><Icon/>View Movie Details</Button>
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
        <AnimateTitle>
        <h1>{title}</h1>
        </AnimateTitle>
      )
    }

    renderOpeningCrawl = data =>{
      const {opening_crawl} = data;  
      return(
        <Fragment>
        <Animate>
        <Typography>{opening_crawl}</Typography>
        </Animate>
         </Fragment> 
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
      const movieInfo = this.props.movieInfo;
      const imageStyle = {
        width: '100%',
        opacity:'0.7',
      }
      const innerLoaderStyle = {
        width: '70%',
        opacity:'0.7',
        paddingLeft: '25%'
      }
        return (
            <div>
              {moviesList.length<1? <img src={StarLoader} style={imageStyle} alt='loading ...'/>:
              <PaperSheet>
              {this.renderMovieOption(moviesList)}
              <Fragment>
                {!movieDetail? <img src={DisplayGif} width='100%' alt='loading'/>:  (
                  <Fragment>
                  {this.renderMovieTitle(movieInfo)}
                  {this.renderOpeningCrawl(movieInfo)}
                  {this.state.isLoading?<img src={Loader} style={innerLoaderStyle} alt='loading ...'/> : <DisplayTable tableData={this.state.tableData}/>}
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
  movieInfo: movies.movieInfo,
  movieDetail: movies.movie
});

const mapDispatchToProps = {
  getAllMovies,
  getSingleMovies
};


export default connect(mapStateToProps,mapDispatchToProps)(Display);