import { createSlice } from '@reduxjs/toolkit';

const isQuestionSlice = createSlice({
  name: 'isQuestion',
  initialState: false,
  reducers: {
    setIsQuestion: (state, action) => {
      return action.payload;
    }
  }
});

export const { setIsQuestion } = isQuestionSlice.actions;

export default isQuestionSlice.reducer;
