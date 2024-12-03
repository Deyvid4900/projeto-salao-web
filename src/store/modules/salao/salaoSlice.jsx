import { createSlice } from '@reduxjs/toolkit';

const salaoSlice = createSlice({
  name: 'salao',
  initialState: {
    salao:{},
    loading: false,
    error: null,
    currentSalao:{},
    saloes:[]
  },
  reducers: {
    fetchSalaoRequest(state) {
      state.loading = true;
      state.error = null; // Limpa o erro antes da nova requisição
    },
    fetchSalaoSuccess(state, action) {
      state.loading = false;
      state.salao = action.payload; // Armazena os salões recebidos
    },
    fetchSalaoFailure(state, action) {
      state.loading = false;
      state.error = action.payload; // Armazena a mensagem de erro
    },
    setCurrentSalao: (state, action) => {
      state.currentSalao = {...action.payload, senha:""};
    },
    setSaloes: (state, action) => {
      state.saloes = {...action.payload};
    },
    resetSalaoState(state) {
      return {
        salao: {},
        loading: false,
        error: null,
        currentSalao: {},
        saloes: []
      };
    },
  },
});

// Exportando as ações
export const {
  setCurrentSalao,
  fetchSalaoRequest,
  fetchSalaoSuccess,
  fetchSalaoFailure,
  setSaloes,
  resetSalaoState,
} = salaoSlice.actions;

// Exportando o reducer
export default salaoSlice.reducer;
