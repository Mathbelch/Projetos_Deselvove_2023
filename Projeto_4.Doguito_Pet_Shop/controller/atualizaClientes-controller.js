import { clienteService } from "../service/cliente-service.js";

// Vamos criar um novo objeto URL a partir de window location :
const pegarURL = new URL(window.location);

// Um objeto URL JS possui a propriedade search params, com vários métodos, incluindo um get para buscar o valor de um parâmetro (vamos buscar pelo id que colocamos no link do botão editar no js listaClientes-controller): 
const id = pegarURL.searchParams.get('id');

// Buscando os campos html do nome e email:
const inputNome = document.querySelector('[data-nome]');
const inputEmail = document.querySelector('[data-email]');

// Chamando a função que pega o id e retorna um objeto 'dados', o nome e o email então são 'jogados' para os campos html para o preeenchimento automático:
clienteService.detalhaCliente(id)
.then((dados) => {
   inputNome.value = dados.nome;
   inputEmail.value = dados.email;
});

//A partir do formulário html podemos adicionar que ao envio, chamaremos a função atualizaCliente  passando o id, nome e email preenchidos na página de edição, e então direcionamos para a página de edição concluida:
const formulario = document.querySelector('[data-form]');
formulario.addEventListener('submit', (evento) => {
   evento.preventDefault()
   clienteService.atualizaCliente(id, inputNome.value, inputEmail.value)
   .then(()=> {
      window.location.href = "../telas/edicao_concluida.html"
   })
});