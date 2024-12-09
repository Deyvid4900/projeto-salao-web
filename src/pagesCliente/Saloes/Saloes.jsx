import React, { useEffect, useState } from "react";
import { Avatar, Loader, Panel } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetSalaoState } from "../../store/modules/salao/salaoSlice";
import { resetServicoState } from "../../store/modules/servicos/servicosSlice";

const SalonsList = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(""); // Estado para o filtro de pesquisa

  useEffect(() => {
    // Simula uma chamada à API
    dispatch(resetSalaoState());
    dispatch({
      type: "Saloes/GetSaloes",
    });
  }, [dispatch]);

  const handleSaloes = (id) => {
    console.log(id);
    localStorage.setItem("_dSlun", id);
    dispatch(resetServicoState());
  };

  const { saloes, loading } = useSelector((state) => state.salao);
  const salons = saloes.saloes || [];

  // Filtrando os salões com base no nome
  const filteredSalons = salons.filter((salon) =>
    salon.nome.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <header
        className="container-fluid p-2 col-12 d-flex align-items-center justify-content-between"
        style={{ backgroundColor: "var(--color-salaoPrimary)" }}
      >
        <Link to="/" className="btn d-flex align-items-center">
          <span className="material-symbols-outlined text-white">
            arrow_back
          </span>
        </Link>
        <div className="d-flex justify-content-center flex-grow-1">
          <img src="/assets/Group3.png" alt="" className="mx-auto" />
        </div>
        <div style={{ width: "40px" }}></div>{" "}
        {/* Espaço vazio para manter alinhamento */}
      </header>

      <div className="container mt-5">
        <div className="mb-5 d-flex align-items-center justify-content-center gap-2">
          <h2 className="text-center">Pesquise:</h2>
          <input
            type="text"
            className="form-control w-50"
            placeholder="Pesquisar salões..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)} // Atualiza o estado do filtro
          />
        </div>
        <div className="row">
          {loading == true ? (
            <div className=" d-flex justify-content-center align-items-center">
              <Loader size="lg" />
            </div>
          ) : (
            ""
          )}
          {filteredSalons.map((salon) => (
            <div key={salon._id} className="col-md-6 mb-4">
              <Panel shaded bordered bodyFill>
                <div
                  className="d-flex align-items-center justify-content-around p-3"
                  style={{ flexWrap: "wrap" }}
                >
                  <Avatar
                    circle
                    src={salon.capa || "https://via.placeholder.com/80"}
                    alt={salon.nome}
                    size="lg"
                    className="me-3"
                  />
                  <div>
                    <h5 className="mb-1">{salon.nome}</h5>
                    <p className="mb-0 text-muted">{salon.email}</p>
                    <p className="mb-0">{salon.telefone}</p>
                  </div>
                  <div className="p-3 text-center">
                    <Link
                      onClick={() => handleSaloes(salon._id)}
                      to={`/Salao/${salon.nome}`}
                      className="btn btnSeccundary"
                    >
                      Ver Serviços
                    </Link>
                  </div>
                </div>
              </Panel>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalonsList;
