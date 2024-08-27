import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Home from "./pages/Home/index.jsx";
import Colaborador from "./pages/Colaborador/index.jsx"
import Cliente from "./pages/Cliente/index.jsx"
import Horarios from './pages/Horarios/index.jsx'
import Servicos from './pages/Servicos/index.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,

  },
  {
    path:"/Colaboradores",
    element:<Colaborador></Colaborador>
  },
  {
    path:"/Clientes",
    element:<Cliente></Cliente>
  },
  {
    path:"/Horarios",
    element:<Horarios></Horarios>
  },
  {
    path:"/Servicos",
    element:<Servicos></Servicos>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);