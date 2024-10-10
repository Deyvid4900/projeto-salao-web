import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import HomeCliente from "./pagesCliente/Home/Home";
import AgendamentoPage from "./pagesCliente/Agendamento/Agendamento";

import Home from "./pages/Home";
import { ProtectedLayout } from "./components/ProtectedLayout";
import { AuthProvider } from "./context/AuthProvider";
import Login from "./pages/Login/index";
import Cliente from "./pages/Cliente";
import Servicos from "./pages/Servicos";
import Colaborador from "./pages/Colaborador";
import Horario from "./pages/Horarios/index";
import { Provider } from "react-redux";
import store from "./store/store";
import HeaderMobile from "./components/HeaderMobile/HeaderMobile";
import ClienteMobile from "./pagesMobile/ClienteMobile/ClienteMobile";
import HomeMobile from "./pagesMobile/HomeMobile/HomeMobile";
import ColaboradorMobile from "./pagesMobile/ColaboradorMobile/ColaboradorMobile";
import HorariosAtendimento from "./pages/Horarios/index";
import HorariosAtendimentoMobile from "./pagesMobile/HorarioMobile/HorarioMobile";
import ServicosMobile from "./pagesMobile/ServicosMobile/ServicosMobile";

function App() {
  return (
    <>
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="Salao/:nome" element={<HomeCliente></HomeCliente>} />
              <Route
                path="ClientesMobile"
                element={<ClienteMobile></ClienteMobile>}
              />
              <Route
                path="AgendamentosMobile"
                element={<HomeMobile></HomeMobile>}
              />
              <Route
                path="ColaboradoresMobile"
                element={<ColaboradorMobile></ColaboradorMobile>}
              />
              <Route
                path="HorariosMobile"
                element={<HorariosAtendimentoMobile></HorariosAtendimentoMobile>}
              />
              <Route
                path="ServicosMobile"
                element={<ServicosMobile></ServicosMobile>}
              />

              <Route
                path="Agendamento"
                element={<AgendamentoPage></AgendamentoPage>}
              />
              <Route path="/" element={<Login />} />
              <Route
                path="/Home"
                element={
                  <ProtectedLayout>
                    <Home />
                  </ProtectedLayout>
                }
              />
              <Route
                path="/Clientes"
                element={
                  <ProtectedLayout>
                    <Cliente />
                  </ProtectedLayout>
                }
              />
              <Route
                path="/Servicos"
                element={
                  <ProtectedLayout>
                    <Servicos />
                  </ProtectedLayout>
                }
              />
              <Route
                path="/Colaboradores"
                element={
                  <ProtectedLayout>
                    <Colaborador />
                  </ProtectedLayout>
                }
              />
              <Route
                path="/Horarios"
                element={
                  <ProtectedLayout>
                    <Horario />
                  </ProtectedLayout>
                }
              />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    </>
  );
}

export default App;
