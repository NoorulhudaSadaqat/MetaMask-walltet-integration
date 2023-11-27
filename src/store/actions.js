import { SET_ACCOUNT, SET_CHAIN_ID } from './actionTypes';

export const setAccount = (account) => ({
  type: SET_ACCOUNT,
  payload: account,
});

export const setChainId = (chainId) => ({
  type: SET_CHAIN_ID,
  payload: chainId,
});