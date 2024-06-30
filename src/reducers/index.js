import { combineReducers } from '@reduxjs/toolkit';
import logReducer from '../features/logSlice';
import logSetActiveReducer from '../features/logSetActiveSlice'
import viewResearchReducer from '../features/viewResearchSlice';
import viewAnalysisReducer from '../features/viewResearchSlice';
import chatMessagesReducer from '../features/chatMessagesSlice';
import questionMessagesReducer from '../features/questionMessagesSlice';
import promptReducer from '../features/promptSlice';
import logNewResearchReducer from '../features/logNewResearchSlice';
import isQuestionReducer from '../features/isQuestionSlice'
import namePathReducer from '../features/namePathSlice';

const rootReducer = combineReducers({
  logs: logReducer,
  logSetActive: logSetActiveReducer,
  logNewResearch: logNewResearchReducer,
  viewResearch: viewResearchReducer,
  viewAnalysis: viewAnalysisReducer,
  chatMessages: chatMessagesReducer,
  questionMessages: questionMessagesReducer,
  prompt: promptReducer,
  isQuestion: isQuestionReducer,
  namePath: namePathReducer
});

export default rootReducer;
