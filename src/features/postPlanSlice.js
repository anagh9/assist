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
  ({ res }) =>
  async (dispatch) => {
    const token = localStorage.getItem("authToken");

    let response = {};

    try {
      response = await axios.post(
        plansApi,
        {
          ...res,
      },
        {
          headers: {
            Authorization: `Bearer ${token}.eyJpc3MiOiJodHRwczovL2Fpc3Npc3QudWsuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDY2ODU1ZWNmOWMxZjI2MWIwOTUzMGIzYiIsImF1ZCI6WyJhcGkuYWlzc2lzdC5jb20iLCJodHRwczovL2Fpc3Npc3QudWsuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcyODQxNTE3NCwiZXhwIjoxNzI4NTAxNTc0LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXpwIjoiRkNXZ2dmV3h2cjdCdDRnM2pEZloyYkFYN3N2U3FUN1MiLCJwZXJtaXNzaW9ucyI6W119.y9WGMlZwpjE2w-Ka9dOfBZUvokcQAotZIBuAmwF_r4Wp0MwZlcTFq2OK0PmOwCcCN7i2sX22RWGct3C6NqpTdAhqA06D5XhziZraqEwu0rK6trgHH5nFNtKdd6_uM0Id53aP3j8KhUE5PEBZXpMZNl4aC_0wk4r65mRO022_CZcVuAbrloJTpUogjWqx51g4EgjgGzwqCJZiNBZ6wYZ2f_NAx3MM5XFNdClza_GGHwThN3b9NGQ64ljP2lnl-rnMqTgGWXmO4RFnB9_RpDmLWib0WkSnKQf-2Tu6KJbqmLey_PKok-RC7Q1qfkvplfcDrwPR9iWza1iEvT9jAbqshg`,
          },
        }
      );
      dispatch(postPlansSuccess(response.data));
    } catch (error) {
      dispatch(postPlansFailure(error.message));
    }
  };

export default postPlansSlice.reducer;
