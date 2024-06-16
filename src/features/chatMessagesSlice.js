import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { messagesApi } from '../Api';

const chatMessagesSlice = createSlice({
  name: 'chatMessages',
  initialState: {
    loading: false,
    data: [],
    error: ''
  },
  reducers: {
    chatMessagesRequest(state) {
      state.loading = true;
    },
    chatMessagesSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    },
    chatMessagesFailure(state, action) {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    }
  }
});

export const { chatMessagesRequest, chatMessagesSuccess, chatMessagesFailure } = chatMessagesSlice.actions;

export const chatMessages = () => async (dispatch) => {

  let response = []
  dispatch(chatMessagesRequest());
  const token = localStorage.getItem('authToken');

  try {
    response = await axios.get(messagesApi, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    dispatch(chatMessagesSuccess(response.data));
  } catch (error) {
    dispatch(chatMessagesFailure(error.message));
  }
};

export default chatMessagesSlice.reducer;
