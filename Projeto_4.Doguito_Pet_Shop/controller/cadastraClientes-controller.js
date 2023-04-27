import { clienteService } from "../service/cliente-service.js";

// Pegando a área do formulário de cadastro de novo cliente:
const formulario = document.querySelector('[data-form]');

// Ao enviar o fomulário teremos um evento. Iremos pegar os dados de nome e email (valores dentro do query selector dos campos específicos, dentro do target do evento) e eviar para a função criarCliente, que retornará uma promisse. A partir disso iremos redirecionar (window.location.href) para a tela de cadastro concluido:
formulario.addEventListener('submit', async (evento) => {
   evento.preventDefault();
   const nome = evento.target.querySelector('[data-nome]').value;
   const email = evento.target.querySelector('[data-email]').value;
   try {
      await clienteService.criaCliente(nome, email)
      window.location.href = '../telas/cadastro_concluido.html'
   } catch(erro) {
      console.log(erro)
      window.location.href = "../telas/erro.html"
   }
})