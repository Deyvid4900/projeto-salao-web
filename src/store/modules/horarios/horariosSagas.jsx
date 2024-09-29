import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import {
  updateHorario,
  resetHorario,
  setHorarios,
  setSaving,
  setFiltering,
  closeDrawer,
} from './horariosSlice';
import api from '../../../services/api';
import { notification } from 'rsuite';

export function* addHorario() {
  try {
    const { horario, form, components } = yield select((state) => state.horarios);
    yield put(setSaving(true));

    const { data: res } = yield call(api.post, '/horario', {
      ...horario,
      salaoId: '609310a1002ab333d1ae1716',
    });

    yield put(setSaving(false));

    if (res.error) {
      notification('error', {
        placement: 'topStart',
        title: 'Ops...',
        description: res.message,
      });
      return;
    }

    yield put({ type: 'horarios/allHorarios' });
    yield put(closeDrawer());
    yield put(resetHorario());

    notification('success', {
      placement: 'topStart',
      title: 'Feito!',
      description: 'Horário salvo com sucesso!',
    });
  } catch (err) {
    yield put(setSaving(false));
    notification('error', {
      placement: 'topStart',
      title: 'Ops...',
      description: err.message,
    });
  }
}

export function* allHorarios() {
  try {
    yield put(setFiltering(true));

    const { data: res } = yield call(api.get, '/horario/salao/609310a1002ab333d1ae1716');
    yield put(setFiltering(false));

    if (res.error) {
      notification('error', {
        placement: 'topStart',
        title: 'Ops...',
        description: res.message,
      });
      return;
    }

    yield put(setHorarios(res.horarios));
  } catch (err) {
    yield put(setFiltering(false));
    notification('error', {
      placement: 'topStart',
      title: 'Ops...',
      description: err.message,
    });
  }
}

export default all([
  takeLatest('horarios/addHorario', addHorario),
  takeLatest('horarios/allHorarios', allHorarios),
  // outros sagas aqui
]);
