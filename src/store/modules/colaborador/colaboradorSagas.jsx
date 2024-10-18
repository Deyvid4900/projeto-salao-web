import { takeLatest, all, call, put, select } from "redux-saga/effects";
import {
  updateColaborador,
  resetColaborador,
  setColaboradores,
  setColaborador,
  setServicos,
  fetchAllColaboradores,
  saveColaborador,
  setNotification,
  addColaborador,
  deleteColaborador,
  setLoadingTrue,
  setLoadingFalse,
} from "./colaboradorSlice"; // novo arquivo
import { api } from "../../../services/api";
import { notification } from "../../../services/rsuite";

function* addColaboradorSaga(action) {
  try {
    const { payload } = action; // Obtém os dados do colaborador
    const salaoId = localStorage.getItem("_dSlun");
    console.log("Payload:", payload);

    const formData = new FormData();

    // Adiciona os campos do colaborador ao FormData
    formData.append("salaoId", salaoId);
    formData.append("nome", payload.nome);
    formData.append("sexo", payload.sexo);
    formData.append("dataNascimento", payload.dataNascimento);
    formData.append("dataCadastro", payload.dataCadastro);
    formData.append("email", payload.email);
    formData.append("telefone", payload.telefone);
    formData.append("especialidades", JSON.stringify(payload.servicos)); // Adicionando especialidades como string JSON

    // Verifica se existe uma foto e adiciona ao FormData
    if (payload.foto instanceof File) {
      console.log("Foto payload:", payload.foto);
      formData.append("files", payload.foto); // Adiciona o arquivo de foto ao FormData
    } else {
      console.error("payload.foto não é um arquivo válido:", payload.foto);
    }

    // Log para verificar o conteúdo do FormData
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    // Chamada à API com formData
    const { data: response } = yield call(api.post, `/colaborador`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Verifica se há erro na resposta
    if (response.error) {
      yield put(
        setNotification({
          type: "error",
          description: response.message,
        })
      );
    } else {
      yield put(fetchAllColaboradores()); // Atualiza o estado com os colaboradores
      yield put(
        setNotification({
          type: "success",
          description: "Colaborador salvo com sucesso!",
        })
      );
    }
  } catch (error) {
    console.error("Erro ao enviar dados:", error);
    yield put(
      setNotification({
        type: "error",
        description: "Erro ao salvar colaborador.",
      })
    );
  }
}

function* saveColaboradorSaga(action) {
  try {
    const { payload } = action; // Obtém os dados do colaborador
    const colaboradorId = payload._id;

    // Chamada à API
    const { data: response } = yield call(
      api.put,
      `/colaborador/${colaboradorId}`,
      payload
    );
    // console.log(response);

    // Verifica se há erro na resposta
    if (response.error) {
      // Dispara uma ação para definir a notificação de erro
      yield put(
        setNotification({
          type: "error",
          description: response.error,
        })
      );
    } else {
      // Atualiza a lista de colaboradores
      yield put(fetchAllColaboradores()); // Atualiza o estado com os colaboradores

      // Dispara uma ação para definir a notificação de sucesso
      yield put(
        setNotification({
          type: "success",
          description: "Colaborador salvo com sucesso!",
        })
      );
    }
  } catch (err) {
    // Dispara uma ação para definir a notificação de erro
    yield put(
      setNotification({
        type: "error",
        description: err.message || "Erro ao salvar colaborador",
      })
    );
  }
}

export function* filterColaborador({ payload }) {
  const { form } = yield select((state) => state.colaborador);

  try {
    yield put(updateColaborador({ form: { ...form, filtering: true } }));
    // console.log(payload)
    const { data: res } = yield call(api.post, "/colaborador/filter", {
      // "_id":
    });

    yield put(updateColaborador({ form: { ...form, filtering: false } }));

    if (res.error) {
      notification("error", {
        placement: "topStart",
        title: "Ops...",
        description: res.message,
      });
      return;
    }

    if (res.colaboradores.length > 0) {
      yield put(
        updateColaborador({
          colaborador: res.colaboradores[0],
          form: { ...form, filtering: false, disabled: true },
        })
      );
    } else {
      yield put(
        updateColaborador({
          form: { ...form, filtering: false, disabled: false },
        })
      );
    }
  } catch (err) {
    yield put(updateColaborador({ form: { ...form, filtering: false } }));
    notification("error", {
      placement: "topStart",
      title: "Ops...",
      description: err.message,
    });
  }
}

export function* allColaboradores() {
  try {
    const { form } = yield select((state) => state.colaborador);
    yield put(updateColaborador({ form: { ...form, filtering: true } }));
    yield call(setLoadingTrue);

    const { data: res } = yield call(
      api.get,
      `/colaborador/salao/${localStorage.getItem("_dSlun")}`
    );

    yield put(updateColaborador({ form: { ...form, filtering: false } }));

    if (res.error) {
      notification("error", {
        placement: "topStart",
        title: "Ops...",
        description: res.message,
      });
      return;
    }

    yield put(setColaboradores(res.colaboradores));
    yield call(setLoadingFalse);
  } catch (err) {
    yield put(updateColaborador({ form: { ...form, filtering: false } }));
    notification("error", {
      placement: "topStart",
      title: "Ops...",
      description: err.message,
    });
  }
}
export function* colaboradorDelete(action) {
  try {
    console.log(action);
    const { payload } = action; // Obtém os dados do colaborador
    const colaboradorId = payload._id;
    console.log(colaboradorId);

    // Chamada à API
    const { data: response } = yield call(
      api.delete,
      `/colaborador/vinculo/${colaboradorId}`
    );
    // console.log(response);

    // Verifica se há erro na resposta
    if (response.error) {
      // Dispara uma ação para definir a notificação de erro
      yield put(
        setNotification({
          type: "error",
          description: response.error,
        })
      );
    } else {
      // Atualiza a lista de colaboradores
      yield put(fetchAllColaboradores()); // Atualiza o estado com os colaboradores

      // Dispara uma ação para definir a notificação de sucesso
      yield put(
        setNotification({
          type: "success",
          description: "Colaborador deletado com sucesso!",
        })
      );
    }
  } catch (err) {
    // Dispara uma ação para definir a notificação de erro
    yield put(
      setNotification({
        type: "error",
        description: err.message || "Erro ao deletadar colaborador",
      })
    );
  }
}

function* watcherDeleteColaborador() {
  yield takeLatest(deleteColaborador.type, colaboradorDelete);
}
function* watcherAllColaborador() {
  yield takeLatest(fetchAllColaboradores.type, allColaboradores);
}
function* watchersaveColaborador() {
  yield takeLatest(saveColaborador.type, saveColaboradorSaga);
}

function* watcherAddColaborador() {
  yield takeLatest(addColaborador.type, addColaboradorSaga);
}
function* fetchColaboradores() {
  yield takeLatest(setColaboradores.type, filterColaborador);
}

export default function* rootSaga() {
  yield all([
    watcherDeleteColaborador(),
    watcherAllColaborador(),
    watchersaveColaborador(),
    fetchColaboradores(),
    watcherAddColaborador(),
  ]);
}
