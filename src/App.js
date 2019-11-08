import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import { getAllMovies, getSingleMovies } from './actions/moviesAction';
import Home from './components/Home';


import store from './store';

import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

import './index.css';


store.dispatch(getAllMovies());

store.dispatch(getSingleMovies(1));

toast.configure({
  autoClose: 2000,
  draggable: false,
})



const App = () =>{
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
      <ToastContainer/>
    </Provider>
        );
}

export default App;
