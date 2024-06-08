import { combineReducers } from '@reduxjs/toolkit';
import logReducer from '../features/logSlice';

const rootReducer = combineReducers({
  logs: logReducer
});

export default rootReducer;
