import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { logsApi } from '../Api';

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
  const {path, active} = payload || {}
  dispatch(setLogActiveRequest());
  if(path){
    const token = localStorage.getItem('authToken');

  try {
    const response = await axios.put(`${logsApi}/${path}`, {active}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    dispatch(setLogActiveSuccess(response.data));
  } catch (error) {
    dispatch(setLogActiveFailure(error.message));
  }
}
};

export default logSetActiveSlice.reducer;
