import { call, put, takeLatest, all, select } from "redux-saga/effects";
import { api } from "../../../services/api";
import {
  fetchAllClientesRequest,
  fetchAllClientesSuccess,
  fetchAllClientesFailure,
  openCadastroModal,
  closeCadastroModal,
  cadastrarClienteRequest,
  cadastrarClienteSuccess,
  cadastrarClienteFailure,
} from "./clientesSlice";

// Saga para verificar o localStorage
function* verificarCliente() {
  const clienteId = localStorage.getItem("cl_idtor");
  if (!clienteId && (clienteId != 'undefined' || null)) {
    yield put(openCadastroModal()); // Abre o modal para cadastro
  } else {
    // Prosseguir com a lógica de confirmação
    // Chame outra ação ou continue o fluxo
  }
}
function* fetchAllClientesSaga() {
  try {
    const { data } = yield call(api.get, `/cliente/salao/${localStorage.getItem('_dSlun')}`);
    yield put(fetchAllClientesSuccess(data));
  } catch (error) {
    yield put(fetchAllClientesFailure(error.message));
  }
}

// Saga para cadastrar o cliente
function* cadastrarClienteSaga(action) {
  console.log(action.payload);
  const req = action.payload;
  try {
    const { data } = yield call(api.post, "/cliente", {
      "cliente": {
        nome: req.nome ,
        email: req.email ,
        telefone: req.telefone,
        dataNascimento: req.dataNascimento ,
        sexo:req.sexo
      },
      salaoId: req.salaoId,
    }); // Cadastro do cliente
    console.log(data)
    const clienteId = data.clienteId
    localStorage.setItem("cl_idtor", clienteId); // Armazena o cliente no localStorage
    yield put(cadastrarClienteSuccess(data)); // Sucesso no cadastro
    yield put(closeCadastroModal()); // Fecha o modal
    // Continue o processo de confirmação após cadastro
  } catch (error) {
    yield put(cadastrarClienteFailure(error.message));
  }
}

function* watchVerificarCliente() {
  yield takeLatest("VERIFICAR_CLIENTE", verificarCliente);
}

function* watchCadastrarCliente() {
  yield takeLatest(cadastrarClienteRequest.type, cadastrarClienteSaga);
}
function* watchFetchAll() {
  yield takeLatest(fetchAllClientesRequest.type, fetchAllClientesSaga);
}

// Função root para exportar as sagas
export default function* clienteSagas() {
  yield all([watchVerificarCliente(), watchCadastrarCliente(),watchFetchAll()]);
}
