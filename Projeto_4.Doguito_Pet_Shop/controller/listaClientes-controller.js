import { clienteService } from "../service/cliente-service.js";

// Montando uma função com template string para inserir os dados de clientes no HTML como uma lista, contendo o nome e email dos clientes. Vamos incluir o id para conseguirmos depois fazer a manipulação desse cliente de forma mais facil:
   // Vamos incluir %{id} no link html do 'editar' para poder depois identificar pelo link página o cliente que será editado!

const criaNovaLinha = (nome, email, id) => {
   const linhaNovoCliente = document.createElement('tr');
   const conteudo = `
      <td class="td" data-td>${nome}</td>
         <td>${email}</td>
         <td>
            <ul class="tabela__botoes-controle">
               <li><a href="../telas/edita_cliente.html?id=${id}" class="botao-simples botao-simples--editar">Editar</a></li>
               <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
            </ul>
         </td>
         `;
   linhaNovoCliente.innerHTML = conteudo;
   linhaNovoCliente.dataset.id = id;
   return linhaNovoCliente;
};

// Pegando a área html de lista_clientes onde serão inseridos os dados:
const tabela = document.querySelector('[data-tabela]');

// Quando houver clique, verificaremos se o botão clicado foi o botão de excluir cliente. Se sim, iremos chamar a função removeCliente passando o id do cliente para remove-lo do BD. Para remove-lo do HTML vamos buscar o elemento pais mais próximo do botão (justamente a tr que quero remover), então pegaremos seu id, usamos esse id para o remove cliente excluir da api, e depois usamos o remove() para excluir toda a tr com esse id do html:
tabela.addEventListener('click', async(evento) => {
   let identificaBotao = evento.target.className === 'botao-simples botao-simples--excluir';
   if(identificaBotao) {
      try {
         const linhaCliente = evento.target.closest('[data-id]')
         let id = linhaCliente.dataset.id
         await clienteService.removeCliente(id)
         linhaCliente.remove()
      } catch(erro) {
         console.log(erro)
         window.location.href = "../telas/erro.html"
      }
  
   }
});

// Chamando a função listaClientes, que retornará uma promisse, e com essa vamos percorrer cada elemento do array de resultados, chamar a função de criar linha e inserir essa linha na tabela HTML:
const render = async () => {
   try {
      const listaClientes = await clienteService.listaClientes()
      listaClientes.forEach(elemento => {
            tabela.appendChild(criaNovaLinha(elemento.nome, elemento.email, elemento.id))
            })
      }
      catch(erro) {
         console.log(erro)
         window.location.href = "../telas/erro.html"
      }
};

render();