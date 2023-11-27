import { createReducer } from '@reduxjs/toolkit';
import { SET_ACCOUNT, SET_CHAIN_ID } from './actionTypes';

const initialState = {
  account: null,
  chainId: null,
};

const walletReducer = createReducer(initialState, {
  [SET_ACCOUNT]: (state, action) => {
    state.account = action.payload;
  },
  [SET_CHAIN_ID]: (state, action) => {
    state.chainId = action.payload;
  },
});

export default walletReducer;
