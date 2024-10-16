import { createSlice } from '@reduxjs/toolkit';

const salaoSlice = createSlice({
  name: 'salao',
  initialState: {
    saloes: [],
    loading: false,
    error: null,
    currentSalao:{}
  },
  reducers: {
    fetchSalaoRequest(state) {
      state.loading = true;
      state.error = null; // Limpa o erro antes da nova requisição
    },
    fetchSalaoSuccess(state, action) {
      state.loading = false;
      state.saloes = action.payload; // Armazena os salões recebidos
    },
    fetchSalaoFailure(state, action) {
      state.loading = false;
      state.error = action.payload; // Armazena a mensagem de erro
    },
  },
});

// Exportando as ações
export const {
  fetchSalaoRequest,
  fetchSalaoSuccess,
  fetchSalaoFailure,
} = salaoSlice.actions;

// Exportando o reducer
export default salaoSlice.reducer;
