import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { promptApi } from '../Api';
import { chatMessages } from './chatMessagesSlice';

const promptSlice = createSlice({
  name: 'promptSlice',
  initialState: {
    loading: false,
    data: [],
    error: ''
  },
  reducers: {
    promptRequest(state) {
      state.loading = true;
    },
    promptSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    },
    promptFailure(state, action) {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    }
  }
});

export const { promptRequest, promptSuccess, promptFailure } = promptSlice.actions;

export const prompt = (payload) => async (dispatch) => {

  const {input} = payload

  let response = []
  dispatch(promptRequest());
  const token = localStorage.getItem('authToken');

  try {
    response = await axios.post(promptApi, {input}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    dispatch(promptSuccess(response.data));
  } catch (error) {
    dispatch(promptFailure(error.message));
  }
  dispatch(chatMessages());
};

export default promptSlice.reducer;
