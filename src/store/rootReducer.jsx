// slices/index.js
import { combineReducers } from "redux";
import colaboradorReducer from "./modules/colaborador/colaboradorSlice";
import agendamentosReducer from "./modules/agendamento/agendamentoSlice";
import servicosReducer from "./modules/servicos/servicosSlice";
import clienteReducer from "./modules/clientes/clientesSlice";

const rootReducer = combineReducers({
  colaborador: colaboradorReducer,
  agendamento: agendamentosReducer,
  servicos:servicosReducer,
  cliente:clienteReducer
});

export default rootReducer;
