import React, { useState } from "react";
import HeaderMobile from "../../components/HeaderMobile/HeaderMobile";

const SettingsPage = () => {
  const [openingHours, setOpeningHours] = useState({ start: "", end: "" });
  const [themeColor, setThemeColor] = useState("#007bff");
  const [coverImage, setCoverImage] = useState(null);

  const handleSave = () => {
    // Lógica para salvar configurações
    console.log({ openingHours, themeColor, coverImage });
  };

  return (
    <>
      <HeaderMobile />
      <div className="container mt-4">
        <h2 className="text-center mb-4">Configurações</h2>

        <div className="card mb-4">
          <div className="card-body">
            <h4>Horários de Funcionamento</h4>
            <div className="d-flex flex-column flex-md-row gap-3 align-items-center">
              <div className="form-group">
                <label htmlFor="start">Início</label>
                <input
                  type="time"
                  id="start"
                  className="form-control"
                  value={openingHours.start}
                  onChange={(e) =>
                    setOpeningHours({ ...openingHours, start: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="end">Encerramento</label>
                <input
                  type="time"
                  id="end"
                  className="form-control"
                  value={openingHours.end}
                  onChange={(e) =>
                    setOpeningHours({ ...openingHours, end: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <h4>Imagem de Capa</h4>
            <div className="form-group">
              <input
                type="file"
                className="form-control-file"
                onChange={(e) => setCoverImage(e.target.files[0])}
              />
            </div>
            {coverImage && (
              <img
                src={URL.createObjectURL(coverImage)}
                alt="Preview"
                className="mt-3 img-fluid"
              />
            )}
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <h4>Cor Tema</h4>
            <input
              type="color"
              className="form-control form-control-color"
              value={themeColor}
              onChange={(e) => setThemeColor(e.target.value)}
            />
            <div
              className="mt-3"
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: themeColor,
                border: "1px solid #ccc",
              }}
            ></div>
          </div>
        </div>

        <button className="btn btn-primary btn-block" onClick={handleSave}>
          Salvar Configurações
        </button>
      </div>
    </>
  );
};

export default SettingsPage;
