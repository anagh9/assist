import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { tokensApi } from "../Api";

const tokenSlice = createSlice({
  name: "tokens",
  initialState: {
    loading: false,
    data: [],
    error: "",
  },
  reducers: {
    tokenRequest(state) {
      state.loading = true;
    },
    tokenSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    },
    tokenFailure(state, action) {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    },
  },
});

export const { tokenRequest, tokenSuccess, tokenFailure } = tokenSlice.actions;

export const tokens = () => async (dispatch) => {
  let response = [];
  dispatch(tokenRequest());

  const token = localStorage.getItem("authToken");

  try {
    response = await axios.get(tokensApi, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(tokenSuccess(response.data));
  } catch (error) {
    dispatch(tokenFailure(error.message));
  }
};

export default tokenSlice.reducer;
