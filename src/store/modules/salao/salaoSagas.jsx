import { call, put, all, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchSalaoRequest,
  fetchSalaoSuccess,
  fetchSalaoFailure,
} from './salaoSlice';

function* fetchSalaoSaga(action) {
  const { nome, coordinates } = action.payload; // As coordenadas devem ser passadas corretamente
  
  try {
    const response = yield call(() => axios.post(`http://localhost:8000/salao/filter/nome/${nome}`, { coordinates })); // Corrigido para passar como objeto
    localStorage.setItem("_dSlun", response.data.salao._id);
    yield put(fetchSalaoSuccess(response.data));
  } catch (error) {
    yield put(fetchSalaoFailure(error.message));
  }
}

function* watchFetchAll() {
  yield takeLatest(fetchSalaoRequest.type, fetchSalaoSaga);
}

export default function* rootSaga() {
  yield all([watchFetchAll()]);
}
