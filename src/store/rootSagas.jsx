import { all, fork } from 'redux-saga/effects';
import colaboradorSaga from './modules/colaborador/colaboradorSagas';
import agendamentoSaga from './modules/agendamento/agendamentoSagas';
import servicosSaga from './modules/servicos/servicosSagas'; 
import clienteSaga from './modules/clientes/clientesSagas';
import salaoSaga from './modules/salao/salaoSagas';
import horarioSaga from './modules/horarios/horariosSagas';


export default function* rootSaga() {
  yield all([
    fork(colaboradorSaga),
    fork(agendamentoSaga),
    fork(servicosSaga),
    fork(clienteSaga),
    fork(salaoSaga),
    // fork(horarioSaga) // Certifique-se de incluir o saga do agendamento corretamente
  ]);
}
