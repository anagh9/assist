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
  try {
    response = await axios.get(messagesApi, {
        headers: {
          'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ilc5QnNWbDZWM1NlSm9QN3kwel9MUCJ9.eyJpc3MiOiJodHRwczovL2Fpc3Npc3QudWsuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDY1MTU5ODIyZjI3Y2EyY2ZiMzc5MGVhNSIsImF1ZCI6WyJhcGkuYWlzc2lzdC5jb20iLCJodHRwczovL2Fpc3Npc3QudWsuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcxODE0ODQwNCwiZXhwIjoxNzE4MjM0ODA0LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXpwIjoiRkNXZ2dmV3h2cjdCdDRnM2pEZloyYkFYN3N2U3FUN1MiLCJwZXJtaXNzaW9ucyI6W119.xOIjfeiMlh6ZqHxXLpb4lO4jwF6c38QijBN5wolmWx_UsHLIelyMMwyQyDEEg-Q2mED5qZr6FufmGFTEWqkqBrzxg1xZulzaHmD9sEy2vXTYWxwofVOZeUVdlBcR1U0jUtMicWFtGdHrFliaa3DeB3zegT6oGy836YjgOXcSsc5Dj0sAFNk8OtRJqr1LWwPP4RBF7j3DnXp98pyoFd0WVujt98iiIo2kOodKyzvzDfLw9Qul1gndZPZXLYpufSwEJIyoRzXOzie2qa3jBYNNkXV7BRCVV-WFSifndug8PMJVPBylPS_7AjC6XOL3GOuZSjMlro_12dDhT5VxXdoZ7w`
        }
      })
    dispatch(chatMessagesSuccess(response.data));
  } catch (error) {
    dispatch(chatMessagesFailure(error.message));
  }
};

export default chatMessagesSlice.reducer;