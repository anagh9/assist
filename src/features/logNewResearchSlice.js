import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { logsApi } from '../Api';
import { fetchData } from './logSlice';

const logNewResearchSlice = createSlice({
  name: 'logNewResearch',
  initialState: {
    loading: false,
    data: [],
    error: ''
  },
  reducers: {
    setLogNewResearchRequest(state) {
      state.loading = true;
    },
    setLogNewResearchSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    },
    setLogNewResearchFailure(state, action) {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    }
  }
});

export const { setLogNewResearchRequest, setLogNewResearchSuccess, setLogNewResearchFailure } = logNewResearchSlice.actions;

export const setLogNewResearch = (payload) => async (dispatch) => {
  dispatch(setLogNewResearchRequest());
  
  const token = localStorage.getItem('authToken');

  try {
    const response = await axios.post(logsApi, {name:payload}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    dispatch(setLogNewResearchSuccess(response.data));
    dispatch(fetchData())
  } catch (error) {
    dispatch(setLogNewResearchFailure(error.message));
  }
};

export default logNewResearchSlice.reducer;
