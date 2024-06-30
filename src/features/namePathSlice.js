import { createSlice } from '@reduxjs/toolkit';

const namePathSlice = createSlice({
  name: 'namePathSlice',
  initialState: {name: '', path: ''},
  reducers: {
    setNamePathSlice: (state, action) => {
      return action.payload;
    }
  }
});

export const { setNamePathSlice } = namePathSlice.actions;

export default namePathSlice.reducer;
