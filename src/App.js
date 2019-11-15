import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './components/Home';
import {getAllMovies} from './actions/moviesAction';
import withNetwork from './withNetwork';
import store from './store';
import './App.css';
import './index.css';


store.dispatch(getAllMovies);
toast.configure({
  autoClose: 2000,
  type: toast.TYPE.INFO,
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

export default withNetwork(App);
