import { call, put, all, takeLatest } from 'redux-saga/effects';
import { api } from '../../../services/api'; // Utilize o serviço api já configurado
import {
  fetchAllClientesRequest,
  fetchAllClientesSuccess,
  fetchAllClientesFailure,
} from './clientesSlice';

function* fetchAllClientesSaga() {
  try {
    const { data } = yield call(api.get, `/cliente/salao/${localStorage.getItem('_dSlun')}`);
    yield put(fetchAllClientesSuccess(data));
  } catch (error) {
    yield put(fetchAllClientesFailure(error.message));
  }
}

function* watchFetchAll() {
  yield takeLatest(fetchAllClientesRequest.type, fetchAllClientesSaga);
}

export default function* rootSaga() {
  yield all([watchFetchAll()]);
}
