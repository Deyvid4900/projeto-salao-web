import { call, put, all, takeLatest } from "redux-saga/effects";
import { api } from "../../../services/api";

const salaoId = localStorage.getItem("_dSlun");

export function* filterAgendamento(action) {
  try {
    const { start, end } = action.payload; // Pegue `start` e `end` do payload da ação

    // Faz a requisição à API com `call` sem `.then`
    const response = yield call(api.post, "/agendamento/filter", {
      salaoId,
      range: {
        inicio: start,
        final: end,
      },
    });

    // Coloca os dados de sucesso no estado com o `put`
    yield put({ type: "filterAgendamentoSuccess", data: response.data });
  } catch (error) {
    // Em caso de erro, dispare uma ação de falha
    yield put({ type: "filterAgendamentoFailure", error: error.message });
  }
}

// Watcher Saga
function* watchFilterAgendamento() {
  // Aguarde por ações do tipo "agendamento/filterAgendamentoRequest"
  yield takeLatest("agendamento/filterAgendamentoRequest", filterAgendamento);
}

// Root Saga
export default function* rootSaga() {
  yield all([watchFilterAgendamento()]);
}
