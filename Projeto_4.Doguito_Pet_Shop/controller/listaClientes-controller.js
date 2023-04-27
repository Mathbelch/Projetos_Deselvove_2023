import { clienteService } from "../service/cliente-service.js";

// Montando uma função com template string para inserir os dados de clientes no HTML como uma lista, contendo o nome e email dos clientes:

const criaNovaLinha = (nome, email) => {
   const linhaNovoCliente = document.createElement('tr');
   const conteudo = `
      <td class="td" data-td>${nome}</td>
         <td>${email}</td>
         <td>
            <ul class="tabela__botoes-controle">
               <li><a href="../telas/edita_cliente.html" class="botao-simples botao-simples--editar">Editar</a></li>
               <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
            </ul>
         </td>
         `;
   linhaNovoCliente.innerHTML = conteudo;
   return linhaNovoCliente;
};

// Pegando a área html de lista_clientes onde serão inseridos os dados:
const tabela = document.querySelector('[data-tabela]');

// Chamando a função listaClientes, que retornará uma promisse, e com essa vamos percorrer cada elemento do array de resultados, chamar a função de criar linha e inserir essa linha na tabela HTML:
clienteService.listaClientes().then(data => {
   data.forEach(elemento => {
      tabela.appendChild(criaNovaLinha(elemento.nome, elemento.email))
      });
});