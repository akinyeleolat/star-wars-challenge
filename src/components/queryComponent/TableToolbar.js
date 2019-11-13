import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import {FormControl, Select,Grid} from '@material-ui/core';
import {useToolbarStyles} from '../../styles/tableStyle';
  



const FilterDropDown = (props) =>{
  const [filterKey,setFilterKey] = useState('');
  const{filterHandler, rows} = props; 
  const {characters}= rows;
  let genderFilter;

  if(characters){
    const gender = [...new Set(characters.map((character) =>character.gender))]
    genderFilter = gender.map((item,index)=><option key={index} value={item}>{item}</option>)
   }
  

  const handleChange = (event)=>{
    setFilterKey(event.target.value);
    filterHandler(event.target.value);
  }
  const selectStyle = {
    width:'200px'
  }
  return(
      <form>
      <FormControl>
          <Grid container spacing={2} justify="center">
            <Grid item>
            <Select
              native
              value={filterKey}
              onChange={handleChange}
              inputProps={{
              name: 'filterKey',
              id: 'filterDropDown',
             }}
             style={selectStyle}
            >
            <option value=''>Filter by Gender</option>  
            <option value="all">All</option>
            {genderFilter}
            </Select>
            </Grid>
            <Grid item>
            </Grid>
          </Grid>
      </FormControl>
      </form>
  )
}

const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();
    const { numSelected, rows, getFilter} = props;
  
    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle">
            Character
          </Typography>
        )}
  
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <FilterDropDown filterHandler={getFilter} rows={rows}/>
        )}
      </Toolbar>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  export default EnhancedTableToolbar;
