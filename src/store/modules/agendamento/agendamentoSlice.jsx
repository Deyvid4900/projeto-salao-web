import { createSlice } from '@reduxjs/toolkit';

const agendamentoSlice = createSlice({
  name: 'agendamento',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {

    filterAgendamentoRequest(state,payload){
      state.loading = true;
      state.error = null;
      state = payload
    },
    filterAgendamentoSuccess(state,action) {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    filterAgendamentoFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  filterAgendamentoRequest,
  filterAgendamentoSuccess,
  filterAgendamentoFailure,
} = agendamentoSlice.actions;

export default agendamentoSlice.reducer;
