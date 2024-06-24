import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { logsApi, questionLogsApi } from '../Api';

const viewResearchSlice = createSlice({
  name: 'viewResearch',
  initialState: {
    loading: false,
    data: [],
    error: ''
  },
  reducers: {
    viewResearchRequest(state) {
      state.loading = true;
    },
    viewResearchSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    },
    viewResearchFailure(state, action) {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    }
  }
});

export const { viewResearchRequest, viewResearchSuccess, viewResearchFailure } = viewResearchSlice.actions;

export const viewResearch = (payload) => async (dispatch, getState) => {

  const isQuestion = getState().isQuestion;

  const {viewResearchPath} = payload || {}
  dispatch(viewResearchRequest());
  if(viewResearchPath){
    const token = localStorage.getItem('authToken');

  let response = {}
  try {
    response = await axios.get(`${isQuestion ? questionLogsApi : logsApi}/${viewResearchPath}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    dispatch(viewResearchSuccess(response.data));
  } catch (error) {
    dispatch(viewResearchFailure(error.message));
  }
}
};

export default viewResearchSlice.reducer;
