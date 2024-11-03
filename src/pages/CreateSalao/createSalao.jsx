import React, { useState } from 'react';

const SalonForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    foto: '',
    capa: '',
    email: '',
    senha: '',
    telefone: '',
    endereco: {
      cidade: '',
      uf: '',
      cep: '',
      logradouro: '',
      numero: '',
      pais: ''
    },
    geo: {
      coordinates: [0, 0]
    },
    plano: '',
    cor: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    // Add your submit logic here
  };

  return (
    <div className="container mt-4 mb-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Cadastro de Salão</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Informações Básicas */}
            <div className="mb-4">
              <h4 className="mb-3">Informações Básicas</h4>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Nome do Salão</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Senha</label>
                  <input
                    type="password"
                    className="form-control"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Telefone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">URL da Foto</label>
                  <input
                    type="text"
                    className="form-control"
                    name="foto"
                    value={formData.foto}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">URL da Capa</label>
                  <input
                    type="text"
                    className="form-control"
                    name="capa"
                    value={formData.capa}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Endereço */}
            <div className="mb-4">
              <h4 className="mb-3">Endereço</h4>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Logradouro</label>
                  <input
                    type="text"
                    className="form-control"
                    name="endereco.logradouro"
                    value={formData.endereco.logradouro}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Número</label>
                  <input
                    type="text"
                    className="form-control"
                    name="endereco.numero"
                    value={formData.endereco.numero}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Cidade</label>
                  <input
                    type="text"
                    className="form-control"
                    name="endereco.cidade"
                    value={formData.endereco.cidade}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">UF</label>
                  <input
                    type="text"
                    className="form-control"
                    name="endereco.uf"
                    value={formData.endereco.uf}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">CEP</label>
                  <input
                    type="text"
                    className="form-control"
                    name="endereco.cep"
                    value={formData.endereco.cep}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">País</label>
                  <input
                    type="text"
                    className="form-control"
                    name="endereco.pais"
                    value={formData.endereco.pais}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Geolocalização */}
            <div className="mb-4">
              <h4 className="mb-3">Geolocalização</h4>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Latitude</label>
                  <input
                    type="number"
                    className="form-control"
                    name="geo.coordinates.0"
                    value={formData.geo.coordinates[0]}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Longitude</label>
                  <input
                    type="number"
                    className="form-control"
                    name="geo.coordinates.1"
                    value={formData.geo.coordinates[1]}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Plano e Cor */}
            <div className="mb-4">
              <h4 className="mb-3">Configurações</h4>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Plano</label>
                  <select
                    className="form-select"
                    name="plano"
                    value={formData.plano}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione um plano</option>
                    <option value="básico">Básico</option>
                    <option value="gold">Gold</option>
                    <option value="premium">Premium</option>
                    <option value="teste">Teste</option>
                    <option value="master">Master</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Cor</label>
                  <select
                    className="form-select"
                    name="cor"
                    value={formData.cor}
                    onChange={handleChange}
                  >
                    <option value="">Selecione uma cor</option>
                    <option value="azul">Azul</option>
                    <option value="laranja">Laranja</option>
                    <option value="verde">Verde</option>
                    <option value="dourado">Dourado</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-lg">
                Cadastrar Salão
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SalonForm