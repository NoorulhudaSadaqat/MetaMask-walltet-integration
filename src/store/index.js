import { configureStore } from '@reduxjs/toolkit';
import walletReducer from './reducers';

const store = configureStore({
  reducer: {
    wallet: walletReducer,
  },
});

export default store;
