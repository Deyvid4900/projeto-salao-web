import { takeLatest, all, call, put, delay, select } from "redux-saga/effects";
import {
  updateAgendamento,
  addAgendamento,
  addAgendamentoFailure,
  addAgendamentoSuccess,
  updateAgenda,
  updateAgendado,
  updateDays,
  updateHours,
  updateLoading,
  setNotification,
  deleteAgendamentoSuccess,
} from "./agendamentoSlice";
import { api } from "../../../services/api";
import moment from "moment";

// Função que retorna os dias disponíveis
function getAvailableDays(data) {
  return data.agenda.map((dayObj) => Object.keys(dayObj)[0]);
}

function* filterDisponiveis(payload) {
  const dateToSend = payload.action.dia
    ? moment(payload.action.dia).format("YYYY-MM-DDTHH:mm:ssZ")
    : moment().format("YYYY-MM-DDTHH:mm:ssZ");

  const colaboradorId = payload.action.colaboradorId || null;
  const dia = dateToSend;
  const { _id } = payload.action;

  try {
    const { data } = yield call(api.post, "agendamento/dias-disponiveis", {
      salaoId: localStorage.getItem("_dSlun"),
      data: dia,
      servicoId: _id,
      colaboradorId: colaboradorId || payload.action.colaboradorId.ID,
    });

    // Utilizando as funções para extrair dias e horários
    const days = getAvailableDays(data);
    const hours = getAvailableHours(data, colaboradorId);

    // Atualizar o estado com days e hours
    yield put(updateDays(days));
    yield put(updateHours(hours));

    yield put(updateAgenda(data));
  } catch (err) {
    console.error("Erro ao filtrar dias disponiveis ", err);
  }
}

function* filterHorasDisponiveis(payload) {
  yield put(updateLoading(true));

  const dateToSend = payload.action.dia
    ? moment(payload.action.dia).format("YYYY-MM-DDTHH:mm:ssZ")
    : moment().format("YYYY-MM-DDTHH:mm:ssZ");

  const colaboradorId = payload.action.colaboradorId || null;
  const dia = payload.action.data; // Data a ser comparada
  const { _id } = payload.action;

  try {
    const { data } = yield call(api.post, "agendamento/horas-disponiveis", {
      salaoId: localStorage.getItem("_dSlun"),
      data: dia,
      servicoId: _id,
      colaboradorId: colaboradorId,
    });

    // Extrai os horários disponíveis para o colaborador específico
    const horariosFiltrados =
      data.agenda[dia]?.[colaboradorId]?.map((slot) => slot.time) || [];

    // Se precisar de um log para verificar os horários filtrados
    console.log(horariosFiltrados);

    // Atualiza o estado com os horários filtrados
    yield put(updateHours(horariosFiltrados));
    yield put(updateLoading(false));
  } catch (err) {
    console.error("Erro ao filtrar dias disponiveis ", err);
    yield put(updateLoading(false));
  }
}

// function* filterDiasDisponiveis(payload) {
//   const dateToSend = payload.action.dia
//     ? moment(payload.action.dia).format("YYYY-MM-DDTHH:mm:ssZ")
//     : moment().format("YYYY-MM-DDTHH:mm:ssZ");

//   const colaboradorId = payload.action.colaboradorId || null;
//   const dia = dateToSend;
//   const { _id } = payload.action;

//   try {
//     yield put(updateLoading(true));
//     const { data } = yield call(api.post, "agendamento/dias-disponiveis", {
//       salaoId: localStorage.getItem("_dSlun"),
//       data: dia,
//       servicoId: _id,
//       colaboradorId: colaboradorId || payload.action.colaboradorId.ID,
//     });
//     // Utilizando as funções para extrair dias e horários
//     const days = getAvailableDays(data);

//     // Atualizar o estado com days e hours
//     yield put(updateDays(days));

//     yield put(updateAgenda(data));
//     yield put(updateLoading(false));
//   } catch (err) {
//     console.error("Erro ao filtrar dias disponiveis ", err);
//   }
// }
function* filterDiasDisponiveis(payload) {
  const dateToSend = payload.action.dia
    ? moment(payload.action.dia).format("YYYY-MM-DDTHH:mm:ssZ")
    : moment().format("YYYY-MM-DDTHH:mm:ssZ");

  const colaboradorId = payload.action.colaboradorId || null;
  const dia = dateToSend;
  const { _id } = payload.action;

  try {
    yield put(updateLoading(true));
    const { data } = yield call(api.post, "agendamento/dias-disponiveis", {
      salaoId: localStorage.getItem("_dSlun"),
      data: dia,
      servicoId: _id,
      colaboradorId: colaboradorId || payload.action.colaboradorId.ID,
    });
    // Utilizando as funções para extrair dias e horários
    console.log(data);
    const days = getAvailableDays(data);

    // Atualizar o estado com days e hours
    yield put(updateDays(days));

    yield put(updateAgenda(data));
    yield put(updateLoading(false));
  } catch (err) {
    console.error("Erro ao filtrar dias disponiveis ", err);
  }
}

function* getAgendamentos(payload) {
  const clienteId = payload.payload;
  try {
    yield put(updateLoading(true));
    const { data } = yield call(
      api.get,
      `agendamento/agendamentos/${clienteId}`
    );

    if (data.error == true) {
      yield put(updateLoading(false));
      console.error("Erro ao encontrar agendamentos ", err);
    }

    console.log(data);
    yield put(updateAgendado(data.agendamentos));
    yield put(updateLoading(false));
  } catch (err) {
    // Lidando com o erro se necessário
    console.error("Erro ao encontrar agendamentos ", err);
  }
}

