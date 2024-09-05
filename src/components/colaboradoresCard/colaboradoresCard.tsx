import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRequest } from "../../store/modules/colaborador/colaboradorSlice";

export const CardColaborador = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: any) => state.colaborador
  );

  useEffect(() => {
    dispatch(fetchAllRequest());
  }, [dispatch]);

  if (loading) {
    // Retorne um JSX válido enquanto carrega
    return <p>Loading...</p>;
  }

  if (error) {
    // Retorne um JSX válido em caso de erro
    return <p>Error: {error}</p>;
  }

  // Verifique a estrutura dos dados recebidos
  const colaboradores = data.colaboradores || [];

  return (
    <div>
      {colaboradores.length > 0 ? (
        <ul>
          {colaboradores.map((item: any) => (
            <li key={item.email}>{item.nome}</li>
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default CardColaborador;
