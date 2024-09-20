// sagas/colaboradorSagas.js
import { call, put, all, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchAllColaboradoresRequest,
  fetchAllColaboradoresSuccess,
  fetchAllColaboradoresFailure,
  fetchOneColaboradorRequest,
  fetchOneColaboradorSuccess,
  fetchOneColaboradorFailure,
} from './colaboradorSlice';

function* fetchAllSaga() {
  try {
    const response = yield call(() => axios.get(`http://localhost:8000/colaborador/salao/${localStorage.getItem('_dSlun')}`));
    // const response = yield call(() => axios.get('https://api-production-cc80.up.railway.app/colaborador/salao/66d1fc606938c910b08d0b20'));
    yield put(fetchAllColaboradoresSuccess(response.data));
  } catch (error) {
    yield put(fetchAllColaboradoresFailure(error.message));
  }
}

function* fetchOneSaga(action) {
  const filter = {
    filters: {
      _id: action.payload,
    },
  }
  try {
    // const response = yield call(() => axios.post(`https://api-production-cc80.up.railway.app/colaborador/filter`,filter));
    const response = yield call(() => axios.post(`http://localhost:8000/colaborador/filter`,filter));
    yield put(fetchOneColaboradorSuccess(response.data));
  } catch (error) {
    yield put(fetchOneColaboradorFailure(error.message));
  }
}

function* watchFetchAll() {
  yield takeLatest(fetchAllColaboradoresRequest.type, fetchAllSaga);
}

function* watchFetchOne() {
  yield takeLatest(fetchOneColaboradorRequest.type, fetchOneSaga);
}

export default function* rootSaga() {
  yield all([
    watchFetchAll(),
    watchFetchOne(),
  ]);
}
