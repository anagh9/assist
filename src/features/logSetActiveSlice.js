import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { logsApi } from '../Api';
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

export const setLogActive = (payload) => async (dispatch) => {
  const {path, name, active} = payload || {}
  dispatch(setLogActiveRequest());
  if(path){
    const token = localStorage.getItem('authToken');

  try {
    let response = {}
    if(name){
      response = await axios.put(`${logsApi}/${path}`, {name}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    }else if(active){
      response = await axios.put(`${logsApi}/${path}`, {active}, {
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
