import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  components: {
    modal: false,
  },
  agendamento: {},
  agendamentos: [],
  newAgendamento: {},
  agenda:{

  }
};

const agendamentoSlice = createSlice({
  name: "agendamento",
  initialState,
  reducers: {
    updateAgendamento: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateAgenda: (state, action) => {
      state.agenda = action.payload ;
    },
    getServicosById: (state, action) => {
      return state;
    },
    addAgendamento: (state, action) => {
      state.loading = true;
    },
    addAgendamentoSuccess: (state, action) => {
      state.loading = false;
      state.agendamentos.push(action.payload);
    },
    addAgendamentoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Outras actions síncronas podem ser adicionadas aqui
  },
});

export const {
  updateAgendamento,
  getServicosById,
  addAgendamento,
  addAgendamentoSuccess,
  addAgendamentoFailure,
  updateAgenda
} = agendamentoSlice.actions;
export default agendamentoSlice.reducer;
