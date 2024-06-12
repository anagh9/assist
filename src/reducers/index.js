import { combineReducers } from '@reduxjs/toolkit';
import logReducer from '../features/logSlice';
import logSetActiveReducer from '../features/logSetActiveSlice'
import viewResearchReducer from '../features/viewResearchSlice';
import viewAnalysisReducer from '../features/viewResearchSlice';
import chatMessagesReducer from '../features/chatMessagesSlice';
import questionMessagesReducer from '../features/questionMessagesSlice';
import promptReducer from '../features/promptSlice';

const rootReducer = combineReducers({
  logs: logReducer,
  logSetActive: logSetActiveReducer,
  viewResearch: viewResearchReducer,
  viewAnalysis: viewAnalysisReducer,
  chatMessages: chatMessagesReducer,
  questionMessages: questionMessagesReducer,
  prompt: promptReducer
});

export default rootReducer;
