import { takeLatest, all, call, put } from "redux-saga/effects";
import { getServicosById, updateAgendamento,addAgendamento,addAgendamentoFailure,addAgendamentoSuccess, updateAgenda } from "./agendamentoSlice";
import { api } from "../../../services/api";
import moment from "moment";

function* filterDiasDisponiveis(payload){
  console.log(payload.action)
  const dia = moment().format('YYYY-MM-DDTHH:mm:ssZ') 
  const {_id} = payload.action
  try {
    const { data } = yield call(api.post, "agendamento/dias-disponiveis", {
      salaoId: localStorage.getItem("_dSlun"),
      data:dia,
      servicoId:_id
    });

    console.log(dia);

   yield put(updateAgenda(data))
  } catch (err) {
    // Lidando com o erro se necessário
    console.error("Erro ao filtrar dias disponiveis ", err);
  }
}

function* filterAgendamentos({ range }) {
  // console.log(range);
  try {
    const { data: res } = yield call(api.post, "/agendamento/filter", {
      salaoId: localStorage.getItem("_dSlun"),
      range,
    });

    // console.log(res);

    yield put(updateAgendamento({ agendamentos: res.agendamentos }));
  } catch (err) {
    // Lidando com o erro se necessário
    console.error("Erro ao filtrar agendamentos", err);
  }
}

function* handleAddAgendamento(action) {
  try {
    console.log(action.payload)
    const response = yield call(api.post, "/agendamento", action.payload); // Chama a API para criar o agendamento
    yield put(addAgendamentoSuccess(response.data)); // Dispara sucesso com a resposta da API
    yield call(filterAgendamentos)

  } catch (error) {
    yield put(addAgendamentoFailure(error.message)); // Dispara falha com a mensagem de erro
  }
}

export default function* agendamentoSagas() {
  yield all([
    takeLatest("agendamento/filterAgendamentos", filterAgendamentos),
    takeLatest("agendamento/filterDiasDisponiveis", filterDiasDisponiveis),
    takeLatest(addAgendamento.type, handleAddAgendamento)
  ]);
}
