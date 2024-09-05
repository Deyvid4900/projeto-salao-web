// slices/colaboradorSlice.js
import { createSlice } from '@reduxjs/toolkit';

const colaboradorSlice = createSlice({
  name: 'colaborador',
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
    fetchOneRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchOneSuccess(state, action) {
      state.loading = false;
      state.data.push(action.payload); // ajuste conforme necessário
    },
    fetchOneFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchAllRequest,
  fetchAllSuccess,
  fetchAllFailure,
  fetchOneRequest,
  fetchOneSuccess,
  fetchOneFailure,
} = colaboradorSlice.actions;

export default colaboradorSlice.reducer;
