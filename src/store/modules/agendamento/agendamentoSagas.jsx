import { call, put, all, takeLatest } from "redux-saga/effects";
import { api } from "../../../services/api";
import {filterAgendamentoRequest,filterAgendamentoFailure,filterAgendamentoSuccess} from "../agendamento/agendamentoSlice"

const salaoId = localStorage.getItem("_dSlun");

export function* filterAgendamento(action) {
  try {
    const response = yield call(api.post, "/agendamento/filter/",{
      salaoId: salaoId,
      range: {
        start: action.payload.start,
        end: action.payload.end,
      },
    });

    
    yield put(filterAgendamentoSuccess(response.data));
  } catch (error) {
    yield put(filterAgendamentoFailure(error.message));
  }
}

function* watchFilterAgendamento() {
  yield takeLatest(filterAgendamentoRequest.type, filterAgendamento);
}

export default function* rootSaga() {
  yield all([watchFilterAgendamento()]);
}
