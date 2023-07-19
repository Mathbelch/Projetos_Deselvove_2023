import getApiKey from '../keys.js';

// Definindo função para validar o email do usuário, checando o seu domínio:
export default async function validaEmail(email) {
   // Puxando elementos HTML:
   var mensagemErro = document.getElementById('erroMail');
   mensagemErro.innerHTML = "";

   // Comunicação com a API, convertendo da resposta para Json e preenchimento dinâmico dos elementos HTML:
   try {
      const key = getApiKey('mail');
      var consultaMail = await fetch(`https://emailverification.whoisxmlapi.com/api/v2?apiKey=${key}&emailAddress=${email}`);

      if (consultaMail.status === 400) {
         mensagemErro.innerHTML = "<p>Insira seu e-mail para continuar o cadastro!</p>"
         throw Error('Formato de email inválido');
      }

      var consultaMailJson = await consultaMail.json();

      if(consultaMailJson.dnsCheck === 'false') { // Ensures that the domain in the email address, eg: gmail.com, is a valid domain.
         mensagemErro.innerHTML = "<p>E-mail inválido. Verifique o domínio de email e tente novamente!</p>"
         throw Error('Formato de email inválido');
      }

      if(consultaMailJson.formatCheck === 'false') { // Check for syntax errors in the email address. This is a basic check that’s done to catch any simple typos or major errors.
         mensagemErro.innerHTML = "<p>E-mail inválido. Verifique a sintaxe do email e tente novamente!</p>"
         throw Error('Formato de email inválido');
      }

      return consultaMailJson;

   // Caso a Promisse seja rejeitada, temos um domínio de e-mail inválido:
   } catch (erro) {
      console.log(erro);
   } 
};