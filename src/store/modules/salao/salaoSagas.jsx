import { call, put, all, takeLatest } from 'redux-saga/effects';
import { api } from '../../../services/api'; // Importa o serviço de API configurado
import {
  fetchSalaoRequest,
  fetchSalaoSuccess,
  fetchSalaoFailure,
} from './salaoSlice';

function* fetchSalaoSaga(action) {
  const { nome, coordinates } = action.payload;

  try {
    const { data } = yield call(api.post, `/salao/filter/nome/${nome}`, { coordinates }); // Utilizando api configurado
    localStorage.setItem("_dSlun", data.salao._id);
    yield put(fetchSalaoSuccess(data));
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
