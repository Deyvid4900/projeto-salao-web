import { Panel, FlexboxGrid } from "rsuite";
// import "./Help.css";

const HelpMobile = () => {
  return (
    <>
      {/* Navegação superior */}

      <div className="container-fluid px-3 mt-4">
        <div className="mb-4">
          <h4>Precisa de ajuda?</h4>
          <p className="text-muted">
            Aqui você encontra respostas para as perguntas mais frequentes e
            instruções para usar o aplicativo.
          </p>
        </div>

        {/* Lista de perguntas frequentes */}
        <FlexboxGrid
          style={{
            overflowX: "auto",
            maxHeight: "75vh",
          }}
          className="faq-list"
        >
          <FlexboxGrid.Item colspan={24} className="mb-3">
            <Panel bordered header={<strong>Como agendar um horário?</strong>}>
              <p className="text-muted">
                Para agendar um horário, vá até a página "Agendar", escolha o
                serviço desejado e siga as instruções para selecionar um especialista, a data e o
                horário.
              </p>
            </Panel>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={24} className="mb-3">
            <Panel
              bordered
              header={<strong>Como cancelar um agendamento?</strong>}
            >
              <p className="text-muted">
                Acesse a página "Agendados", localize o horário que deseja
                cancelar e clique no botão "Cancelar". Será necessário confirmar
                antes de prosseguir.
              </p>
            </Panel>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={24} className="mb-3">
            <Panel
              bordered
              header={<strong>O que fazer se não encontrar um serviço?</strong>}
            >
              <p className="text-muted">
                Certifique-se de que está navegando no salão correto. Caso ainda
                tenha dificuldades, entre em contato pelo WhatsApp listado na
                página "Agendar".
              </p>
            </Panel>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={24} className="mb-3">
            <Panel
              bordered
              header={<strong>Posso alterar meu cadastro?</strong>}
            >
              <p className="text-muted">
                Sim, vá até a seção de "Perfil" no menu e edite as informações
                desejadas.
              </p>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </div>
    </>
  );
};

export default HelpMobile;
