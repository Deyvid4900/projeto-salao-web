// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   behavior: 'create',
//   components: {
//     confirmDelete: false,
//     drawer: false,
//     view: 'week',
//   },
//   form: {
//     filtering: false,
//     disabled: true,
//     saving: false,
//   },
//   horario: {
//     dias: [],
//     inicio: '',
//     fim: '',
//     especialidades: [],
//     colaboradores: [],
//   },
//   horarios: [],
//   servicos: [],
//   colaboradores: [],
// };

// const horariosSlice = createSlice({
//   name: 'horarios',
//   initialState,
//   reducers: {
//     updateHorario(state, action) {
//       return { ...state, ...action.payload };
//     },
//     resetHorario(state) {
//       state.horario = initialState.horario;
//     },
//     setHorarios(state, action) {
//       state.horarios = action.payload;
//     },
//     setServicos(state, action) {
//       state.servicos = action.payload;
//     },
//     setColaboradores(state, action) {
//       state.colaboradores = action.payload;
//     },
//     setSaving(state, action) {
//       state.form.saving = action.payload;
//     },
//     setFiltering(state, action) {
//       state.form.filtering = action.payload;
//     },
//     closeDrawer(state) {
//       state.components.drawer = false;
//     },
//   },
// });

// export const {
//   updateHorario,
//   resetHorario,
//   setHorarios,
//   setServicos,
//   setColaboradores,
//   setSaving,
//   setFiltering,
//   closeDrawer,
// } = horariosSlice.actions;

// export default horariosSlice.reducer;
