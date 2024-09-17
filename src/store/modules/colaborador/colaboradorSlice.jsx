// slices/colaboradorSlice.js
import { createSlice } from '@reduxjs/toolkit';

const colaboradorSlice = createSlice({
  name: 'colaborador',
  initialState: {
    colaboradores: [],
    loading: false,
    error: null,
    colaborador:{
        foto: "",
        status: "",
        _id: "",
        nome: "",
        telefone: "",
        email: "",
        dataNascimento: "",
        sexo: "",
        dataCadastro: "",
        __v: "",
        vinculoId: "",
        vinculo: "",
        especialidades: [
            "",
        ]
    
    }
  },

  reducers: {
    fetchAllRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAllSuccess(state, action) {
      state.loading = false;
      state.colaboradores = action.payload;
    },
    fetchAllFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },



    
    fetchOneRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchOneSuccess(state, action) {
      state.loading = false;
      state = action.payload; // ajuste conforme necessário
    },
    fetchOneFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    selectedColaborador(state, action) {
      state.colaborador = { ...action.payload }; // Atualiza o estado com o cliente selecionado
    },
  },
});

export const {
  fetchAllRequest,
  fetchAllSuccess,
  fetchAllFailure,
  fetchOneRequest,
  fetchOneSuccess,
  fetchOneFailure,
  selectedColaborador
} = colaboradorSlice.actions;

export default colaboradorSlice.reducer;
