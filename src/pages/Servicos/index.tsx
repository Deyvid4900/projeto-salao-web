import React from "react"
import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"
import BG from "../../components/background/background"
import CardServico from "../../components/servicosCard/servicoCard"

export const Servicos=()=>{

  return (
    <>
    <BG></BG>
    <Header></Header>
    <Sidebar></Sidebar>
    <div className="d-flex flex-column justify-content-center align-items-center" style={{}}>
        <div className="mt-5" style={{width:"90%"}}>
          <CardServico></CardServico>
        </div>
      </div>
    </>
  )
}

export default Servicos
