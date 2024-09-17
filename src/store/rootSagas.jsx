import { all, fork } from 'redux-saga/effects';
import colaboradorSaga from './modules/colaborador/colaboradorSagas';
import agendamentoSaga from './modules/agendamento/agendamentoSagas';
import servicosSaga from './modules/servicos/servicosSagas'; 
import clienteSaga from './modules/clientes/clientesSagas';


export default function* rootSaga() {
  yield all([
    fork(colaboradorSaga),
    fork(agendamentoSaga),
    fork(servicosSaga),
    fork(clienteSaga) // Certifique-se de incluir o saga do agendamento corretamente
  ]);
}
