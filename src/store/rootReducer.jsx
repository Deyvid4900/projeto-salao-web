// slices/index.js
import { combineReducers } from "redux";
import colaboradorReducer from "./modules/colaborador/colaboradorSlice";
import agendamentosReducer from "./modules/agendamento/agendamentoSlice";

const rootReducer = combineReducers({
  colaborador: colaboradorReducer,
  agendamento: agendamentosReducer,
});

export default rootReducer;
