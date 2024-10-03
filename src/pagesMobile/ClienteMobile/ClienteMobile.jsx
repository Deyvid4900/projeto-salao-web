import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import "../../App";
import BG from "../../components/background/background";
import {
  Table,
  Button,
  Drawer,
  ButtonToolbar,
  Form,
  Input,
  InputGroup,
  InputNumber,
} from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllClientesRequest,
  selectedCliente,
} from "../../store/modules/clientes/clientesSlice";
import HeaderMobile from "../../components/HeaderMobile/HeaderMobile";

const Textarea = React.forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));

export const ClienteMobile = () => {
  const { Column, HeaderCell, Cell } = Table;
  const dispatch = useDispatch();
  const { clientes, cliente } = useSelector((state) => state.cliente);

  const [backdrop, setBackdrop] = useState("static");
  const [open, setOpen] = useState(false);


  useEffect(() => {
    dispatch(fetchAllClientesRequest());
  }, [dispatch]);

  

  return (
   <>
   <HeaderMobile></HeaderMobile>
   
   </>
  );
};

export default ClienteMobile;
