import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchLogsApi } from '../Api';

const logSlice = createSlice({
  name: 'logs',
  initialState: {
    loading: false,
    data: [],
    error: ''
  },
  reducers: {
    fetchDataRequest(state) {
      state.loading = true;
    },
    fetchDataSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    },
    fetchDataFailure(state, action) {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    }
  }
});

export const { fetchDataRequest, fetchDataSuccess, fetchDataFailure } = logSlice.actions;

export const fetchData = () => async (dispatch) => {

  let response = []
  dispatch(fetchDataRequest());
  try {
    response = {
      data:[
      {
          "active": false,
          "name": "South America Lithium",
          "path": "56b2f61c.txt"
      },
      {
          "active": false,
          "name": "Boeing vs Airbus",
          "path": "546a1dea.txt"
      },
      {
          "active": false,
          "name": "Apple AI",
          "path": "a5e45ed4.txt"
      },
      {
          "active": false,
          "name": "Real Estate London ",
          "path": "45cd2318.txt"
      },
      {
          "active": false,
          "name": "space mining",
          "path": "2bc4508c.txt"
      },
      {
          "active": false,
          "name": "Aviation",
          "path": "8cbb33bd.txt"
      },
      {
          "active": false,
          "name": "crypto mining",
          "path": "5e14c481.txt"
      },
      {
          "active": false,
          "name": "iipr ",
          "path": "ae4ba342.txt"
      },
      {
          "active": false,
          "name": "Netflix ",
          "path": "0df37dc8.txt"
      },
      {
          "active": false,
          "name": "Netflix ",
          "path": "f0a23984.txt"
      },
      {
          "active": false,
          "name": "Tesla",
          "path": "d1981066.txt"
      },
      {
          "active": false,
          "name": "space tourism ",
          "path": "ed4394d0.txt"
      },
      {
          "active": false,
          "name": "Apple stock",
          "path": "5ee3d558.txt"
      },
      {
          "active": false,
          "name": "Lockheed martin",
          "path": "c48a51f2.txt"
      },
      {
          "active": false,
          "name": "Africa renewables",
          "path": "bae9f488.txt"
      },
      {
          "active": false,
          "name": "Boeing ratios",
          "path": "cbc46d66.txt"
      },
      {
          "active": false,
          "name": "Tesla financials",
          "path": "e83d8cbe.txt"
      },
      {
          "active": false,
          "name": "Summary - Tesla financials",
          "path": "summary_e83d8cbe.txt"
      },
      {
          "active": false,
          "name": "Interest rate changes",
          "path": "2f35b628.txt"
      },
      {
          "active": false,
          "name": "Media UK",
          "path": "fd8fc122.txt"
      },
      {
          "active": false,
          "name": "Summary - Summary - Tesla financials",
          "path": "summary_summary_e83d8cbe.txt"
      },
      {
          "active": false,
          "name": "Summary - Summary - Tesla financials",
          "path": "summary_summary_e83d8cbe.txt"
      },
      {
          "active": false,
          "name": "Summary - Summary - Tesla financials",
          "path": "summary_summary_e83d8cbe.txt"
      },
      {
          "active": false,
          "name": "Summary - Summary - Tesla financials",
          "path": "summary_summary_e83d8cbe.txt"
      },
      {
          "active": true,
          "name": "Curry’s plc",
          "path": "599aa4d8.txt"
      },
      {
          "active": false,
          "name": "Summary - Curry’s plc",
          "path": "summary_599aa4d8.txt"
      }
    ]}
    const response1 = await axios.get(fetchLogsApi);
    dispatch(fetchDataSuccess(response.data));
  } catch (error) {
    dispatch(fetchDataSuccess(response.data));//Remove this

    // dispatch(fetchDataFailure(error.message));
  }
};

export const setActive = () => async (dispatch) => {

    let response = []
    dispatch(fetchDataRequest());
    try {
      const response1 = await axios.get(fetchLogsApi);
      dispatch(fetchDataSuccess(response.data));
    } catch (error) {
      dispatch(fetchDataSuccess(response.data));//Remove this
  
      // dispatch(fetchDataFailure(error.message));
    }
  };

export default logSlice.reducer;
