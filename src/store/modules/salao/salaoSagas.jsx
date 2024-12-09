import { call, put, all, takeLatest } from "redux-saga/effects";
import { api } from "../../../services/api"; // Importa o serviço de API configurado
import {
  fetchSalaoRequest,
  fetchSalaoSuccess,
  fetchSalaoFailure,
  setCurrentSalao,
  setSaloes,
  updateLoading,
} from "./salaoSlice";

function* fetchSalaoSaga(action) {
  const { nome, coordinates } = action.payload;
  try {
    console.log(coordinates);
    const { data } = yield call(api.post, `/salao/filter/nome/${nome}`, {
      coordinates: coordinates,
    }); // Utilizando api configurado
    console.log(data);
    localStorage.setItem("_dSlun", data.salao._id);
    yield put(fetchSalaoSuccess(data));
  } catch (error) {
    yield put(fetchSalaoFailure(error.message));
  }
}

function* getSalao() {
  const { id } = JSON.parse(localStorage.getItem("u"));
  try {
    const { data } = yield call(api.post, `/salao/filter/${id}`); // Utilizando api configurado
    console.log(data);
    yield put(setCurrentSalao(data.salao));
  } catch (error) {
    yield put(fetchSalaoFailure(error.message));
  }
}

function* getAllSaloes() {
  try {
    yield put(updateLoading(true));
    const { data } = yield call(api.get, `/salao/saloes`); // Utilizando api configurado
    
    if (data.error) {
      yield put(fetchSalaoFailure(error.message));
      yield put(updateLoading(false));
    }
    
    yield put(updateLoading(false));
    yield put(setSaloes(data));
    

  } catch (error) {
    yield put(fetchSalaoFailure(error.message));
  }
}

function* watchFetchAll() {
  yield takeLatest(fetchSalaoRequest.type, fetchSalaoSaga);
  yield takeLatest("Salao/GetSalao", getSalao);
  yield takeLatest("Saloes/GetSaloes", getAllSaloes);
}

export default function* rootSaga() {
  yield all([watchFetchAll()]);
}
