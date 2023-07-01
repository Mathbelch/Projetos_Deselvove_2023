import { clienteService } from "../service/cliente-service.js";

// Transformando todo o código em uma função assíncrono que sera invocada logo que a página carregar:
(async () => {
   // Vamos criar um novo objeto URL a partir de window location :
   const pegarURL = new URL(window.location);

   // Um objeto URL JS possui a propriedade search params, com vários métodos, incluindo um get para buscar o valor de um parâmetro (vamos buscar pelo id que colocamos no link do botão editar no js listaClientes-controller): 
   const id = pegarURL.searchParams.get('id');

   // Buscando os campos html do nome e email:
   const inputNome = document.querySelector('[data-nome]');
   const inputEmail = document.querySelector('[data-email]');
   try {
      // Chamando a função que pega o id e retorna um objeto 'dados', o nome e o email então são 'jogados' para os campos html para o preeenchimento automático:
      const dados = await clienteService.detalhaCliente(id)
      inputNome.value = dados.nome;
      inputEmail.value = dados.email;
   } catch(erro) {
      console.log(erro)
      window.location.href = "../erro.html"
   }
   //A partir do formulário html podemos adicionar que ao envio, chamaremos a função atualizaCliente  passando o id, nome e email preenchidos na página de edição, e então direcionamos para a página de edição concluida:
   const formulario = document.querySelector('[data-form]');
   formulario.addEventListener('submit', async (evento) => {
      evento.preventDefault()
      try {
         await clienteService.atualizaCliente(id, inputNome.value, inputEmail.value)
         window.location.href = "./edicao_concluida.html"
      } catch(erro) {
         console.log(erro)
         window.location.href = "../telas/erro.html"
      }
   });
})()


