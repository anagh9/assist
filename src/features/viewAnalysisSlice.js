import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { logsApi, questionLogsApi } from '../Api';

const viewAnalysisSlice = createSlice({
  name: 'viewAnalysis',
  initialState: {
    loading: false,
    data: [],
    error: ''
  },
  reducers: {
    viewAnalysisRequest(state) {
      state.loading = true;
    },
    viewAnalysisSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    },
    viewAnalysisFailure(state, action) {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    }
  }
});

export const { viewAnalysisRequest, viewAnalysisSuccess, viewAnalysisFailure } = viewAnalysisSlice.actions;

export const viewAnalysis = (payload) => async (dispatch, getState) => {

  const isQuestion = getState().isQuestion;


  const {viewAnalysisPath} = payload || {}
  dispatch(viewAnalysisRequest());
  if(viewAnalysisPath){
    const viewAnalysisPathHtml = viewAnalysisPath.replace(/\.txt/g, '.html')
    const token = localStorage.getItem('authToken');

  let response = {}
  try {
    response = await axios.get(`${isQuestion ? questionLogsApi : logsApi}/organized-summary_${viewAnalysisPathHtml}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    dispatch(viewAnalysisSuccess(response.data));
  } catch (error) {
    dispatch(viewAnalysisFailure(error.message));
  }
}
};

export default viewAnalysisSlice.reducer;
