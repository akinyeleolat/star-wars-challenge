import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from '../styles';
import Container from '@material-ui/core/Container';
import Header from './layout/Header';
import DisplayComponent from './queryComponent/Display';





const Home = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Header/>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
        <DisplayComponent classes={classes}/>
        </Container>
      </main>

    </React.Fragment>
  );
}
export default Home;