import { takeLatest, all, call, put, select } from "redux-saga/effects";
import {
  updateColaborador,
  resetColaborador,
  setColaboradores,
  setColaborador,
  setServicos,
  fetchAllColaboradores,
  saveColaborador,setNotification
} from "./colaboradorSlice"; // novo arquivo
import { api } from "../../../services/api";
import { notification } from "../../../services/rsuite";


function* saveColaboradorSaga(action) {
  try {
    const { payload } = action; // Obtém os dados do colaborador
    const colaboradorId =payload._id;

    // Chamada à API
    const { data: response } = yield call(api.put, `/colaborador/${colaboradorId}`, payload);
    // console.log(response);

    // Verifica se há erro na resposta
    if (response.error) {
      // Dispara uma ação para definir a notificação de erro
      yield put(setNotification({
        type: "error",
        description: response.error,
      }));
    } else {
      // Atualiza a lista de colaboradores
      yield put(fetchAllColaboradores()); // Atualiza o estado com os colaboradores

      // Dispara uma ação para definir a notificação de sucesso
      yield put(setNotification({
        type: "success",
        description: "Colaborador salvo com sucesso!",
      }));
    }
  } catch (err) {
    // Dispara uma ação para definir a notificação de erro
    yield put(setNotification({
      type: "error",
      description: err.message || "Erro ao salvar colaborador",
    }));
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
  } catch (err) {
    yield put(updateColaborador({ form: { ...form, filtering: false } }));
    notification("error", {
      placement: "topStart",
      title: "Ops...",
      description: err.message,
    });
  }
}

function* watcherAllColaborador() {
  yield takeLatest(fetchAllColaboradores.type, allColaboradores);
}
function* watchersaveColaborador() {
  yield takeLatest(saveColaborador.type, saveColaboradorSaga);
}
function* fetchColaboradores() {
  yield takeLatest(setColaboradores.type, filterColaborador);
}

export default function* rootSaga() {
  yield all([
    watcherAllColaborador(),
    watchersaveColaborador(),
    fetchColaboradores()
  ]);
}
