// Para simular hospedagem API servidor localmente: npx json-server --watch db.json

//Usando a fetch, ela já faz o get e gera uma promisse automáticamente, then podemos retornar a resposta em formato json:
const listaClientes = () => {
   return fetch(`http://localhost:3000/profile`)
   .then(resposta => {
      return resposta.json(); 
   });
};

// Objeto exportando funções do cliente-server:
export const clienteService = {
   listaClientes
}



