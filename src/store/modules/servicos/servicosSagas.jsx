// servicosSagas.js
import { call, put, all, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchAllRequest,
  fetchAllSuccess,
  fetchAllFailure,
} from './servicosSlice';

function* fetchAllSaga() {
  try {
    const url = `http://localhost:8000/servico/salao/${localStorage.getItem('_dSlun')}`;
    const response = yield call(axios.get, url);
    yield put(fetchAllSuccess(response.data));
  } catch (error) {
    console.log('Fetch error:', error); // Adicione este log
    const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
    yield put(fetchAllFailure(errorMessage));
  }
}

function* watchFetchAll() {
  yield takeLatest(fetchAllRequest.type, fetchAllSaga);
}

export default function* rootSaga() {
  yield all([watchFetchAll()]);
}
