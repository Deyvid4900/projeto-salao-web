import { all, fork } from 'redux-saga/effects';
import colaboradorSaga from './modules/colaborador/colaboradorSagas';
import agendamentoSaga from './modules/agendamento/agendamentoSagas'; // Ajuste o caminho conforme necessário

export default function* rootSaga() {
  yield all([
    fork(colaboradorSaga),
    fork(agendamentoSaga), // Certifique-se de incluir o saga do agendamento corretamente
  ]);
}
