import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeCliente from "./pagesCliente/Home/Home";
import AgendamentoPage from "./pagesCliente/Agendamento/Agendamento";
import Home from "./pages/Home";
import { AuthProvider } from "./context/AuthProvider";
import Login from "./pages/Login/index";
import Cliente from "./pages/Cliente";
import Servicos from "./pages/Servicos";
import Colaborador from "./pages/Colaborador";
import Horario from "./pages/Horarios/index";
import { Provider } from "react-redux";
import store from "./store/store";
import ClienteMobile from "./pagesMobile/ClienteMobile/ClienteMobile";
import HomeMobile from "./pagesMobile/HomeMobile/HomeMobile";
import ColaboradorMobile from "./pagesMobile/ColaboradorMobile/ColaboradorMobile";
import HorariosAtendimentoMobile from "./pagesMobile/HorarioMobile/HorarioMobile";
import ServicosMobile from "./pagesMobile/ServicosMobile/ServicosMobile";
import Agendados from "./pagesCliente/Agendados/Agendados";
import ProtectedRoute from "./components/protectedRoute";
import SalonForm  from "./pages/CreateSalao/createSalao";
import SalonsList from "./pagesCliente/Saloes/Saloes";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Rotas que não precisam de autenticação */}
            <Route path="Salao/:nome" element={<HomeCliente />} />
            <Route path="Salao/" element={<SalonsList/>} />
            <Route path="/Agendados" element={<Agendados />} />
            <Route path="/Admin/SalaoCreate/Adm" element={<SalonForm />} />

            {/* Rotas que precisam de autenticação */}
            <Route path="/" element={<Login />} />
            <Route
              path="/Home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Clientes"
              element={
                <ProtectedRoute>
                  <Cliente />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Servicos"
              element={
                <ProtectedRoute>
                  <Servicos />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Colaboradores"
              element={
                <ProtectedRoute>
                  <Colaborador />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Horarios"
              element={
                <ProtectedRoute>
                  <Horario />
                </ProtectedRoute>
              }
            />

            {/* Rotas Mobile */}
            <Route path="ClientesMobile" element={<ClienteMobile />} />
            <Route path="AgendamentosMobile" element={<HomeMobile />} />
            <Route path="ColaboradoresMobile" element={<ColaboradorMobile />} />
            <Route
              path="HorariosMobile"
              element={<HorariosAtendimentoMobile />}
            />
            <Route path="ServicosMobile" element={<ServicosMobile />} />
            <Route path="Agendamento" element={<AgendamentoPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
}

export default App;
