import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { summaryApi } from '../Api';

const summarySlice = createSlice({
  name: 'summary',
  initialState: {
    loading: false,
    data: [],
    error: ''
  },
  reducers: {
    summaryRequest(state) {
      state.loading = true;
    },
    summarySuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    },
    summaryFailure(state, action) {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    }
  }
});

export const { summaryRequest, summarySuccess, summaryFailure } = summarySlice.actions;

export const summary = (payload) => async (dispatch) => {

  const {name='', path=''} = payload || {}

  let response = []
  dispatch(summaryRequest());
  const token = localStorage.getItem('authToken');

  try {
    response = await axios.post(summaryApi, {name, path}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    dispatch(summarySuccess(response.data));
  } catch (error) {
    dispatch(summaryFailure(error.message));
  }
};

export default summarySlice.reducer;
