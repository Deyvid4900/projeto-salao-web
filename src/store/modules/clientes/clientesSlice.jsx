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
  },
});

export const {
  fetchAllClientesRequest,
  fetchAllClientesSuccess,
  fetchAllClientesFailure,
  selectedCliente,
} = clienteSlice.actions;

export default clienteSlice.reducer;
