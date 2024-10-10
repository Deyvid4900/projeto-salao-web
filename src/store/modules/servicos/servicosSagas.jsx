import { call, put, all, takeLatest, select } from "redux-saga/effects";
import {
  updateServico,
  resetServico,
  setServicos,
  setLoading,
  setFiltering,
  toggleDrawer, setColaboradorId,
  setSelectedServicos,// Importando a ação de notificação
} from "./servicosSlice"; // Importando o slice correspondente
import { api } from "../../../services/api"; // Importando a API
import { setColaboradoresServico } from "../colaborador/colaboradorSlice";

function* findColaboradoreByServico(action) {
  console.log(action.payload)
  const servicoId = action.payload;
  try {
    yield put(setLoading(true));
    const {data} = yield call(api.get,`/servico/${servicoId}/colaboradores`);
    yield put(setLoading(false));

    console.log(data)
    if (data.error) {
      // Tratar erro se a resposta da API indicar erro
      console.error(data.error);
    } else {
      yield put(setColaboradoresServico(data.colaboradores)); // Armazena os serviços do colaborador
    }

  } catch (error) {
    yield put(setLoading(false)); // Para o loading em caso de erro
    console.error('Error fetching colaborador servicos:', error);
  }
}


function* fetchColaboradorServicos(action) {
  const colaboradorId  = action.payload; // Obtenha o ID do colaborador da ação
  try {
    yield put(setLoading(true)); // Inicia o loading

    // Chamada à API
    const { data } = yield call(api.get, `/servico/colaborador/${colaboradorId}`);
    yield put(setLoading(false)); // Termina o loading

    if (data.error) {
      // Tratar erro se a resposta da API indicar erro
      console.error(data.error);
    } else {
      yield put(setSelectedServicos(data.servicos)); // Armazena os serviços do colaborador
    }
  } catch (error) {
    yield put(setLoading(false)); // Para o loading em caso de erro
    console.error('Error fetching colaborador servicos:', error);
  }
}

function* saveServico(action) {
  const { payload } = action; // Obtendo os dados do serviço
  const salaoId = localStorage.getItem("_dSlun");
  // console.log(payload);
  try {
    const formData = new FormData();
    formData.append("salaoId", salaoId);
    formData.append("servicoId", payload._id);
    formData.append("servico", JSON.stringify(payload)); // Convertendo o objeto de serviço para string
    formData.append("imagem_corte", JSON.stringify(payload.imagem_corte)); // Se você tiver imagens

    // Chamada à API
    const { data: response } = yield call(
      api.put,
      `/servico/${salaoId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Definindo o content-type para multipart
        },
      }
    );

    if (response.error) {
      // Tratar o erro da API
      console.error(response.error);
      // Tratar notificação ou estado de erro
    } else {
      yield call(fetchAllServicos);
    }
  } catch (error) {
    console.error("Error saving service:", error);
    // Tratar notificação ou estado de erro
  }
}

// Função para buscar todos os serviços
function* fetchAllServicos() {
  const salaoId = localStorage.getItem("_dSlun");

  try {
    yield put(setLoading(true)); // Sinalizando que o loading começou

    // Chamada à API
    const { data } = yield call(api.get, `/servico/salao/${salaoId}`);
    yield put(setLoading(false));
    // Sinalizando que o loading terminou
    yield put(setServicos(data.servicos)); // Atualizando a lista de serviços
  } catch (error) {
    yield put(setLoading(false)); // Parando o loading em caso de erro
    // Dispara uma ação para definir a notificação de erro
    console.error(response.error);
  }
}

// Função de watcher para as ações de serviço
function* watchServicosActions() {
  yield takeLatest(setColaboradorId.type, fetchColaboradorServicos);
  yield takeLatest("servicos/findColaboradoreByServico", findColaboradoreByServico);
  yield takeLatest("servicos/fetchAllServicos", fetchAllServicos);
  yield takeLatest(updateServico.type, saveServico); // Certifique-se de usar a ação correta
}

// Saga raiz
export default function* rootSaga() {
  yield all([watchServicosActions()]); // Executa todas as watchers
}
