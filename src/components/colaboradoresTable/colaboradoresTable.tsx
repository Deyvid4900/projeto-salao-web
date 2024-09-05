import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllRequest,
  fetchOneRequest,
} from "../../store/modules/colaborador/colaboradorSlice";

export const CardColaborador = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: any) => state.colaborador
  );

  useEffect(() => {
    dispatch(fetchAllRequest());
  }, [dispatch]);

  const colaboradores = data.colaboradores || [];
  const colaborador = data.colaborador || {};

  const handleShowMoreInformation = (id: any) => {
    dispatch(fetchOneRequest(id));
  };

  // Log data after the component renders
  useEffect(() => {
    if (Object.keys(colaborador).length > 0) {
      console.log("Colaborador Details:", colaborador);
    }
  }, [colaborador]);

  return (
    
    <>
    <button className="btn btn-danger" style={{float:'right',zIndex:5,position:'relative'}}>Novo Colaborador</button>
    <div
      className="mt-2"
      style={{
        zIndex: 2,
        position: "relative",
        height: "75vh",
        backgroundColor: "rgb(255 255 255 / 50%)",
        boxShadow: "6px 6px 12px #d9d9d9,-6px -6px 12px #ffffff",
      }}
    >
      
      <div className="mt-5 " style={{}}>
        {error && <p>Error: {error}</p>}
        {colaboradores.length > 0 ? (
          <table
            className="table table-hover table-striped  table-bordered"
            width={"100%"}
          >
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
              </tr>
            </thead>
            <tbody>
              {colaboradores.map((item: any) =>
                item.status === "A" ? (
                  <tr
                    style={{ cursor: "pointer" }}
                    key={item._id}
                    onClick={() => handleShowMoreInformation(item._id)}
                  >
                    <td>{item.nome}</td>
                    <td>{item.email}</td>
                    <td>{item.telefone}</td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        ) : (
          <p>No data available</p>
        )}
      </div>

    </div>
    </>
  );
};

export default CardColaborador;
