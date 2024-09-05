import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
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

function App() {
  return (
    <>
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
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
