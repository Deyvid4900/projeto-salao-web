import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRequest } from "../../store/modules/servicos/servicosSlice";
import { Spinner } from "react-bootstrap";
import moment from 'moment';
import 'moment/locale/pt-br';

export const CardServico = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.servicos);

  const [selectedServico, setSelectedServico] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchAllRequest());
  }, [dispatch]);

  useEffect(() => {
    if (selectedServico) {
      setShowModal(true);
    }
  }, [selectedServico]);

  const servicos = data.servicos || [];

  const formatDate = (dateString) => {
    return moment(dateString).format('D [de] MMMM [de] YYYY [às] HH:mm:ss');
  };

  return (
    <div className="container mt-4">
      {loading && (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100px" }}>
          <Spinner animation="border" />
        </div>
      )}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && (
        <div>
          <h2 className="mb-4">Serviços</h2>
          <div className="row">
            {servicos.map((servico) => (
              <div key={servico._id} className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title " style={{}}>{servico.titulo}</h5>
                    <button
                      className="btn btn-primary"
                      style={{float:'right'}}
                      onClick={() => setSelectedServico(servico)}
                    >
                      Ver detalhes
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && selectedServico && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{selectedServico.titulo}</h5>
                <button type="button" className="btn close" onClick={() => setShowModal(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}><strong>Recorrência:</strong> {selectedServico.recorrencia}</p>
                <p style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}><strong>Status:</strong> {selectedServico.status}</p>
                <p style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}><strong>Descrição:</strong> {selectedServico.descricao}</p>
                <p style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}><strong>Preço:</strong> {selectedServico.preco}</p>
                <p style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}><strong>Data do Cadastro:</strong> {formatDate(selectedServico.dataCadastro)}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardServico;
