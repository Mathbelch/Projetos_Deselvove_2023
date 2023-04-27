// Para simular hospedagem API servidor localmente: npx json-server --watch db.json

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

// Adicionando na tabela uma nova linha para cada cliente a partir dos dados do BD (nome e email): 
   //tabela.appendChild(criaNovaLinha(nome, email));
// Vou inserir isso dentro do http.onload, para que ocorra para cada cliente cadastro no BD!

const listaClientes = () => {
   // Declarando uma promessa de requisição:
   const promise = new Promise((resolve, reject) => {
      // Inicializando objeto http de requisição:
      const http = new XMLHttpRequest();

      // Abrindo comunicação com o servidor, usando o método GET e endereço local para simular uma API!
      http.open('GET', 'http://localhost:3000/profile');

      // Ao carregar a página, se o status da solicitação for maior que 400 (erros cliente-servidor), rejeitaremos a promisse. Caso contrário, tudo certo. Lembrando de que em ambos os cenários temos que converter a resposta em objeto json:
      http.onload = () => {
         if(http.status >= 400) {
            reject(JSON.parse(http.response))
         } else {
            resolve(JSON.parse(http.response))
         }
      };
      http.send();
   });
   console.log(promise);
   return promise;
};

// Ao carregar a página, teremos a comunicação com a API e os dados ficaram salvos em formato de texto (reponse). Convertemos isso em objetos JS, todos em um array. Para cada elemento do array vamos invocar a função de criar uma nova linha e já incluir essa linha na tabela HTML:


// Chamando a função listaClientes, que retornará uma promisse, e com essa vamos percorrer cada elemento do array de resultados, chamar a função de criar linha e inserir essa linha na tabela HTML:
listaClientes().then(data => {
   data.forEach(elemento => {
      tabela.appendChild(criaNovaLinha(elemento.nome, elemento.email))
      });
});


