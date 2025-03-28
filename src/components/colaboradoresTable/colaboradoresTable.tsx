// import React, { useEffect, useState } from "react";
// import Header from "../../components/Header/Header";
// import Sidebar from "../../components/Sidebar/Sidebar";
// import "../../App";
// import BG from "../../components/background/background";
// import {
//   Table,
//   Button,
//   Drawer,
//   ButtonToolbar,
//   Form,
//   Input,
//   InputGroup,
//   InputNumber,
// } from "rsuite";
// import "rsuite/dist/rsuite-no-reset.min.css";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAllRequest,
//   selectedColaborador,
// } from "../../store/modules/colaborador/colaboradorSlice";

// const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

// export const Colaborador = () => {
//   const { Column, HeaderCell, Cell } = Table;
//   const dispatch = useDispatch();
//   const { colaboradores, colaborador } = useSelector((state) => state.colaborador);

//   const [backdrop, setBackdrop] = useState("static");
//   const [open, setOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     nome: "",
//     sexo: "",
//     dataNascimento: "",
//     email: "",
//     telefone: "",
//   });

//   useEffect(() => {
//     dispatch(fetchAllRequest());
//   }, [dispatch]);

//   useEffect(() => {
//     if (colaborador) {
//       setFormData({
//         nome: colaborador.nome || "",
//         sexo: colaborador.sexo || "",
//         dataNascimento: colaborador.dataNascimento || "",
//         email: colaborador.email || "",
//         telefone: colaborador.telefone || "",
//       });
//     }
//   }, [colaborador]);

//   const handleInputChange = (value, name) => {
//     setFormData({ ...formData, [name]: value });
//   };

//   return (
//     <>
//       <BG />
//       <Header />
//       <Sidebar />
//       <div
//         className="d-flex flex-column justify-content-center align-items-center"
//         style={{ maxHeight: "calc(100vh - 95px)", overflowY: "auto" }}
//       >
//         <div className="mt-5" style={{ width: "95%" }}>
//           <Table
//             autoHeight
//             data={colaboradores.colaboradores}
//             onRowClick={(rowData) => {
//               dispatch(selectedColaborador(rowData));
//               setOpen(true);
//             }}
//           >
//             <Column>
//               <HeaderCell>Nome</HeaderCell>
//               <Cell dataKey="nome" />
//             </Column>

//             <Column width={100}>
//               <HeaderCell>Sexo</HeaderCell>
//               <Cell dataKey="sexo" />
//             </Column>

//             <Column width={150}>
//               <HeaderCell>Data de Nascimento</HeaderCell>
//               <Cell dataKey="dataNascimento" />
//             </Column>

//             <Column width={150}>
//               <HeaderCell>Email</HeaderCell>
//               <Cell dataKey="email" />
//             </Column>

//             <Column width={150}>
//               <HeaderCell>Telefone</HeaderCell>
//               <Cell dataKey="telefone" />
//             </Column>

//             <Column width={80} fixed="right">
//               <HeaderCell>Ações</HeaderCell>
//               <Cell style={{ padding: "6px" }}>
//                 {(rowData) => (
//                   <Button
//                     appearance="link"
//                     onClick={() => {
//                       dispatch(selectedColaborador(rowData));
//                       setOpen(true);
//                     }}
//                   >
//                     Editar
//                   </Button>
//                 )}
//               </Cell>
//             </Column>
//           </Table>
//         </div>

//         <Drawer backdrop={backdrop} open={open} onClose={() => setOpen(false)}>
//           <Drawer.Header>
//             <Drawer.Title>Editar Colaborador</Drawer.Title>
//           </Drawer.Header>
//           <Drawer.Body>
//             <Form fluid>
//               <Form.Group controlId="name-1">
//                 <Form.ControlLabel>Nome</Form.ControlLabel>
//                 <Form.Control
//                   name="nome"
//                   value={formData.nome}
//                   onChange={(value) => handleInputChange(value, "nome")}
//                 />
//                 <Form.HelpText>Required</Form.HelpText>
//               </Form.Group>
//               <Form.Group controlId="email-1">
//                 <Form.ControlLabel>Email</Form.ControlLabel>
//                 <Form.Control
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={(value) => handleInputChange(value, "email")}
//                 />
//                 <Form.HelpText>Required</Form.HelpText>
//               </Form.Group>
//               <Form.Group controlId="sexo-1">
//                 <Form.ControlLabel>Sexo</Form.ControlLabel>
//                 <Form.Control
//                   name="sexo"
//                   value={formData.sexo}
//                   onChange={(value) => handleInputChange(value, "sexo")}
//                 />
//               </Form.Group>
//               <Form.Group controlId="dataNascimento-1">
//                 <Form.ControlLabel>Data de Nascimento</Form.ControlLabel>
//                 <Form.Control
//                   name="dataNascimento"
//                   type="date"
//                   value={formData.dataNascimento}
//                   onChange={(value) => handleInputChange(value, "dataNascimento")}
//                 />
//               </Form.Group>
//               <Form.Group controlId="telefone-1">
//                 <Form.ControlLabel>Telefone</Form.ControlLabel>
//                 <Form.Control
//                   name="telefone"
//                   value={formData.telefone}
//                   onChange={(value) => handleInputChange(value, "telefone")}
//                 />
//               </Form.Group>
//               <Form.Group>
//                 <ButtonToolbar>
//                   <Button appearance="primary">Salvar</Button>
//                   <Button appearance="default" onClick={() => setOpen(false)}>Cancelar</Button>
//                 </ButtonToolbar>
//               </Form.Group>
//             </Form>
//           </Drawer.Body>
//         </Drawer>
//       </div>
//     </>
//   );
// };

