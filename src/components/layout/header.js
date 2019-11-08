  
import React, { Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import BookIcon from '@material-ui/icons/Book';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useStyles from '../../styles';

const Header = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <AppBar position="relative">
        <Toolbar>
          <BookIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
           Chocolate City De Artist
          </Typography>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default Header;