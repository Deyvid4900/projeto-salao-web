import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Agendamento.css"; // Estilização personalizada

const AgendamentoPage = () => {
  // Estado para o dia, horário e especialista selecionados
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);

  const location = useLocation();
  const { servico } = location.state || {};

  // Função para gerar os dias da semana atual e da próxima
  const generateDays = () => {
    const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const today = new Date();
    let days = [];

    // Semana atual
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date();
      currentDay.setDate(today.getDate() + i);
      const dayLabel = `${daysOfWeek[currentDay.getDay()]} ${currentDay.getDate() < 9 ? '0' + currentDay.getDate() : currentDay.getDate() } ${currentDay.toLocaleString('default', { month: 'short' })}`;
      days.push({ id: i, label: dayLabel });
    }

    // Próxima semana
    for (let i = 7; i < 14; i++) {
      const currentDay = new Date();
      currentDay.setDate(today.getDate() + i);
      const dayLabel = `${daysOfWeek[currentDay.getDay()]} ${currentDay.getDate() < 9 ? '0' + currentDay.getDate() : currentDay.getDate() } ${currentDay.toLocaleString('default', { month: 'short' })}`;
      days.push({ id: i, label: dayLabel });
    }

    return days;
  };

  const days = generateDays();

  const hours = ["10:00", "11:00", "11:30", "12:00", "12:30", "13:00"];

  const specialists = [
    { id: 1, name: "Silvio Sampaio" },
    { id: 2, name: "Maria Oliveira" },
    { id: 3, name: "João Silva" },
  ];

  return (
    <div className="agendamento-container">
      {/* Cabeçalho */}
      <div className="agendamento-header">
        <h4>Finalizar Agendamento</h4>
        <p>Escolha o horário e a data</p>
      </div>

      {/* Serviço selecionado */}
      <div className="servico-selecionado">
        <div className="servico-info">
          <div className="servico-img-placeholder"></div>
          <div className="servico-detalhes">
            <p>{servico.titulo}</p>
            <p>{servico.descricao}</p>
            <p className="preco">R$ {Number(servico.preco).toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Seção de datas */}
      <div className="datas">
        <h4>Pra quando você gostaria de agendar?</h4>
        <div className="dias-semana-scroll">
          <div className="dias-semana">
            {days.map((day) => (
              <button
                key={day.id}
                className={`btn-dia ${selectedDay === day.id ? "ativo" : ""}`}
                onClick={() => setSelectedDay(day.id)}
              >
                {day.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Seção de horas */}
      <div className="horarios">
        <h4>Que horas?</h4>
        <div className="horas-disponiveis-scroll">
          <div className="horas-disponiveis">
            {hours.map((hour) => (
              <button
                key={hour}
                className={`btn-hora ${selectedHour === hour ? "ativo" : ""}`}
                onClick={() => setSelectedHour(hour)}
              >
                {hour}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Escolher especialista */}
      <div className="especialista-selecao">
        <h4>Gostaria de escolher um especialista específico?</h4>
        <div className="especialista-opcoes-scroll">
          <div className="especialista-opcoes">
            {specialists.map((specialist) => (
              <div key={specialist.id} className="especialista-card">
                <div className="especialista-img-placeholder"></div>
                <p>{specialist.name}</p>
                <button
                  className={`btn-especialista ${
                    selectedSpecialist === specialist.id ? "ativo" : ""
                  }`}
                  onClick={() => setSelectedSpecialist(specialist.id)}
                >
                  Escolher Especialista
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Botão de confirmação */}
      <button
        className="btn-confirmar"
        onClick={() => {
          console.log(selectedDay, selectedHour, selectedSpecialist);
          console.log(servico);
        }}
      >
        Confirmar meu agendamento
      </button>
    </div>
  );
};

export default AgendamentoPage;
