import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { plansApi } from "../Api";

const getPlansSlice = createSlice({
  name: "getPlans",
  initialState: {
    loading: false,
    data: [],
    error: "",
  },
  reducers: {
    getPlansRequest(state) {
      state.loading = true;
    },
    getPlansSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    },
    getPlansFailure(state, action) {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    },
  },
});

export const { getPlansRequest, getPlansSuccess, getPlansFailure } =
  getPlansSlice.actions;

export const getPlans = () => async (dispatch, getState) => {
  const token = localStorage.getItem("authToken");

  let response = {};

  try {
    response = await axios.get(plansApi, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getPlansSuccess(response.data));
  } catch (error) {
    dispatch(getPlansFailure(error.message));
  }
};

export default getPlansSlice.reducer;
