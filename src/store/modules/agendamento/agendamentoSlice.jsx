import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  components: {
    modal: false,
  },
  agendamento: {},
  agendamentos: [],
};

const agendamentoSlice = createSlice({
  name: 'agendamento',
  initialState,
  reducers: {
    updateAgendamento: (state, action) => {
      return { ...state, ...action.payload };
    },
    // Outras actions síncronas podem ser adicionadas aqui
  },
});

export const { updateAgendamento } = agendamentoSlice.actions;
export default agendamentoSlice.reducer;
