// Para simular hospedagem API servidor localmente: npx json-server --watch db.json
// Para hospedar servido de lista_clientes: browser-sync start --server --file . --host --port 5000 --startPath ../telas/lista_cliente.html

//Usando a fetch, ela já faz o get e gera uma promisse automáticamente, then podemos retornar a resposta em formato json:
const listaClientes = () => {
   return fetch(`http://localhost:3000/profile`)
   .then(resposta => {
      return resposta.json(); 
   });
};

//Usando o fetch com método POST podemos adicionar algo na API, devendo declarar o tipo de dado no header e os dados que estarão no body (JSON.stringify() converte o nome e email de texto para formato json):
const criaCliente = (nome, email) => {
   return fetch(`http://localhost:3000/profile`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         nome: nome,
         email: email
      })
   })
   .then(resposta => {
      return resposta.body
   })
};

// Para excluir um cliente, basta que tenhamos seu ID e usemos o metódo delete na requisição:
const removeCliente = (id) => {
   return fetch(`http://localhost:3000/profile/${id}`, {
      method: 'DELETE'
   })
};

// Função similar a listaCliente, mas agora quero achar o nome e o email a partir do id, retornando a resposta convertida para string:
const detalhaCliente = (id) => {
   return fetch(`http://localhost:3000/profile/${id}`)
   .then(resposta => {
      return resposta.json() 
   })
};

// Função irá fazer uma requisição com método PUT para poder alterar dados, recebendo o id, nome e email e retornando um objeto json com o novo nome e email:
const atualizaCliente = (id, nome, email) => {
   return fetch(`http://localhost:3000/profile/${id}`, {
      method: 'PUT',
      headers: {
         'Content-type': 'application/json'
      },
      body: JSON.stringify({
         nome: nome,
         email: email
      })
   })
   .then(resposta => {
      return resposta.json()
   })
};

// Objeto exportando funções do cliente-server:
export const clienteService = {
   listaClientes,
   criaCliente,
   removeCliente,
   detalhaCliente,
   atualizaCliente
}



