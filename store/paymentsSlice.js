import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPayments: [],
};

export const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    paymentOverviewFetch: (state, action) => {
      // action.payload.map((data) => {
      //   state.allCampaigns = [...state.allCampaigns, ...[data]];
      // });
      action.payload.map((payment) => {
        state.allPayments = [...state.allPayments, ...[payment]];
      });
      // state.allPayments = [...action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { paymentOverviewFetch } = paymentsSlice.actions;

export default paymentsSlice.reducer;
