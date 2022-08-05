import { configureStore, combineReducers } from "@reduxjs/toolkit";
import campaign from "./campaignSlice";
import payments from "./paymentsSlice";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

const combineReducer = combineReducers({
  campaign,
  payments,
});

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    let nextState;
    if (
      state.campaign.allCampaigns == undefined ||
      state.campaign.allCampaigns.length == 0
    ) {
      nextState = {
        ...state, // use previous state
        campaign: {
          allCampaigns: [
            ...state.campaign.allCampaigns,
            action.payload.campaign.allCampaigns,
          ],
        },
        payments: {
          allPayments: [
            // ...state.payments.allPayments,
            ...action.payload.payments.allPayments,
          ],
        },
      };
    } else {
      nextState = {
        ...state, // use previous state
        campaign: {
          allCampaigns: [...state.campaign.allCampaigns],
        },
        payments: {
          allPayments: [
            // ...state.payments.allPayments,
            ...action.payload.payments.allPayments,
          ],
        },
      };
    }

    return nextState;
  } else {
    return combineReducer(state, action);
  }
};

export const makeStore = () =>
  configureStore({
    reducer: masterReducer,
  });
export const wrapper = createWrapper(makeStore);
