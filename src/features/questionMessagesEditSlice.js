import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { questionMessagesApi } from '../Api';
import { questionMessages } from './questionMessagesSlice';

const questionMessagesEditSlice = createSlice({
  name: 'questionMessagesEdit',
  initialState: {
    loading: false,
    data: [],
    error: ''
  },
  reducers: {
    questionMessagesEditRequest(state) {
      state.loading = true;
    },
    questionMessagesEditSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    },
    questionMessagesEditFailure(state, action) {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    }
  }
});

export const { questionMessagesEditRequest, questionMessagesEditSuccess, questionMessagesEditFailure } = questionMessagesEditSlice.actions;

export const questionMessagesEdit = (payload) => async (dispatch) => {

  const {id, name} = payload

  let response = []
  dispatch(questionMessagesEditRequest());
  const token = localStorage.getItem('authToken');

  try {
    response = await axios.put(`${questionMessagesApi}/${id}`, {name}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    dispatch(questionMessagesEditSuccess(response.data));
  } catch (error) {
    dispatch(questionMessagesEditFailure(error.message));
  }
  dispatch(questionMessages())
};

export default questionMessagesEditSlice.reducer;
