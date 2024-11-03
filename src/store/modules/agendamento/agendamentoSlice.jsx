import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  components: {
    modal: false,
    confirmDelete: false,
    drawer: false,
    tab: "dados-cadastrais", // dados-cadastrais, agendamentos, arquivos
    notification: {
      type: "",
      description: "",
    },
  },
  agendamento: {},
  agendamentos: [],
  newAgendamento: {},
  agenda: {},
  agendado: [],
  selectedSpecialist: {},
  days: [],
  hours: [],
  loadingAgendamento:false
};

const agendamentoSlice = createSlice({
  name: "agendamento",
  initialState,
  reducers: {
    updateLoading: (state, action) => {
      state.loadingAgendamento = action.payload
    },
    updateAgendamento: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateAgenda: (state, action) => {
      state.agenda = action.payload;
    },
    updateAgendado: (state, action) => {
      state.agendado = action.payload;
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
    updateSelectedSpecialist: (state, action) => {
      state.selectedSpecialist = action;
    },
    updateDays: (state, action) => {
      state.days = action;
    },
    updateHours: (state, action) => {
      state.hours = action;
    },
    setNotification: (state, action) => {
      state.components.notification = action.payload;
    },
  },
});

export const {
  setNotification,
  updateLoading,
  updateDays,
  updateHours,
  updateSelectedSpecialist,
  updateAgendamento,
  getServicosById,
  addAgendamento,
  addAgendamentoSuccess,
  addAgendamentoFailure,
  updateAgenda,
  updateAgendado,
} = agendamentoSlice.actions;
export default agendamentoSlice.reducer;
