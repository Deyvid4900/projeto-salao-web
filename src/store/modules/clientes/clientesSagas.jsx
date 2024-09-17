// sagas/colaboradorSagas.js
import { call, put, all, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchAllClientesRequest,
  fetchAllClientesSuccess,
  fetchAllClientesFailure,
} from './clientesSlice';

function* fetchAllClientesSaga() {
  try {
    const response = yield call(() => axios.get(`http://localhost:8000/cliente/salao/${localStorage.getItem('_dSlun')}`));
    // const response = yield call(() => axios.get('https://api-production-cc80.up.railway.app/colaborador/salao/66d1fc606938c910b08d0b20'));
    yield put(fetchAllClientesSuccess(response.data));
  } catch (error) {
    yield put(fetchAllClientesFailure(error.message));
  }
}


function* watchFetchAll() {
  yield takeLatest(fetchAllClientesRequest.type, fetchAllClientesSaga);
}


export default function* rootSaga() {
  yield all([
    watchFetchAll(),
  ]);
}
