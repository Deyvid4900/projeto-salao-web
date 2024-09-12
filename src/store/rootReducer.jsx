// slices/index.js
import { combineReducers } from "redux";
import colaboradorReducer from "./modules/colaborador/colaboradorSlice";
import agendamentosReducer from "./modules/agendamento/agendamentoSlice";
import servicosReducer from "./modules/servicos/servicosSlice";

const rootReducer = combineReducers({
  colaborador: colaboradorReducer,
  agendamento: agendamentosReducer,
  servicos:servicosReducer
});

export default rootReducer;