// export default Colaborador;
// import React, { useEffect, useState } from "react";
// import Header from "../../components/Header/Header";
// import Sidebar from "../../components/Sidebar/Sidebar";
// import "../../App";
// import BG from "../../components/background/background";
// import {
//   Table,
//   Button,
//   Drawer,
//   ButtonToolbar,
//   Form,
//   Input,
//   InputGroup,
//   InputNumber,
// } from "rsuite";
// import "rsuite/dist/rsuite-no-reset.min.css";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAllRequest,
//   selectedColaborador,
// } from "../../store/modules/colaborador/colaboradorSlice";

// const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

// export const Colaborador = () => {
//   const { Column, HeaderCell, Cell } = Table;
//   const dispatch = useDispatch();
//   const { colaboradores, colaborador } = useSelector((state) => state.colaborador);

//   const [backdrop, setBackdrop] = useState("static");
//   const [open, setOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     nome: "",
//     sexo: "",
//     dataNascimento: "",
//     email: "",
//     telefone: "",
//   });

//   useEffect(() => {
//     dispatch(fetchAllRequest());
//   }, [dispatch]);

//   useEffect(() => {
//     if (colaborador) {
//       setFormData({
//         nome: colaborador.nome || "",
//         sexo: colaborador.sexo || "",
//         dataNascimento: colaborador.dataNascimento || "",
//         email: colaborador.email || "",
//         telefone: colaborador.telefone || "",
//       });
//     }
//   }, [colaborador]);

//   const handleInputChange = (value, name) => {
//     setFormData({ ...formData, [name]: value });
//   };

//   return (
//     <>
//       <BG />
//       <Header />
//       <Sidebar />
//       <div
//         className="d-flex flex-column justify-content-center align-items-center"
//         style={{ maxHeight: "calc(100vh - 95px)", overflowY: "auto" }}
//       >
//         <div className="mt-5" style={{ width: "95%" }}>
//           <Table
//             autoHeight
//             data={colaboradores.colaboradores}
//             onRowClick={(rowData) => {
//               dispatch(selectedColaborador(rowData));
//               setOpen(true);
//             }}
//           >
//             <Column>
//               <HeaderCell>Nome</HeaderCell>
//               <Cell dataKey="nome" />
//             </Column>

//             <Column width={100}>
//               <HeaderCell>Sexo</HeaderCell>
//               <Cell dataKey="sexo" />
//             </Column>

//             <Column width={150}>
//               <HeaderCell>Data de Nascimento</HeaderCell>
//               <Cell dataKey="dataNascimento" />
//             </Column>

//             <Column width={150}>
//               <HeaderCell>Email</HeaderCell>
//               <Cell dataKey="email" />
//             </Column>

//             <Column width={150}>
//               <HeaderCell>Telefone</HeaderCell>
//               <Cell dataKey="telefone" />
//             </Column>

//             <Column width={80} fixed="right">
//               <HeaderCell>Ações</HeaderCell>
//               <Cell style={{ padding: "6px" }}>
//                 {(rowData) => (
//                   <Button
//                     appearance="link"
//                     onClick={() => {
//                       dispatch(selectedColaborador(rowData));
//                       setOpen(true);
//                     }}
//                   >
//                     Editar
//                   </Button>
//                 )}
//               </Cell>
//             </Column>
//           </Table>
//         </div>

//         <Drawer backdrop={backdrop} open={open} onClose={() => setOpen(false)}>
//           <Drawer.Header>
//             <Drawer.Title>Editar Colaborador</Drawer.Title>
//           </Drawer.Header>
//           <Drawer.Body>
//             <Form fluid>
//               <Form.Group controlId="name-1">
//                 <Form.ControlLabel>Nome</Form.ControlLabel>
//                 <Form.Control
//                   name="nome"
//                   value={formData.nome}
//                   onChange={(value) => handleInputChange(value, "nome")}
//                 />
//                 <Form.HelpText>Required</Form.HelpText>
//               </Form.Group>
//               <Form.Group controlId="email-1">
//                 <Form.ControlLabel>Email</Form.ControlLabel>
//                 <Form.Control
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={(value) => handleInputChange(value, "email")}
//                 />
//                 <Form.HelpText>Required</Form.HelpText>
//               </Form.Group>
//               <Form.Group controlId="sexo-1">
//                 <Form.ControlLabel>Sexo</Form.ControlLabel>
//                 <Form.Control
//                   name="sexo"
//                   value={formData.sexo}
//                   onChange={(value) => handleInputChange(value, "sexo")}
//                 />
//               </Form.Group>
//               <Form.Group controlId="dataNascimento-1">
//                 <Form.ControlLabel>Data de Nascimento</Form.ControlLabel>
//                 <Form.Control
//                   name="dataNascimento"
//                   type="date"
//                   value={formData.dataNascimento}
//                   onChange={(value) => handleInputChange(value, "dataNascimento")}
//                 />
//               </Form.Group>
//               <Form.Group controlId="telefone-1">
//                 <Form.ControlLabel>Telefone</Form.ControlLabel>
//                 <Form.Control
//                   name="telefone"
//                   value={formData.telefone}
//                   onChange={(value) => handleInputChange(value, "telefone")}
//                 />
//               </Form.Group>
//               <Form.Group>
//                 <ButtonToolbar>
//                   <Button appearance="primary">Salvar</Button>
//                   <Button appearance="default" onClick={() => setOpen(false)}>Cancelar</Button>
//                 </ButtonToolbar>
//               </Form.Group>
//             </Form>
//           </Drawer.Body>
//         </Drawer>
//       </div>
//     </>
//   );
// };

// export default Colaborador;
