import React, { Component, Fragment } from 'react';
import { Select, FormControl, Typography} from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { getAllMovies, getSingleMovies, filterMovie } from '../../actions/moviesAction';
import PaperSheet from '../layout/PaperSheet';
import DisplayTable from '../queryComponent/DisplayTable';
import DisplayGif from '../../styles/assets/display.gif';
import Loader from '../../styles/assets/giphy.gif';
import Animate from '../layout/Animate';
import AnimateTitle from '../layout/AnimateTitle';


class Display extends Component {
    constructor(props){
        super(props)
        this.state = {
            tableData: [],
            movieId: '',
            filter:'',
            isLoading: false,
            animate:true,
        }
    }
    
    componentDidMount(){
      this.props.getAllMovies()
    }

    componentDidUpdate(nextProps) {
      if (this.props !== nextProps) {
        this.handleFilter();
      }
    }

    handleChange = async(event)  => {
      const {value} = event.target;
        this.setState({movieId: value});
        if(value){
          await this.props.getSingleMovies(value)
          this.setState({
            isLoading: true,
            animate: true
          })
           }
         const {movieDetail} = this.props
         if(movieDetail){
          this.setState({isLoading:false})
          this.setMovieCharacter(movieDetail);
          this.handleAnimation(movieDetail)
         }
         else{
           //alert error
         }
    };
    
    handleFilter = async (filterKey)=>{
      const {movieDetail} = this.props;
      const { characters} = movieDetail;
      if(filterKey &&(characters.length>0)){
       await this.props.filterMovie(characters,filterKey);
       this.setState({
         isLoading: true,
         filter: filterKey
        })
        
        const {filteredCharacter} = this.props;
        if(filteredCharacter && filteredCharacter.length>0){
        this.setMovieCharacter({characters: filteredCharacter});
        this.setState({
          isLoading:false,
          filter:'',
        })
      }
      else{
        //alert error
        this.setMovieCharacter(movieDetail);
        this.setState({
          isLoading:false,
          filter:'',
        })
      }
    } 
    }

    handleAnimation = data =>{
      const {opening_crawl}= data;
      if(opening_crawl){
        this.setState({animate: true}) 
      }
      setTimeout(() =>this.setState({animate:false}),5000)
    }
  
    
    renderMovieOption = (moviesList) =>{
      let movieOption;
      const style ={
        padding: '10px',
        paddingLeft: '10%',
        marginBottom:'20px',
        background:'#ccc'
      };
      const selectStyle = {
        width:'200px',
      }
    
      if(moviesList){
        movieOption = moviesList.map((movie, index) =>
        <option key={index} value={movie.movieUrl}>{movie.title}</option>
        )
    }
      return(
        <Paper style={style}>
          <form>
          <FormControl>
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
          </FormControl>
          </form>
        </Paper>
      )
    }
    renderMovieTitle = (data) =>{
      const {title} = data;
      const {animate} = this.state; 
      return(
        <Fragment>

        {animate? (
        <AnimateTitle>
        <h1>{title}</h1>
       </AnimateTitle>
       ):
       (
        <h1>{title}</h1>
       )
       }
       </Fragment>
      )
    }

    renderOpeningCrawl = data =>{
      const {opening_crawl} = data;
      const {animate} = this.state; 
      return(
        <Fragment>
       { animate?
         (<Animate>
         <Typography>{opening_crawl}</Typography>
         </Animate>):
         (<Typography>{opening_crawl}</Typography>)
       } 
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
              {moviesList.length<1? <img src={Loader} style={imageStyle} alt='loading ...'/>:
              <PaperSheet>
              {this.renderMovieOption(moviesList)}
              <Fragment>
                {!movieDetail? <img src={DisplayGif} width='100%' alt='loading'/>:  (
                  <Fragment>
                  {this.renderMovieTitle(movieInfo)}
                  {this.renderOpeningCrawl(movieInfo)}
                  {this.state.isLoading?
                  <img src={Loader} style={innerLoaderStyle} alt='loading ...'/> :
                  <DisplayTable tableData={this.state.tableData} getFilter={this.handleFilter} movieDetail={movieDetail}/>
                  }
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
  movieDetail: movies.movie,
  filteredCharacter: movies.filteredCharacter
});

const mapDispatchToProps = {
  getAllMovies,
  getSingleMovies,
  filterMovie
};


export default connect(mapStateToProps,mapDispatchToProps)(Display);