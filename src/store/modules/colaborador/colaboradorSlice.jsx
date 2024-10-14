import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  behavior: "create", // create, update, read
  components: {
    confirmDelete: false,
    drawer: false,
    tab: "dados-cadastrais", // dados-cadastrais, agendamentos, arquivos
    notification: {
      type: "",
      description: "",
    },
  },
  form: {
    filtering: false,
    disabled: true,
    saving: false,
  },
  colaborador: {
    email: "",
    nome: "",
    telefone: "",
    dataNascimento: "",
    sexo: "M",
    vinculo: "A",
    especialidades: [],
  },
  colaboradores: [],
  colaboradoresServico: [],
  servicos: [],
};

const colaboradorSlice = createSlice({
  name: "colaborador",
  initialState,
  reducers: {
    setBehaviorUpdate:(state)=>{
      state.behavior = "update";
    },
    setBehaviorCreate:(state)=>{
      state.behavior = "create";
    },
    updateColaborador: (state, action) => {
      return { ...state, ...action.payload };
    },
    filterColaborador: (state) => {
      state.form.filtering = true;
    },
    resetColaborador: (state) => {
      state.colaborador = initialState.colaborador;
    },
    setColaborador: (state, action) => {
      state.colaborador = action.payload;
    },
    setColaboradores: (state, action) => {
      state.colaboradores = action.payload;
    },
    setColaboradoresServico: (state, action) => {
      state.colaboradoresServico = action.payload;
    },
    setServicos: (state, action) => {
      state.servicos = action.payload;
    },
    fetchAllColaboradores: (state) => {},
    deleteColaborador: (state) => {},
    
    // Nova ação para definir a notificação
    setNotification: (state, action) => {
      state.components.notification = action.payload;
    },
  },
});

// Exportando as ações
export const {
  deleteColaborador,
  updateColaborador,
  filterColaborador,
  resetColaborador,
  setColaboradores,
  setColaboradoresServico,
  setBehaviorCreate,
  setBehaviorUpdate,
  setColaborador,
  setServicos,
  fetchAllColaboradores,
  setNotification, // Ação de notificação
} = colaboradorSlice.actions;

export const saveColaborador = createAction("colaborador/saveColaborador");
export const addColaborador = createAction("colaborador/addColaborador");

export default colaboradorSlice.reducer;
