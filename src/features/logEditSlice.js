import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { logsApi, questionLogsApi } from '../Api';
import { viewResearch } from './viewResearchSlice';

const logEditSlice = createSlice({
  name: 'logEdit',
  initialState: {
    loading: false,
    data: [],
    error: ''
  },
  reducers: {
    setLogEditRequest(state) {
      state.loading = true;
    },
    setLogEditSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    },
    setLogEditFailure(state, action) {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    }
  }
});

export const { setLogEditRequest, setLogEditSuccess, setLogEditFailure } = logEditSlice.actions;

export const logEdit = (payload) => async (dispatch, getState) => {
  const { path, content }  = payload || {}
  
  const isQuestion = getState().isQuestion;

  if(path){
    const token = localStorage.getItem('authToken');

  try {
    let response = {}
      response = await axios.put(`${isQuestion ? questionLogsApi : logsApi}/${path}/content`, {content}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    dispatch(setLogEditSuccess(response.data));
  } catch (error) {
    dispatch(setLogEditFailure(error.message));
  }
  dispatch(viewResearch({ viewResearchPath: path }))
}
};

export default logEditSlice.reducer;
