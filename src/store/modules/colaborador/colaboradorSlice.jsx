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
    
    },especialidades:{

    }
  },

  reducers: {
    fetchAllColaboradoresRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAllColaboradoresSuccess(state, action) {
      state.loading = false;
      state.colaboradores = action.payload;
    },
    fetchAllColaboradoresFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },



    
    fetchOneColaboradorRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchOneColaboradorSuccess(state, action) {
      state.loading = false;
      state = action.payload; // ajuste conforme necessário
    },
    fetchOneColaboradorFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    selectedColaborador(state, action) {
      state.colaborador = { ...action.payload }; // Atualiza o estado com o cliente selecionado
    },

    catchEspecialidades(){
      state.especialidades
    }
  },
});

export const {
  fetchAllColaboradoresRequest,
  fetchAllColaboradoresSuccess,
  fetchAllColaboradoresFailure,
  fetchOneColaboradorRequest,
  fetchOneColaboradorSuccess,
  fetchOneColaboradorFailure,
  selectedColaborador
} = colaboradorSlice.actions;

export default colaboradorSlice.reducer;
