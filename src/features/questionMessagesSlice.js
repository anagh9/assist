import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { questionMessagesApi } from '../Api';

const questionMessagesSlice = createSlice({
  name: 'questionMessages',
  initialState: {
    loading: false,
    data: [],
    error: ''
  },
  reducers: {
    questionMessagesRequest(state) {
      state.loading = true;
    },
    questionMessagesSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    },
    questionMessagesFailure(state, action) {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    }
  }
});

export const { questionMessagesRequest, questionMessagesSuccess, questionMessagesFailure } = questionMessagesSlice.actions;

export const questionMessages = () => async (dispatch) => {

  let response = []
  dispatch(questionMessagesRequest());
  try {
    response = await axios.get(questionMessagesApi, {
        headers: {
          'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ilc5QnNWbDZWM1NlSm9QN3kwel9MUCJ9.eyJpc3MiOiJodHRwczovL2Fpc3Npc3QudWsuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDY1MTU5ODIyZjI3Y2EyY2ZiMzc5MGVhNSIsImF1ZCI6WyJhcGkuYWlzc2lzdC5jb20iLCJodHRwczovL2Fpc3Npc3QudWsuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcxODE0ODQwNCwiZXhwIjoxNzE4MjM0ODA0LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXpwIjoiRkNXZ2dmV3h2cjdCdDRnM2pEZloyYkFYN3N2U3FUN1MiLCJwZXJtaXNzaW9ucyI6W119.xOIjfeiMlh6ZqHxXLpb4lO4jwF6c38QijBN5wolmWx_UsHLIelyMMwyQyDEEg-Q2mED5qZr6FufmGFTEWqkqBrzxg1xZulzaHmD9sEy2vXTYWxwofVOZeUVdlBcR1U0jUtMicWFtGdHrFliaa3DeB3zegT6oGy836YjgOXcSsc5Dj0sAFNk8OtRJqr1LWwPP4RBF7j3DnXp98pyoFd0WVujt98iiIo2kOodKyzvzDfLw9Qul1gndZPZXLYpufSwEJIyoRzXOzie2qa3jBYNNkXV7BRCVV-WFSifndug8PMJVPBylPS_7AjC6XOL3GOuZSjMlro_12dDhT5VxXdoZ7w`
        }
      })
      console.log(response)
    // dispatch(questionMessagesSuccess(response.data));
    const resp = {
      conversations: [{id: "convo", name: "Answer", messages: [{message: "please provide a set of feature hypotheses with optimal models to leverage for the quantitative analysis of game stop equity.", "from": "You", "timestamp": "2024-06-05T21:44:15.549746"}, {message: null, from: "Alice", timestamp: "2024-06-05T21:52:50.240635"}]}]}
    dispatch(questionMessagesSuccess(resp));
  } catch (error) {
    dispatch(questionMessagesFailure(error.message));
  }
};

export default questionMessagesSlice.reducer;
