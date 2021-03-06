import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    background: 'linear-gradient(rgba(0, 0, 0, 0.742), rgba(0, 0, 0, 0.342))', 
    backgroundSize: 'cover',
    color: 'white',
  },
}));

export default function PaperSheet(props) {
  const classes = useStyles();
  const {children} = props;

  return (
    <Paper className={classes.root}>
    {children}
    </Paper>
  );
}
