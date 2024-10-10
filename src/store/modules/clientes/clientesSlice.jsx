// slices/clienteSlice.js
import { createSlice } from "@reduxjs/toolkit";

const clienteSlice = createSlice({
  name: "cliente",
  initialState: {
    clientes: [],
    loading: false,
    error: null,
    cliente: {
      status: "",
      _id: "",
      nome: "",
      email: "",
      telefone: "",
      dataNascimento: "",
      sexo: "",
      dataCadastro: "",
    },
    isModalOpen: false, // Para controlar o modal
  },

  reducers: {
    fetchAllClientesRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAllClientesSuccess(state, action) {
      state.loading = false;
      state.clientes = action.payload;
    },
    fetchAllClientesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    selectedCliente(state, action) {
      state.cliente = { ...action.payload }; // Atualiza o estado com o cliente selecionado
    },
    openCadastroModal(state) {
      state.isModalOpen = true;
    },
    closeCadastroModal(state) {
      state.isModalOpen = false;
    },
    cadastrarClienteRequest(state) {
      state.loading = true;
      state.error = null;
    },
    cadastrarClienteSuccess(state, action) {
      state.loading = false;
      state.cliente = action.payload;
    },
    cadastrarClienteFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchAllClientesRequest,
  fetchAllClientesSuccess,
  fetchAllClientesFailure,
  selectedCliente,
  openCadastroModal,
  closeCadastroModal,
  cadastrarClienteRequest,
  cadastrarClienteSuccess,
  cadastrarClienteFailure,
} = clienteSlice.actions;

export default clienteSlice.reducer;