function* filterAgendamentos({ range }) {
  try {
    const { data: res } = yield call(api.post, "/agendamento/filter", {
      salaoId: localStorage.getItem("_dSlun"),
      range,
    });

    yield put(updateAgendamento({ agendamentos: res.agendamentos }));
  } catch (err) {
    // Lidando com o erro se necessário
    console.error("Erro ao filtrar agendamentos", err);
  }
}

function* handleAddAgendamento(action) {
  const { payload } = action;
  console.log(action);

  try {
    // Verifica se colaboradorId existe e se possui o primeiro item
    const colaboradorId = payload.colaboradorId;

    const response = yield call(api.post, "/agendamento", {
      ...payload,
      colaboradorId,
    }); // Chama a API para criar o agendamento

    yield put(addAgendamentoSuccess(response.data)); // Dispara sucesso com a resposta da API

    if (response.error) {
      yield put(
        setNotification({
          type: "error",
          description: response.error.message,
        })
      );
    } else {
      yield put(
        setNotification({
          type: response.data.error ? "error" : "success",
          description: response.data.message,
        })
      );
      console.log(response.data);
      if (payload.navigate != undefined) {
        yield call(payload.navigate, "/Agendados"); // Navega para a página "Agendados"
      }
      // Navega para a página "Agendados"
      yield put({
        type: "agendamento/getAgendamento",
        payload: localStorage.getItem("cl_idtor"),
      });
      yield delay(2050);
      yield put(
        setNotification({
          type: "",
          description: "",
        })
      );
    }
  } catch (error) {
    console.log(error);
    yield put(addAgendamentoFailure(error));
    yield put(
      setNotification({
        type: "error",
        description: error.message,
      })
    );
  }
}

function* handleUpdateAgendamento(action) {
  console.log(action);
  const payload = { ...action.action };
  const agendamentoId = payload.agendamentoInfo._id; // Extrai o ID do agendamento

  try {
    // Verifica se colaboradorId existe
    const colaboradorId =
      payload.colaboradorId || payload.agendamentoInfo.colaboradorId._id;
    const clienteId =
      payload.clienteId || payload.agendamentoInfo.clienteId._id;
    const servicoId =
      payload.servicoId || payload.agendamentoInfo.servicoId._id;
    const salaoId = payload.salaoId || payload.agendamentoInfo.salaoId;

    // Faz a chamada para atualizar o agendamento
    const response = yield call(api.put, `/agendamento/${agendamentoId}`, {
      ...payload,
      agendamentoInfo: {
        ...payload.agendamentoInfo,
        colaboradorId,
      },
      colaboradorId,
      clienteId,
      servicoId,
      salaoId,
    });

    // Verifica a resposta da API
    if (response.data.error) {
      yield put(
        setNotification({
          type: "error",
          description:
            response.data.message || "Erro ao atualizar o agendamento.",
        })
      );
    } else {
      yield put(
        setNotification({
          type: "success",
          description:
            response.data.message || "Agendamento atualizado com sucesso.",
        })
      );

      // Se a atualização for bem-sucedida, você pode despachar uma ação de sucesso
      yield put(addAgendamentoSuccess(response.data));

      // Navega para a página "Agendados", se a função `navigate` estiver definida
      if (payload.navigate) {
        yield call(payload.navigate, "/Agendados");
      }

      // Limpa a notificação após um breve atraso
      yield delay(2050);
      yield put(
        setNotification({
          type: "",
          description: "",
        })
      );
    }
  } catch (error) {
    console.log(error);
    // Em caso de erro, despacha uma ação de falha e exibe a notificação de erro
    yield put(addAgendamentoFailure(error));
    yield put(
      setNotification({
        type: "error",
        description:
          error.message || "Erro desconhecido ao atualizar agendamento.",
      })
    );
  }
}

function* deleteAgendado({ payload }) {
  try {
    // Extrai o ID do agendamento da payload
    const agendamentoId  = payload;

    // Envia a requisição DELETE para a API
    const { data: res } = yield call(api.delete, `/agendamento/`, {
      data: { agendamentoId },
    });

    console.log(res);

    if (!res.error) {
      console.log("Agendamento deletado com sucesso!");
      yield put(deleteAgendamentoSuccess({ agendamentoId }));
    } else {
      console.error("Erro ao deletar agendamento:", res.message);
    }
  } catch (err) {
    console.error("Erro ao deletar agendamento:", err);
  }
}


export default function* agendamentoSagas() {
  yield all([
    takeLatest("agendamento/filterAgendamentos", filterAgendamentos),
    takeLatest("agendamento/filterDisponiveis", filterDisponiveis),
    takeLatest("agendamento/filterDiasDisponiveis", filterDiasDisponiveis),
    takeLatest("agendamento/filterHorasDisponiveis", filterHorasDisponiveis),
    takeLatest("agendamento/getAgendamento", getAgendamentos),
    takeLatest(addAgendamento.type, handleAddAgendamento),
    takeLatest("agendamento/handleUpdateAgendamento", handleUpdateAgendamento),
    takeLatest("agendamento/deleteAgendamento", deleteAgendado),
  ]);
}
