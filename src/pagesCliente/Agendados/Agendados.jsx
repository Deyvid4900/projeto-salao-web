import React from 'react';
import { Nav } from "rsuite";
import { Link } from 'react-router-dom';
import "./Agendados.css";

const Agendados = () => {
  // Exemplo de dados de agendamentos (isso poderia vir de props ou do estado)
  const agendamentos = [
    {
      especialista: "Deyvid",
      servico: "Corte de Cabelo",
      hora: "14:00",
      numeroBarbearia: "+55 11 91234-5678"
    },
    {
      especialista: "Ana",
      servico: "Barba",
      hora: "15:30",
      numeroBarbearia: "+55 11 91234-5678"
    }
  ];

  return (
    <>
      <Nav
        justified
        appearance="pills"
        defaultActiveKey="Agendados"
        className="p-2 gap-2"
        style={{ zIndex: "30", width: "100%" }}
      >
        <Nav.Item as={Link} to="/Salao/Deyvid-Barber" eventKey="Home">
          Agendar
        </Nav.Item>
        <Nav.Item as={Link} to="/Agendados" eventKey="Agendados">
          Agendados
        </Nav.Item>
      </Nav>
      <div className='p-3'>
        <h4>Oi, Fulano</h4>
        <p>Bem-vindo, veja seus horários Agendados</p>
        <h5 className='mt-3'>Horário(s) Agendado(s)</h5>
      </div>
      <div className='bg-primary w-100 p-2' style={{ height: 200 }}>
        <div className='d-flex bg-success' style={{ height: 150 }}>
          <div className='p-1 w-75 h-100 d-flex align-items-center justify-content-end' style={{ backgroundColor: "red", textAlign: "end" }}>
            <ul>
              {agendamentos.map((agendamento, index) => (
                <li key={index}>
                  {agendamento.especialista} - {agendamento.servico} às {agendamento.hora}
                </li>
              ))}
            </ul>
          </div>
          <div className='w-25 h-100' style={{ backgroundColor: "black" }}></div>
        </div>
        <hr style={{ margin: "5px 0" }} />
        <div className='mt-1 d-flex justify-content-evenly'>
          <div className='d-flex align-items-center gap-1'>
            <img src="../../assets/whatsapp.png" width={16} alt="Número da barbearia" />{agendamentos[0]?.numeroBarbearia}
          </div>
          <div className='d-flex align-items-center gap-1'>
            <img src="../../assets/multiply.png" alt="Botão cancelar" />Btn cancelar
          </div>
        </div>
      </div>
    </>
  );
}

export default Agendados;
