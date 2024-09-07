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
      state.data = payload
    },
    filterAgendamentoSuccess(state,data) {
      state.loading = false;
      state.payload = data
    //   state.data.agendamentos = data; // Corrigido para acessar `data`
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
