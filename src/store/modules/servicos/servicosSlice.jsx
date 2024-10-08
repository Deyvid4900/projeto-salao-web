import { createSlice } from "@reduxjs/toolkit";

const servicosSlice = createSlice({
  name: "servicos",
  initialState: {
    behavior: "create",
    components: {
      confirmDelete: false,
      drawer: false,
      tab: "servicos",
    },
    form: {
      filtering: false,
      disabled: false,
      saving: false,
    },
    servico: {
      titulo: "",
      preco: "",
      comissao: "",
      duracao: "",
      recorrencia: "",
      descricao: "",
      status: "A",
      arquivos: [],
    },
    servicos: [],
    loading: false,
    error: null,
    selectedServico:[]
  },
  reducers: {
    fetchAllRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAllSuccess: (state, action) => {
      state.loading = false;
      state.servicos = action.payload;
    },
    fetchAllFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateServico: (state, action) => {
      state.servico = { ...state.servico, ...action.payload };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetServico: (state) => {
      state.servico = {
        titulo: "",
        preco: "",
        comissao: "",
        duracao: "",
        recorrencia: "",
        descricao: "",
        status: "A",
        arquivos: [],
      };
    },
    setServicos: (state, action) => {
      state.servicos = action.payload;
    },
    setSelectedServicos: (state, action) => {
      state.selectedServico = action.payload;
    },
    setServico: (state, action) => {
      state.servico = action.payload;
    },
    setFiltering: (state, action) => {
      state.form.filtering = action.payload;
    },
    toggleDrawer: (state, action) => {
      state.components.drawer = action.payload;
    },
    toggleConfirmDelete: (state, action) => {
      state.components.confirmDelete = action.payload;
    },
    setColaboradorId: (state, action) => {
      state._id = action.payload; // Armazena os serviços do colaborador
    },
  },
});

// Exportação das ações
export const {
  fetchAllRequest,
  fetchAllSuccess,
  fetchAllFailure,
  updateServico,
  resetServico,
  setServicos,
  setServico,
  setSelectedServicos,
  setLoading,
  setFiltering,
  toggleDrawer,
  toggleConfirmDelete,
  setColaboradorId, // Ação para armazenar serviços do colaborador
} = servicosSlice.actions;

export default servicosSlice.reducer;
