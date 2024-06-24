import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { logsApi, questionLogsApi } from '../Api';
import { fetchData } from './logSlice';

const logSetActiveSlice = createSlice({
  name: 'logSetActive',
  initialState: {
    loading: false,
    data: [],
    error: ''
  },
  reducers: {
    setLogActiveRequest(state) {
      state.loading = true;
    },
    setLogActiveSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    },
    setLogActiveFailure(state, action) {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    }
  }
});

export const { setLogActiveRequest, setLogActiveSuccess, setLogActiveFailure } = logSetActiveSlice.actions;

export const setLogActive = (payload) => async (dispatch, getState) => {
  const {path, name, active} = payload || {}
  dispatch(setLogActiveRequest());
  
  const isQuestion = getState().isQuestion;

  if(path){
    const token = localStorage.getItem('authToken');

  try {
    let response = {}
    if(name){
      response = await axios.put(`${isQuestion ? questionLogsApi : logsApi}/${path}`, {name}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    }else {
      response = await axios.put(`${isQuestion ? questionLogsApi : logsApi}/${path}`, {active}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    }
    dispatch(setLogActiveSuccess(response.data));
  } catch (error) {
    dispatch(setLogActiveFailure(error.message));
  }
  dispatch(fetchData());
}
};

export default logSetActiveSlice.reducer;
