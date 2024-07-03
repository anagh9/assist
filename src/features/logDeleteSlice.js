import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { logsApi, questionLogsApi } from '../Api';
import { fetchData } from './logSlice';

const logDeleteSlice = createSlice({
  name: 'logDelete',
  initialState: {
    loading: false,
    data: [],
    error: ''
  },
  reducers: {
    setLogDeleteRequest(state) {
      state.loading = true;
    },
    setLogDeleteSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    },
    setLogDeleteFailure(state, action) {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    }
  }
});

export const { setLogDeleteRequest, setLogDeleteSuccess, setLogDeleteFailure } = logDeleteSlice.actions;

export const logDelete = (payload) => async (dispatch, getState) => {
  const path = payload || ''
  
  const isQuestion = getState().isQuestion;

  if(path){
    const token = localStorage.getItem('authToken');

  try {
    let response = {}
      response = await axios.delete(`${isQuestion ? questionLogsApi : logsApi}/${path}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    dispatch(setLogDeleteSuccess(response.data));
  } catch (error) {
    dispatch(setLogDeleteFailure(error.message));
  }
  dispatch(fetchData());
}
};

export default logDeleteSlice.reducer;
