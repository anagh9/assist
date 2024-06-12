import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { logsApi } from '../Api';

const logSetActiveSlice = createSlice({
  name: 'logSetActive',
  initialState: {
    loading: false,
    data: [],
    error: ''
  },
  reducers: {
    setLogActiveRequest(state) {
      state.loading = true;
    },
    setLogActiveSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    },
    setLogActiveFailure(state, action) {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    }
  }
});

export const { setLogActiveRequest, setLogActiveSuccess, setLogActiveFailure } = logSetActiveSlice.actions;

export const setLogActive = (payload) => async (dispatch) => {
  const {path, active} = payload || {}
  dispatch(setLogActiveRequest());
  if(path){
  try {
    const response = await axios.put(`${logsApi}/${path}`, {active}, {
      headers: {
        'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ilc5QnNWbDZWM1NlSm9QN3kwel9MUCJ9.eyJpc3MiOiJodHRwczovL2Fpc3Npc3QudWsuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDY1MTU5ODIyZjI3Y2EyY2ZiMzc5MGVhNSIsImF1ZCI6WyJhcGkuYWlzc2lzdC5jb20iLCJodHRwczovL2Fpc3Npc3QudWsuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcxODE0ODQwNCwiZXhwIjoxNzE4MjM0ODA0LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXpwIjoiRkNXZ2dmV3h2cjdCdDRnM2pEZloyYkFYN3N2U3FUN1MiLCJwZXJtaXNzaW9ucyI6W119.xOIjfeiMlh6ZqHxXLpb4lO4jwF6c38QijBN5wolmWx_UsHLIelyMMwyQyDEEg-Q2mED5qZr6FufmGFTEWqkqBrzxg1xZulzaHmD9sEy2vXTYWxwofVOZeUVdlBcR1U0jUtMicWFtGdHrFliaa3DeB3zegT6oGy836YjgOXcSsc5Dj0sAFNk8OtRJqr1LWwPP4RBF7j3DnXp98pyoFd0WVujt98iiIo2kOodKyzvzDfLw9Qul1gndZPZXLYpufSwEJIyoRzXOzie2qa3jBYNNkXV7BRCVV-WFSifndug8PMJVPBylPS_7AjC6XOL3GOuZSjMlro_12dDhT5VxXdoZ7w`
      }
    });
    dispatch(setLogActiveSuccess(response.data));
  } catch (error) {
    dispatch(setLogActiveFailure(error.message));
  }
}
};

export default logSetActiveSlice.reducer;
