// sagas/colaboradorSagas.js
import { call, put, takeEvery, all } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchAllRequest,
  fetchAllSuccess,
  fetchAllFailure,
  fetchOneRequest,
  fetchOneSuccess,
  fetchOneFailure,
} from './colaboradorSlice';

function* fetchAllSaga() {
  try {
    const response = yield call(() => axios.get('http://localhost:8000/colaborador/salao/66d1fc606938c910b08d0b20'));
    yield put(fetchAllSuccess(response.data));
  } catch (error) {
    yield put(fetchAllFailure(error.message));
  }
}

function* fetchOneSaga(action) {
  try {
    const response = yield call(() => axios.get(`https://api.example.com/data/${action.payload}`));
    yield put(fetchOneSuccess(response.data));
  } catch (error) {
    yield put(fetchOneFailure(error.message));
  }
}

function* watchFetchAll() {
  yield takeEvery(fetchAllRequest.type, fetchAllSaga);
}

function* watchFetchOne() {
  yield takeEvery(fetchOneRequest.type, fetchOneSaga);
}

export default function* rootSaga() {
  yield all([
    watchFetchAll(),
    watchFetchOne(),
  ]);
}
