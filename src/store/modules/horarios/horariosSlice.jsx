// horariosSlice
import { createSlice } from '@reduxjs/toolkit';
import { setColaborador } from '../colaborador/colaboradorSlice';

const initialState = {
  behavior: 'create',
  components: {
    confirmDelete: false,
    drawer: false,
    view: 'week',
  },
  form: {
    filtering: false,
    disabled: true,
    saving: false,
  },
  horario: {
    dias: [],
    inicio: '',
    fim: '',
    especialidades: [],
    colaboradores: [],
  },
  horarios: [],
  servicos: [],
  colaboradorInfo: [],
  colaboradores:[],
  inicio:'',
  fim:''
};

const horariosSlice = createSlice({
  name: 'horarios',
  initialState,
  reducers: {
    updateHorario(state, action) {
      return { ...state, ...action.payload };
    },
    resetHorario(state) {
      state.horario = initialState.horario;
    },
    setHorarios(state, action) {
      state.horarios = action.payload;
      state.inicio = action.payload
      state.fim = action.payload
    },
    setServicos(state, action) {
      state.servicos = action.payload;
    },
    setColaboradores(state, action) {
      state.colaboradores = action.payload;
    },
    setColaboradoresInfo(state,action){
      state.colaboradorInfo = action.payload;
    },
    setSaving(state, action) {
      state.form.saving = action.payload;
    },
    setFiltering(state, action) {
      state.form.filtering = action.payload;
    },
    closeDrawer(state) {
      state.components.drawer = false;
    },
    closeConfirm(state) {
      state.components.confirmDelete = false;
    },
  },
});

export const {
  updateHorario,
  resetHorario,
  setHorarios,
  setServicos,
  setColaboradores,
  setSaving,
  setFiltering,
  closeDrawer,
  closeConfirm,
  setColaboradoresInfo
} = horariosSlice.actions;

export default horariosSlice.reducer;
