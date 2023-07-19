import Formulario from "../componentes/Formulario/Formulario";
import ListaParticipantes from "../componentes/ListaParticipantes/ListaParticipantes";
import Rodape from "../componentes/Rodape/Rodape";
import Card from "../componentes/Card/Card";

const Configuracao = () => {
   return(
      <Card>
         <section>
            <h2>Vamos começar!</h2>
            <Formulario />
            <ListaParticipantes />
            <Rodape />
         </section>
      </Card>
   )
}

export default Configuracao;