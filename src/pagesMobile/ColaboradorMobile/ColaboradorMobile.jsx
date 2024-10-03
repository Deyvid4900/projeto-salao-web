import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import "../../App";
import moment from "moment";
import BG from "../../components/background/background";
import {
  Table,
  Button,
  Drawer,
  ButtonToolbar,
  Form,
  Input,
  Modal,
  Notification,
  useToaster,
} from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setColaboradores,
  fetchAllColaboradores,
  setColaborador,
  saveColaborador,
  filterColaborador,
} from "../../store/modules/colaborador/colaboradorSlice";
import HeaderMobile from "../../components/HeaderMobile/HeaderMobile";

const Textarea = React.forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));

export const ColaboradorMobile = () => {
  const { colaboradores, colaborador, components } = useSelector(
    (state) => state.colaborador
  );
  const { Column, HeaderCell, Cell } = Table;
  const dispatch = useDispatch();

  const [overflow, setOverflow] = useState(true);
  const [open, setOpen] = useState(false);
  const [openInformation, setOpenInformation] = useState(false);
  const [type, setType] = useState("info");
  const toaster = useToaster();
  const [formData, setFormData] = useState({
    _id: undefined,
    nome: "",
    sexo: "",
    dataNascimento: "",
    dataCadastro: "",
    email: "",
    telefone: "",
  });

  useEffect(() => {
    dispatch(fetchAllColaboradores());
  }, [dispatch]);

  useEffect(() => {
    const { type, description } = components.notification;

    // Verifica se a notificação contém um tipo e descrição
    if (type && description) {
      toaster.push(
        <Notification
          type={type}
          header={type === "error" ? "Erro" : "Sucesso"}
          duration={5000} // Duração em milissegundos
          closable
        >
          {description}
        </Notification>,
        
        {
          placement: "bottomEnd",
          duration: 2000 // Ajuste a posição da notificação conforme necessário
        }
      );
    }
  }, [components.notification, toaster]);

  useEffect(() => {
    if (colaborador) {
      setFormData({
        _id: colaborador._id,
        nome: colaborador.nome || "",
        sexo: colaborador.sexo || "",
        dataNascimento: colaborador.dataNascimento
          ? colaborador.dataNascimento
          : "",
        dataCadastro: colaborador.dataCadastro ? colaborador.dataCadastro : "",
        email: colaborador.email || "",
        telefone: colaborador.telefone || "",
      });
    }
  }, [colaborador]);

  const handleInputChange = (value, name) => {
    console.log(value);
    setFormData({ ...formData, [name]: value });
  };

  const handleRowClick = (rowData) => {
    dispatch(setColaborador(rowData));
    setOpenInformation(true);
  };
  const handleSubmit = () => {
    const colaboradorData = {
      ...formData,
    };
    console.log(colaboradorData);
    dispatch(saveColaborador(colaboradorData));
    setOpen(false);
  };

  return (
    <>
      <HeaderMobile></HeaderMobile>
    </>
  );
};

export default ColaboradorMobile;
