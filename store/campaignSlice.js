import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCampaigns: [],
};

export const campaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    campaignFetch: (state, action) => {
      action.payload.map((data) => {
        state.allCampaigns = [...state.allCampaigns, ...[data]];
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { campaignFetch, isLoggedInFetch } = campaignSlice.actions;

export default campaignSlice.reducer;
