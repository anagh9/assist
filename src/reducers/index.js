import { combineReducers } from '@reduxjs/toolkit';
import logReducer from '../features/logSlice';
import logSetActiveReducer from '../features/logSetActiveSlice'
import viewResearchReducer from '../features/viewResearchSlice';
import viewAnalysisReducer from '../features/viewResearchSlice';

const rootReducer = combineReducers({
  logs: logReducer,
  logSetActive: logSetActiveReducer,
  viewResearch: viewResearchReducer,
  viewAnalysis: viewAnalysisReducer
});

export default rootReducer;
