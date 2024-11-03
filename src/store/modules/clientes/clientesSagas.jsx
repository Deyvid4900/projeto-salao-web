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
  setLoading,
  selectedCliente,
  setCurrentCliente,
} from "./clientesSlice";
import {
  addAgendamento,
  setNotification,
} from "../agendamento/agendamentoSlice";
import { delay } from "redux-saga/effects";

// Saga para verificar o localStorage
function* verificarCliente(action) {
  console.log(action);
  const { navigate, dados } = action.payload;
  const clienteId = localStorage.getItem("cl_idtor");

  // Verifica se clienteId é nulo, undefined ou 'undefined'
  if (!clienteId || clienteId == undefined) {
    yield put(openCadastroModal()); // Abre o modal para cadastro
  } else {
    yield put(setLoading(true));
    yield put(addAgendamento({ payload: dados, navigate }));
    yield delay(2000);
    yield put(setLoading(false));
  }
}

function* fetchAllClientesSaga() {
  try {
    const { data } = yield call(
      api.get,
      `/cliente/salao/${localStorage.getItem("_dSlun")}`
    );
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
      cliente: {
        nome: req.nome,
        email: req.email,
        telefone: req.telefone,
        dataNascimento: req.dataNascimento,
        sexo: req.sexo,
      },
      salaoId: req.salaoId,
    }); // Cadastro do cliente
    console.log(data);
    const clienteId = data.clienteId;
    localStorage.setItem("cl_idtor", clienteId); // Armazena o cliente no localStorage

    if (!data.error) {
      console.log(req)
      yield put(setCurrentCliente(req));
      yield put(
        setNotification({
          type: "success",
          description: "Cliente salvo com sucesso!",
        })
      );
      yield put(cadastrarClienteSuccess(data)); // Sucesso no cadastro
      yield put(closeCadastroModal()); // Fecha o modal
      // Continue o processo de confirmação após cadastro
      // yield call(navigate, "/Agendados");
    }
  } catch (error) {
    yield put(cadastrarClienteFailure(error.message));

    yield put(
      setNotification({
        type: "error",
        description: error.message,
      })
    );
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
  yield all([
    watchVerificarCliente(),
    watchCadastrarCliente(),
    watchFetchAll(),
  ]);
}
