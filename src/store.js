import { createStore, applyMiddleware, compose } from 'redux';
import {createPromise} from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const enhancers = [];

if (process.env.NODE_ENV === 'development') {

  if (typeof devToolsExtension === 'function') {
      enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  }
}
const middleware = [thunk,createPromise()];

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    ...enhancers
  )
);
export default store;
