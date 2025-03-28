import React from "react";
import { Panel, FlexboxGrid, Table, Progress, Tag } from "rsuite";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import HeaderMobile from "../../components/HeaderMobile/HeaderMobile";
// import "./Dashboard.css";

const DashboardMobile = () => {
  const genderData = [
    { name: "Homens", value: 30 },
    { name: "Mulheres", value: 28 },
  ];

  const ageData = [
    { name: "18-25 anos", value: 15 },
    { name: "26-35 anos", value: 20 },
    { name: "36-45 anos", value: 12 },
    { name: "46+ anos", value: 11 },
  ];

  const COLORS = ["#3498ff", "#f44336", "#00C49F", "#FFBB28"];

  return (
    <div>
      <HeaderMobile />
      <div className="container px-3 mt-4 " style={{
        maxHeight:"700px",
        overflowY:'auto'
      }} >
        <div className="mb-4">
          <h4>Visão Geral</h4>
          <p className="text-muted">
            Aqui estão as principais análises de agendamentos e informações dos
            clientes.
          </p>
        </div>

        {/* Seção de Resumo */}
        <FlexboxGrid justify="space-between" className="mb-4">
          <FlexboxGrid.Item colspan={12}>
            <Panel bordered header={<strong>Total de Agendamentos</strong>}>
              <h4>124</h4>
            </Panel>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={10}>
            <Panel bordered header={<strong>Total de Clientes</strong>}>
              <h3>58</h3>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>

        {/* Tabela de Agendamentos */}
        <div className="mb-4">
          <h5>Agendamentos Recentes</h5>
          <Table
            autoHeight
            data={[
              {
                id: 1,
                cliente: "João Silva",
                servico: "Corte de Cabelo",
                data: "05/12/2024",
                status: "Concluído",
              },
              {
                id: 2,
                cliente: "Maria Souza",
                servico: "Manicure",
                data: "04/12/2024",
                status: "Pendente",
              },
              {
                id: 3,
                cliente: "Carlos Pereira",
                servico: "Massagem",
                data: "03/12/2024",
                status: "Cancelado",
              },
            ]}
          >
            <Table.Column width={100} align="center" fixed>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.Cell dataKey="id" />
            </Table.Column>

            <Table.Column flexGrow={1}>
              <Table.HeaderCell>Cliente</Table.HeaderCell>
              <Table.Cell dataKey="cliente" />
            </Table.Column>

            <Table.Column flexGrow={1}>
              <Table.HeaderCell>Serviço</Table.HeaderCell>
              <Table.Cell dataKey="servico" />
            </Table.Column>

            <Table.Column width={150} align="center">
              <Table.HeaderCell>Data</Table.HeaderCell>
              <Table.Cell dataKey="data" />
            </Table.Column>

            <Table.Column width={120} align="center">
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.Cell>
                {(rowData) => {
                  let color = "green";
                  if (rowData.status === "Pendente") color = "orange";
                  if (rowData.status === "Cancelado") color = "red";
                  return <Tag color={color}>{rowData.status}</Tag>;
                }}
              </Table.Cell>
            </Table.Column>
          </Table>
        </div>

        {/* Gráfico de Progresso */}
        <div className="mb-4">
          <h5>Progresso Semanal</h5>
          <FlexboxGrid>
            <FlexboxGrid.Item colspan={24}>
              <Progress.Line percent={75} showInfo strokeColor="blue" />
              <p className="text-muted">
                75% dos horários agendados foram concluídos nesta semana.
              </p>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </div>

        {/* Gráficos de Gênero e Idade */}
        <div className="mb-4">
          <h5>Distribuição de Gênero e Idade</h5>
          <FlexboxGrid justify="space-around">
            <FlexboxGrid.Item colspan={11}>
              <h6>Gênero</h6>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={genderData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {genderData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </FlexboxGrid.Item>

            <FlexboxGrid.Item colspan={11}>
              <h6>Faixa Etária</h6>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={ageData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#82ca9d"
                    label
                  >
                    {ageData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </div>

        {/* Informações dos Clientes */}
        <div className="mb-4">
          <h5>Informações dos Clientes</h5>
          <Table
            autoHeight
            data={[
              {
                id: 1,
                nome: "João Silva",
                telefone: "(11) 98765-4321",
                agendamentos: 5,
              },
              {
                id: 2,
                nome: "Maria Souza",
                telefone: "(21) 99876-5432",
                agendamentos: 8,
              },
              {
                id: 3,
                nome: "Carlos Pereira",
                telefone: "(31) 97654-3210",
                agendamentos: 2,
              },
            ]}
          >
            <Table.Column width={100} align="center" fixed>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.Cell dataKey="id" />
            </Table.Column>

            <Table.Column flexGrow={1}>
              <Table.HeaderCell>Nome</Table.HeaderCell>
              <Table.Cell dataKey="nome" />
            </Table.Column>

            <Table.Column flexGrow={1}>
              <Table.HeaderCell>Telefone</Table.HeaderCell>
              <Table.Cell dataKey="telefone" />
            </Table.Column>

            <Table.Column width={150} align="center">
              <Table.HeaderCell>Agendamentos</Table.HeaderCell>
              <Table.Cell dataKey="agendamentos" />
            </Table.Column>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DashboardMobile;
