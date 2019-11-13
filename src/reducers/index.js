import { combineReducers } from 'redux';
import {
  createMemoReducer,
  reduxPromiseMiddlewareConfig,
} from 'redux-promise-memo';
import movies from './movies';

const _memo = createMemoReducer(reduxPromiseMiddlewareConfig);

export default combineReducers({
  _memo,
  movies,
});