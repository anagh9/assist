import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { killApi } from '../Api';

const killSlice = createSlice({
  name: 'kill',
  initialState: {
    loading: false,
    data: [],
    error: ''
  },
  reducers: {
    killRequest(state) {
      state.loading = true;
    },
    killSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    },
    killFailure(state, action) {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    }
  }
});

export const { killRequest, killSuccess, killFailure } = killSlice.actions;

export const kill = () => async (dispatch) => {

  let response = []
  dispatch(killRequest());
  const token = localStorage.getItem('authToken');

  try {
    response = await axios.get(killApi, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    dispatch(killSuccess(response.data));
  } catch (error) {
    dispatch(killFailure(error.message));
  }
};

export default killSlice.reducer;
