import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import {
  updateHorario,
  resetHorario,
  setHorarios,
  setServicos,
  setSaving,
  setFiltering,
  closeDrawer,
} from './horariosSlice';
import { api } from '../../../services/api';
import { notification } from '../../../services/rsuite';



export function* allServicos() {
  try {
    yield put(setFiltering(true)); // Sinaliza que está carregando

    const {data:res }  = yield call(api.get, `/servico/salao/${localStorage.getItem('_dSlun')}`); // Faz a requisição à API para obter os serviços
    yield put(setFiltering(false)); // Para o estado de carregamento

    if (res.error) {
      notification('error', {
        placement: 'topStart',
        title: 'Ops...',
        description: res.message,
      });
      return;
    }

    // Atualiza o estado com os serviços obtidos
    yield put(setServicos(res.servicos));
  } catch (err) {
    yield put(setFiltering(false));
    notification('error', {
      placement: 'topStart',
      title: 'Ops...',
      description: err.message,
    });
  }
}


export function* addHorario() {
  try {
    const { horario, form } = yield select((state) => state.horarios);
    yield put(setSaving(true));

    const { data: res } = yield call(api.post, '/horario', {
      ...horario,
      salaoId: localStorage.getItem('_dSlun'), // Obter salaoId do localStorage
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

    const { data: res } = yield call(api.get, `/horario/salao/${localStorage.getItem('_dSlun')}`);
    // console.log(res)

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

export function* saveHorario() {
  const { horario, form } = yield select((state) => state.horarios);

  try {
    yield put(setSaving(true));

    const { data: res } = yield call(api.put, `/horario/${horario._id}`, horario);
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

export function* removeHorario() {
  const { horario } = yield select((state) => state.horarios);

  try {
    yield put(setSaving(true));

    const { data: res } = yield call(api.delete, `/horario/${horario._id}`);
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

    notification('success', {
      placement: 'topStart',
      title: 'Feito!',
      description: 'Horário removido com sucesso!',
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

export function* filterColaboradores() {
  const { horarios } = yield select((state) => state);

  
  try {
    yield put(setFiltering(true));
    
    const { data: res } = yield call(api.post, `/horario/colaboradores/`, {
      servicos: horarios.servicos,
    });
    // console.log(horarios.servicos)
    yield put(setFiltering(false));
    
    if (res.error) {
      notification('error', {
        placement: 'topStart',
        title: 'Ops...',
        description: res.message,
      });
      return;
    }

    yield put(updateHorario({ colaboradores: res.colaboradores }));
  } catch (err) {
    yield put(setFiltering(false));
    notification('error', {
      placement: 'topStart',
      title: 'Ops...',
      description: err.message,
    });
  }
}


function* watchAllServicos() {
  yield takeLatest('horarios/allServicos', allServicos); 
}

function* watchAddHorario() {
  yield takeLatest('horarios/setHorario', addHorario);
}

function* watchAllHorarios() {
  yield takeLatest('horarios/allHorarios', allHorarios);
}

function* watchSaveHorario() {
  yield takeLatest('horarios/saveHorario', saveHorario);
}

function* watchRemoveHorario() {
  yield takeLatest('horarios/removeHorario', removeHorario);
}

function* watchFilterColaboradores() {
  yield takeLatest('horarios/filterColaboradores', filterColaboradores);
}

export default function* rootSaga() {
  yield all([
    watchAllServicos(),
    watchAddHorario(),
    watchAllHorarios(),
    watchSaveHorario(),
    watchRemoveHorario(),
    watchFilterColaboradores(),
  ]);
}
