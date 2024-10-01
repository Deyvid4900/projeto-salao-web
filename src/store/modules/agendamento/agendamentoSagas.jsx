import { takeLatest, all, call, put } from 'redux-saga/effects';
import { updateAgendamento } from './agendamentoSlice';
import {api} from '../../../services/api';
import { notification } from '../../../services/rsuite';

function* filterAgendamentos({ range }) {
  try {
    const { data: res } = yield call(api.post, '/agendamento/filter', {
      salaoId: localStorage.getItem('_dSlun'),
      range,
    });

    if (res.error) {
      notification('error', {
        placement: 'topStart',
        title: 'Ops...',
        description: res.message,
      });
      return false;
    }

    yield put(updateAgendamento({ agendamentos: res.agendamentos }));
  } catch (err) {
    notification('error', {
      placement: 'topStart',
      title: 'Ops...',
      description: err.message,
    });
  }
}

export default function* agendamentoSagas() {
  yield all([takeLatest('agendamento/filterAgendamentos', filterAgendamentos)]);
}
