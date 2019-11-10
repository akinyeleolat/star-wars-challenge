  
import React, { Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useStyles from '../../styles';
import logo from '../../styles/assets/logo.png';

const Header = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <AppBar position="relative">
        <Toolbar className={classes.header}>
          <img src={logo} alt='logo'/>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default Header;