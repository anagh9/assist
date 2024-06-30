import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { createQuestionApi } from '../Api';
import { questionMessages } from '../features/questionMessagesSlice';

const createQuestionSlice = createSlice({
  name: 'createQuestion',
  initialState: {
    loading: false,
    data: '',
    error: ''
  },
  reducers: {
    createQuestionRequest(state) {
      state.loading = true;
    },
    createQuestionSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    },
    createQuestionFailure(state, action) {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    }
  }
});

export const { createQuestionRequest, createQuestionSuccess, createQuestionFailure } = createQuestionSlice.actions;

export const createQuestion = (payload) => async (dispatch) => {

  const {name=''} = payload || {}

  let response = []
  dispatch(createQuestionRequest());
  const token = localStorage.getItem('authToken');

  try {
    response = await axios.put(createQuestionApi, {name}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    dispatch(createQuestionSuccess(response.data));
  } catch (error) {
    dispatch(createQuestionFailure(error.message));
  }
  dispatch(questionMessages());
};

export default createQuestionSlice.reducer;
