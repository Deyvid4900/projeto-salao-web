import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { fetchSalaoRequest } from "../../store/modules/salao/salaoSlice";
import { fetchAllRequest } from "../../store/modules/servicos/servicosSlice";

function HomeCliente() {
  const { nome } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [userCoordinates, setUserCoordinates] = useState(null);

  const dispatch = useDispatch();
  const { saloes, loading, error } = useSelector((state) => state.salao);
  const { data } = useSelector((state) => state.servicos);
  const selectSalao = saloes.salao || {};

  const handleAgendarClick = (servico) => {
    navigate("/agendamento", { state: { servico } });
  };

  const formatarDistancia = (metros) => {
    return metros;
  };

  const handleLigar = (numero) => {
    if (numero) {
      window.location.href = `tel:${numero}`;
    } else {
      console.error("Número inválido");
    }
  };

  const handleMap = (coordinates) => {
    if (coordinates && coordinates.length === 2) {
      const [lat, lng] = coordinates;
      const url = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=18/${lat}/${lng}`;
      window.open(url, "_blank");
    } else {
      console.error("Coordenadas inválidas");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Confira este salão!",
          text: "Veja esse salão incrível que encontrei!",
          url: window.location.href,
        })
        .then(() => {
          console.log("Compartilhamento bem-sucedido");
        })
        .catch((error) => {
          console.error("Erro ao compartilhar:", error);
        });
    } else {
      console.error("A Web Share API não é suportada neste navegador.");
    }
  };

  const getUserCoordinates = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve([latitude, longitude]);
          },
          (error) => {
            console.error("Erro ao obter a localização:", error);
            reject(error);
          }
        );
      } else {
        console.error("Geolocalização não é suportada por este navegador.");
        reject(new Error("Geolocalização não suportada"));
      }
    });
  };

  const fetchUserLocation = async () => {
    try {
      const coordinates = await getUserCoordinates();
      setUserCoordinates(coordinates);
      console.log(coordinates);
    } catch (error) {
      console.error("Erro ao obter coordenadas:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchAllRequest());
    fetchUserLocation();
  }, [dispatch]);

  const servicosArray = data.servicos || [];

  useEffect(() => {
    if (userCoordinates) {
      const fetchData = async () => {
        dispatch(fetchSalaoRequest({ nome, coordinates: userCoordinates }));
      };
      fetchData();
    }
  }, [userCoordinates, dispatch, nome]);

  const filteredServices = servicosArray.filter((service) =>
    service.titulo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  const statusStyle = selectSalao.isOpened
    ? { color: "#75b798" }
    : { color: "#ea868f" };

  return (
    <>
      {/* Hero Section */}
      <div
        style={{ backgroundImage: `url(${selectSalao.capa})` }}
        className="hero d-flex justify-content-end align-items-end"
      >
        <div className="overlay"></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            textAlign: "end",
            color: "white",
            padding: 25,
            position: "relative",
            zIndex: 2,
          }}
        >
          <div className="btn btn-md btn-success">
            <i className="fas fa-calendar-check me-2"></i> Reserve Agora
          </div>
          <h2 className="pt-2" style={{ fontWeight: 500 }}>
            {selectSalao.nome}
          </h2>
          <h6 style={{ fontWeight: 400, color: "rgba(248, 247, 255, 0.8)" }}>
            Distância:{" "}
            {selectSalao.distance
              ? formatarDistancia(selectSalao.distance)
              : "Indisponível"}{" "}
            km •{" "}
            <span style={statusStyle}>
              {selectSalao.isOpened ? "Aberto" : "Fechado"}
            </span>
          </h6>
        </div>
      </div>

      {/* Action Section */}
      <div className="d-flex gap-3 justify-content-end action py-4 px-3">
        <div
          style={{ cursor: "pointer" }}
          onClick={() => handleLigar(selectSalao.telefone)}
        >
          <i className="fa-solid fa-phone"></i> Ligar
        </div>
        •
        <div
          style={{ cursor: "pointer" }}
          onClick={() => handleMap(selectSalao.geo?.coordinates)}
        >
          <i className="fa-solid fa-map"></i> Visitar
        </div>
        •
        <div style={{ cursor: "pointer" }} onClick={handleShare}>
          <i className="fa-solid fa-share-nodes"></i> Compartilhar
        </div>
      </div>

      {/* Divisor */}
      <div
        className="divider w-100"
        style={{ height: 25, backgroundColor: "#C4C4C4" }}
      ></div>

      {/* Serviços */}
      <div className="container">
        <div className="search-bar my-3">
          <h3 className="mb-2">Serviços({servicosArray.length})</h3>
          <input
            className="form-control"
            placeholder="Pesquise um serviço..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div
          className="services-list"
          style={{ overflow: "auto", maxHeight: "43vh" }}
        >
          {filteredServices.map((service, index) => (
            <div
              key={index}
              className="card mb-3 d-flex flex-row align-items-center justify-content-end p-3 flex-wrap"
              style={{ backgroundColor: "#f8f9fa", borderRadius: "8px" }}
            >
              {/* Imagem Placeholder */}
              <div
                className="image-placeholder"
                style={{
                  width: "70px",
                  minHeight: "70px",
                  backgroundColor: "#C4C4C4",
                  borderRadius: "8px",
                  marginRight: "15px",
                }}
              ></div>

              {/* Detalhes do Serviço */}
              <div className="service-details flex-grow-1 my-1">
                <h5
                  className="service-title mb-1"
                  style={{ textSizeAdjust: "auto" }}
                >
                  {service.titulo}
                </h5>
                <p className="service-info text-muted">
                  R$ {Number(service.preco).toFixed(2)} • {service.duracao}min{" "}
                  <br />
                  <span>{service.descricao}</span>
                </p>
              </div>

              {/* Botão de Agendar */}
              <div className="mt-2 mt-md-0">
                <button
                  className="btn btn-success"
                  onClick={() => handleAgendarClick(service)}
                >
                  <i className="fas fa-calendar-check me-2"></i> Agendar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomeCliente;
