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
  const token = localStorage.getItem('authToken');
  try {
    response = await axios.get(questionMessagesApi, {
        headers: {
          'Authorization': `Bearer ${token}`
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
