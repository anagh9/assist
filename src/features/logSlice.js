import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { logsApi, questionLogsApi } from '../Api';

const logSlice = createSlice({
  name: 'logs',
  initialState: {
    loading: false,
    data: [],
    error: ''
  },
  reducers: {
    fetchDataRequest(state) {
      state.loading = true;
    },
    fetchDataSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    },
    fetchDataFailure(state, action) {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    }
  }
});

export const { fetchDataRequest, fetchDataSuccess, fetchDataFailure } = logSlice.actions;

export const fetchData = () => async (dispatch, getState) => {

  const isQuestion = getState().isQuestion;

  let response = {}
  dispatch(fetchDataRequest());
  const token = localStorage.getItem('authToken');

  try {
    response = await axios.get(isQuestion ? questionLogsApi : logsApi, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    dispatch(fetchDataSuccess(response.data));
  } catch (error) {
    dispatch(fetchDataFailure(error.message));
  }
};

export default logSlice.reducer;
