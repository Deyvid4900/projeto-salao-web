// slices/index.js
import { combineReducers } from "redux";
import colaboradorReducer from "./modules/colaborador/colaboradorSlice";
import agendamentosReducer from "./modules/agendamento/agendamentoSlice";
import servicosReducer from "./modules/servicos/servicosSlice";
import clienteReducer from "./modules/clientes/clientesSlice";
import salaoReducer from "./modules/salao/salaoSlice";
// import horariosReducer from "./modules/horarios/horariosSlice";

const rootReducer = combineReducers({
  colaborador: colaboradorReducer,
  agendamento: agendamentosReducer,
  servicos:servicosReducer,
  cliente:clienteReducer,
  salao:salaoReducer,
  // horarios:horariosReducer
});

export default rootReducer;
