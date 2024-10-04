import { takeLatest, all, call, put } from 'redux-saga/effects';
import { updateAgendamento } from './agendamentoSlice';
import { api } from '../../../services/api';

function* filterAgendamentos({ range }) {
  console.log(range);
  try {
    const { data: res } = yield call(api.post, '/agendamento/filter', {
      salaoId: localStorage.getItem('_dSlun'),
      range
    });

    console.log(res);

    yield put(updateAgendamento({ agendamentos: res.agendamentos }));
  } catch (err) {
    // Lidando com o erro se necessário
    console.error('Erro ao filtrar agendamentos', err);
  }
}

export default function* agendamentoSagas() {
  yield all([takeLatest('agendamento/filterAgendamentos', filterAgendamentos)]);
}
