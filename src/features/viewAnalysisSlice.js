import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { logsApi } from '../Api';

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

export const viewAnalysis = (payload) => async (dispatch) => {
  const {viewAnalysisPath} = payload || {}
  dispatch(viewAnalysisRequest());
  if(viewAnalysisPath){
    const viewAnalysisPathHtml = viewAnalysisPath.replace(/\.txt/g, '.html')
    const token = localStorage.getItem('authToken');

  try {
    const response = await axios.get(`${logsApi}/organized-summary_${viewAnalysisPathHtml}`, {
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
