import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  fetchSalaoRequest,
  resetSalaoState,
} from "../../store/modules/salao/salaoSlice";
import { Nav, Loader } from "rsuite";
import { Link } from "react-router-dom";
import util from "../../services/util";
import { setLoading } from "../../store/modules/clientes/clientesSlice";

function HomeCliente() {
  const { nome } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [userCoordinates, setUserCoordinates] = useState(null);

  const dispatch = useDispatch();
  const { salao, error, currentSalao } = useSelector((state) => state.salao);
  const { servicos, loading } = useSelector((state) => state.servicos);
  const selectSalao = salao.salao || currentSalao || {};

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
      // console.log(coordinates);
    } catch (error) {
      console.error("Erro ao obter coordenadas:", error);
    }
  };

  useEffect(() => {
    dispatch(resetSalaoState());

    dispatch({
      type: "servicos/fetchAllServicos",
    });

    fetchUserLocation();
    dispatch(setLoading(false));
  }, []);

  const servicosArray = servicos.length > 0 ? servicos : [];

  useEffect(() => {
    console.log();
    if (userCoordinates && !salao.salao) {
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
        className="p-2 "
        style={{ zIndex: "30", width: "100%" }}
      >
        {currentSalao._id ? (
          <Nav.Item
            as={Link}
            className=""
            to="/AgendamentosMobile"
            eventKey="app"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Nav.Item>
        ) : (
          ""
        )}
        <Nav.Item as={Link} to="/Salao/Deyvid-Barber" eventKey="Home">
          Agendar
        </Nav.Item>
        {localStorage.getItem("cl_idtor") ? (
          <Nav.Item className="" as={Link} to="/Agendados" eventKey="Agenda">
            Agendados
          </Nav.Item>
        ) : (
          ""
        )}
      </Nav>

      <div
        style={{
          backgroundImage: `url(${selectSalao.capa})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "20vh",
          position: "relative",
        }}
        className="d-flex justify-content-end align-items-end"
      >
        <div
          className="d-flex align-items-end justify-content-end"
          style={{
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Escurece o overlay
            zIndex: 1,
            background: "rgba(0, 0, 0, 0.5)",
            position: "absolute",
          }}
        >
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
              width: "100vw",
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
      </div>

      {/* Action Section */}
      <div className="d-flex justify-content-end gap-3  align-items-center action py-4 px-3">
        <div
          style={{ cursor: "pointer",textAlign:"center" }}
          className=""
          onClick={() => handleLigar(selectSalao.telefone)}
        >
          <i className="fa-solid fa-phone"></i> Ligar
        </div>
        •
        <div
          style={{ cursor: "pointer" ,textAlign:"center"}}
          onClick={() => handleMap(selectSalao.geo?.coordinates)}
        >
          <i className="fa-solid fa-map"></i> Visitar
        </div>
        •
        <div style={{ cursor: "pointer" ,textAlign:"center"}} onClick={handleShare}>
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
          style={{
            overflowY: "auto",
            height: "auto",
            maxHeight: "45vh",
            overflowX: "clip",
          }}
        >
          {!loading ? (
            filteredServices.map((service, index) => (
              <div
                key={index}
                className="card mb-4 p-3 shadow-sm d-flex flex-row align-items-center justify-content-between "
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  border: "1px solid #e0e0e0",
                  transition: "transform 0.2s ease-in-out",
                  cursor: "pointer",
                  overflowX: "-moz-hidden-unscrollable",
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
                    textAlign: "center",
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
                <div className="service-details d-flex flex-column">
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
                    R$ {Number(service.preco).toFixed(2)} <br />{" "}
                    {service.duracao} min
                  </p>
                </div>

                {/* Botão de Agendar */}
                <div className="">
                  <button
                    className="btn btnPrimary btn-Primary text-white"
                    style={{
                      padding: "2px 8px",
                      borderRadius: "8px",
                      width: "90px",
                    }}
                    onClick={() => {
                      handleAgendarClick(service);
                    }}
                  >
                    <i className="fas fa-calendar-check "></i> Agendar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="d-flex justify-content-center align-items-center">
                <Loader size="lg" /> {/* Loader do rsuite */}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default HomeCliente;
