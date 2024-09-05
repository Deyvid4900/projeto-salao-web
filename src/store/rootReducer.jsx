// slices/index.js
import { combineReducers } from 'redux';
import colaboradorReducer from './modules/colaborador/colaboradorSlice';

const rootReducer = combineReducers({
  colaborador: colaboradorReducer,
});

export default rootReducer;
