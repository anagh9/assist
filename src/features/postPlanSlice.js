import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { plansApi } from "../Api";

const postPlansSlice = createSlice({
  name: "postPlans",
  initialState: {
    loading: false,
    data: [],
    error: "",
  },
  reducers: {
    postPlansRequest(state) {
      state.loading = true;
    },
    postPlansSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    },
    postPlansFailure(state, action) {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    },
  },
});

export const { postPlansRequest, postPlansSuccess, postPlansFailure } =
  postPlansSlice.actions;

export const postPlans =
  ({ result }) =>
  async (dispatch) => {
    const token = localStorage.getItem("authToken");

    let response = {};

    try {
      response = await axios.post(
        plansApi,
        {
          ...result,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(postPlansSuccess(response.data));
    } catch (error) {
      dispatch(postPlansFailure(error.message));
    }
  };

export default postPlansSlice.reducer;
