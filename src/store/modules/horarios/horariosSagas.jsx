// horariosSagas
import { takeLatest, all, call, put, select } from "redux-saga/effects";
import {
  updateHorario,
  resetHorario,
  setHorarios,
  setServicos,
  setSaving,
  setFiltering,
  closeDrawer,
  setColaboradoresInfo,
  setColaboradores,
} from "./horariosSlice";
import { api } from "../../../services/api";
import { notification } from "../../../services/rsuite";

import moment from "moment";

export function* allServicos() {
  try {
    yield put(setFiltering(true)); // Sinaliza que está carregando

    const { data: res } = yield call(
      api.get,
      `/servico/salao/${localStorage.getItem("_dSlun")}`
    ); // Faz a requisição à API para obter os serviços
    yield put(setFiltering(false)); // Para o estado de carregamento

    if (res.error) {
      notification("error", {
        placement: "topStart",
        title: "Ops...",
        description: res.message,
      });
      return;
    }

    // Atualiza o estado com os serviços obtidos
    yield put(setServicos(res.servicos));
  } catch (err) {
    yield put(setFiltering(false));
    notification("error", {
      placement: "topStart",
      title: "Ops...",
      description: err.message,
    });
  }
}

export function* addHorario() {
  try {
    const { horario, form } = yield select((state) => state.horarios);
    yield put(setSaving(true));

    const { data: res } = yield call(api.post, "/horario", {
      ...horario,
      salaoId: localStorage.getItem("_dSlun"), // Obter salaoId do localStorage
    });

    yield put(setSaving(false));

    if (res.error) {
      notification("error", {
        placement: "topStart",
        title: "Ops...",
        description: res.message,
      });
      return;
    }

    yield put({ type: "horarios/allHorarios" });
    yield put(closeDrawer());
    yield put(resetHorario());

    notification("success", {
      placement: "topStart",
      title: "Feito!",
      description: "Horário salvo com sucesso!",
    });
  } catch (err) {
    yield put(setSaving(false));
    notification("error", {
      placement: "topStart",
      title: "Ops...",
      description: err.message,
    });
  }
}

export function* allHorarios() {
  try {
    yield put(setFiltering(true));

    const { data: res } = yield call(
      api.get,
      `/horario/salao/${localStorage.getItem("_dSlun")}`
    );

    yield put(setFiltering(false));
    const horariosArray = res.horarios || [];

    const horariosComHoras = horariosArray.map((horario) => ({...horario}));

    // console.log(horariosComHoras);

    yield put(setHorarios(horariosComHoras));
  } catch (err) {
    yield put(setFiltering(false));
  }
}

export function* saveHorario() {
  const { horario, form } = yield select((state) => state.horarios);

  try {
    yield put(setSaving(true));

    const { data: res } = yield call(
      api.put,
      `/horario/${horario._id}`,
      horario
    );
    yield put(setSaving(false));

    if (res.error) {
      notification("error", {
        placement: "topStart",
        title: "Ops...",
        description: res.message,
      });
      return;
    }

    yield put({ type: "horarios/allHorarios" });
    yield put(closeDrawer());
    yield put(resetHorario());

    notification("success", {
      placement: "topStart",
      title: "Feito!",
      description: "Horário salvo com sucesso!",
    });
  } catch (err) {
    yield put(setSaving(false));
    notification("error", {
      placement: "topStart",
      title: "Ops...",
      description: err.message,
    });
  }
}

export function* removeHorario() {
  const { horario } = yield select((state) => state.horarios);

  try {
    yield put(setSaving(true));

    const { data: res } = yield call(api.delete, `/horario/${horario._id}`);
    yield put(setSaving(false));

    if (res.error) {
      notification("error", {
        placement: "topStart",
        title: "Ops...",
        description: res.message,
      });
      return;
    }

    yield put({ type: "horarios/allHorarios" });
    yield put(closeDrawer());

    notification("success", {
      placement: "topStart",
      title: "Feito!",
      description: "Horário removido com sucesso!",
    });
  } catch (err) {
    yield put(setSaving(false));
    notification("error", {
      placement: "topStart",
      title: "Ops...",
      description: err.message,
    });
  }
}

export function* fetchColaboradorSalao() {
  try {
    // Faz uma chamada para buscar os dados do colaborador usando o ID
    const { data: res } = yield call(
      api.get,
      `/colaborador/salao/${localStorage.getItem("_dSlun")}`
    );
    console.log(res);
    // Atualiza o estado com os colaboradores retornados
    yield put(setColaboradores(res.colaboradores));
  } catch (err) {
    console.error(err);
  }
}

export function* fetchColaborador() {
  // Obtém a lista de IDs de colaboradores do estado
  const { colaboradores } = yield select((state) => state.horarios.horario);

  // Verifica se há colaboradores para buscar
  if (colaboradores && colaboradores.length > 0) {
    // Usa um loop for...of para iterar sobre os colaboradores
    for (let idColaborador of colaboradores) {
      try {
        // Faz uma chamada para buscar os dados do colaborador usando o ID
        const { data: res } = yield call(api.post, `/colaborador/filter`, {
          _id: idColaborador,
        });

        // Atualiza o estado com os colaboradores retornados
        yield put(setColaboradoresInfo(res.colaboradores));
      } catch (err) {
        console.error(err);
      }
    }
  }
}

export function* filterColaboradores() {
  const { horario } = yield select((state) => state.horarios);

  try {
    yield put(setFiltering(true));

    const { data: res } = yield call(api.post, `/horario/colaboradores/`, {
      servicos: horario.especialidades,
    });
    yield put(setFiltering(false));

    if (res.error) {
      notification("error", {
        placement: "topStart",
        title: "Ops...",
        description: res.message,
      });
      return;
    }

    yield put(updateHorario({ colaboradores: res.colaboradores }));
  } catch (err) {
    yield put(setFiltering(false));
    notification("error", {
      placement: "topStart",
      title: "Ops...",
      description: err.message,
    });
  }
}

function* watchAllServicos() {
  yield takeLatest("horarios/allServicos", allServicos);
}
function* watchAllColaboradoresSalao() {
  yield takeLatest("horarios/allColaboradoresSalao", fetchColaboradorSalao);
}
function* watchColaborador() {
  yield takeLatest("horarios/allColaborador", fetchColaborador);
}

function* watchAddHorario() {
  yield takeLatest("horarios/setHorario", addHorario);
}

function* watchAllHorarios() {
  yield takeLatest("horarios/allHorarios", allHorarios);
}

function* watchSaveHorario() {
  yield takeLatest("horarios/saveHorario", saveHorario);
}

function* watchRemoveHorario() {
  yield takeLatest("horarios/removeHorario", removeHorario);
}

function* watchFilterColaboradores() {
  yield takeLatest("horarios/filterColaboradores", filterColaboradores);
}

export default function* rootSaga() {
  yield all([
    watchAllServicos(),
    watchAddHorario(),
    watchAllHorarios(),
    watchSaveHorario(),
    watchRemoveHorario(),
    watchFilterColaboradores(),
    watchColaborador(),
    watchAllColaboradoresSalao(),
  ]);
}
