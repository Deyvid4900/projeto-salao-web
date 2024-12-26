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
        className="container-fluid p-2 d-flex align-items-center justify-content-between text-white"
        style={{backgroundColor:'#ff5b5b'}}
      >
        <Link to="/" className="btn d-flex align-items-center text-white">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div className="d-flex justify-content-center flex-grow-1">
          <img
            src="/assets/Group3.png"
            alt="Logo"
            className="mx-auto"
            style={{ maxWidth: "125px", height: "auto" }}
          />
        </div>
        <div style={{ width: "40px" }}></div> {/* Espaço vazio para alinhamento */}
      </header>

      <div className="container mt-4">
        <div className="mb-4 d-flex flex-column align-items-center gap-3">
          <h2 className="text-center">Pesquise:</h2>
          <input
            type="text"
            className="form-control w-100 w-md-50"
            placeholder="Pesquisar salões..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)} // Atualiza o estado do filtro
          />
        </div>

        {loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <Loader size="lg" />
          </div>
        ) : (
          <div className="row">
            {filteredSalons.map((salon) => (
              <div key={salon._id} className="col-12 col-md-6 mb-4" >
                <Panel shaded bordered bodyFill>
                  <div className="d-flex flex-column flex-md-row align-items-center justify-content-between p-3">
                    <Avatar
                      circle
                      src={salon.capa || "https://via.placeholder.com/80"}
                      alt={salon.nome}
                      size="lg"
                      className="mb-3 mb-md-0 me-md-3"
                    />
                    <div className="text-center text-md-start">
                      <h5 className="mb-1">{salon.nome}</h5>
                      <p className="mb-0 text-muted">{salon.email}</p>
                      <p className="mb-0">{salon.telefone}</p>
                    </div>
                    <div className="mt-3 mt-md-0">
                      <Link
                        onClick={() => handleSaloes(salon._id)}
                        to={`/Salao/${salon.nome}`}
                        className="btn btnPrimary"
                      >
                        Ver Serviços
                      </Link>
                    </div>
                  </div>
                </Panel>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SalonsList;