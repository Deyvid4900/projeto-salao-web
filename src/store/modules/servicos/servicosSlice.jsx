// slices/colaboradorSlice.js
import { createSlice } from '@reduxjs/toolkit';

const servicosSlice = createSlice({
  name: 'servicos',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchAllRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAllSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchAllFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchAllRequest,
  fetchAllSuccess,
  fetchAllFailure,
} = servicosSlice.actions;

export default servicosSlice.reducer;
