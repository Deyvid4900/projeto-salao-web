// sagas/colaboradorSagas.js
import { call, put, takeEvery, all, takeLatest } from 'redux-saga/effects';
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
  const filter = {
    filters: {
      _id: action.payload,
    },
  }
  try {
    const response = yield call(() => axios.post(`http://localhost:8000/colaborador/filter`,filter));
    yield put(fetchOneSuccess(response.data));
  } catch (error) {
    yield put(fetchOneFailure(error.message));
  }
}

function* watchFetchAll() {
  yield takeLatest(fetchAllRequest.type, fetchAllSaga);
}

function* watchFetchOne() {
  yield takeLatest(fetchOneRequest.type, fetchOneSaga);
}

export default function* rootSaga() {
  yield all([
    watchFetchAll(),
    watchFetchOne(),
  ]);
}
