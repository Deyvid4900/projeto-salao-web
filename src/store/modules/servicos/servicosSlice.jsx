import { createSlice } from "@reduxjs/toolkit";

const servicosSlice = createSlice({
  name: "servicos",
  initialState: {
    behavior: 'create',
    components: {
      confirmDelete: false,
      drawer: false,
      tab: 'servicos',
    },
    form: {
      filtering: false,
      disabled: false,
      saving: false,
    },
    servico: {
      titulo: '',
      preco: '',
      comissao: '',
      duracao: '',
      recorrencia: '',
      descricao: '',
      status: 'A',
      arquivos: [],
    },
    servicos: [],
    loading: false,
    error: null,
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
    resetServico: (state) => {
      state.servico = {
        titulo: '',
        preco: '',
        comissao: '',
        duracao: '',
        recorrencia: '',
        descricao: '',
        status: 'A',
        arquivos: [],
      };
    },
    setServicos: (state, action) => {
      state.servicos = action.payload;
    },
    setServico: (state, action) => {
      state.servico = action.payload;
    },
    setLoading: (state, action) => {
      state.form.saving = action.payload;
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
  },
});

export const {
  fetchAllRequest,
  fetchAllSuccess,
  fetchAllFailure,
  updateServico,
  resetServico,
  setServicos,
  setServico,
  setLoading,
  setFiltering,
  toggleDrawer,
  toggleConfirmDelete,
} = servicosSlice.actions;

export default servicosSlice.reducer;
