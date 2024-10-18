import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { fetchSalaoRequest } from "../../store/modules/salao/salaoSlice";
import { fetchAllRequest } from "../../store/modules/servicos/servicosSlice";
import { Divider, Placeholder, Nav } from "rsuite";
import { Link } from "react-router-dom";
import util from "../../services/util";

function HomeCliente() {
  const { nome } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [userCoordinates, setUserCoordinates] = useState(null);

  const dispatch = useDispatch();
  const { saloes, loading, error } = useSelector((state) => state.salao);
  const { data, servicos } = useSelector((state) => state.servicos);
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
    dispatch({
      type: "servicos/fetchAllServicos",
    });
    fetchUserLocation();
  }, [dispatch]);

  const servicosArray = servicos || [];

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

  if (error) {
    return <div>Erro: {error}</div>;
  }

  const statusStyle = selectSalao.isOpened
    ? { color: "#75b798" }
    : { color: "#ea868f" };

  return (
    <>
      <Nav
        justified
        appearance="pills"
        defaultActiveKey="Home"
        className="p-2 gap-2"
        style={{ position: "absolute", zIndex: "30", width: "100%" }}
      >
        <Nav.Item as={Link} to="/Salao/Deyvid-Barber" eventKey="Home">
          Agendar
        </Nav.Item>
        <Nav.Item as={Link} to="/Agendados" eventKey="Agenda">
          Agendados
        </Nav.Item>
      </Nav>
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
          style={{ overflowY: "auto", maxHeight: "43vh", overflowX:"clip" }}
        >
          {filteredServices.map((service, index) => (
            <div
              key={index}
              className="card mb-4 p-3 shadow-sm d-flex flex-row align-items-center justify-content-between "
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                border: "1px solid #e0e0e0",
                transition: "transform 0.2s ease-in-out",
                cursor: "pointer",
                overflowX:"-moz-hidden-unscrollable"
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.02)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              {/* Imagem do Serviço */}
              <div
                className="image-placeholder d-flex align-items-center justify-content-center "
                style={{
                  textAlign:"center",
                  width: "70px",
                  height: "70px",
                  backgroundColor: "#f1f1f1",
                  borderRadius: "10px",
                  marginRight: "20px",
                  overflow: "hidden",
                }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  key={service.arquivos[0]?._id}
                  src={`${util.AWS.bucketURL}/${service.arquivos[0]?.arquivo}`}
                  alt={service.titulo}
                />
              </div>

              {/* Detalhes do Serviço */}
              <div className="service-details d-flex flex-column"  >
                <h5
                  className="service-title mb-2"
                  style={{ fontSize: "1.0rem", fontWeight: "600" }}
                >
                  {service.titulo}
                </h5>
                <p
                  className="service-info text-muted mb-0"
                  style={{ fontSize: "0.8rem" }}
                >
                  R$ {Number(service.preco).toFixed(2)} <br /> {service.duracao} min
                </p>
                
              </div>

              {/* Botão de Agendar */}
              <div className="">
                <button
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "#FF6B6B",
                    borderColor: "#FF6B6B",
                    padding: "2px 8px",
                    borderRadius: "8px",
                    width:"90px"
                  }}
                  onClick={() => {
                    handleAgendarClick(service);
                    dispatch({
                      type: "agendamento/filterDiasDisponiveis",
                      action: service,
                    });
                  }}
                >
                  <i className="fas fa-calendar-check "></i> Agendar
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
