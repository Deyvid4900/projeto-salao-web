// sagas/rootSaga.js
import { all, fork } from 'redux-saga/effects';
import colaboradorSaga from './modules/colaborador/colaboradorSagas'; // Ajuste o caminho conforme necessário

export default function* rootSaga() {
  yield all([
    fork(colaboradorSaga), // Use fork para iniciar sagas em paralelo
    // Adicione outros sagas aqui se necessário
  ]);
}
