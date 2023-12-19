// store.js
import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './dashboard';

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
  // Other middleware or enhancers can be added here
});

export default store;
