// reducers/dashboard.js
import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: null,
  reducers: {
    setData: (state, action) => action.payload,
  },
});

export const { setData } = dashboardSlice.actions;
export default dashboardSlice.reducer;
