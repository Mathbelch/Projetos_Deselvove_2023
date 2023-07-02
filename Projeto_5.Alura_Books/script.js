import getApiKey from './apisKeys.js';
import checkCpf from 'check-cpf';

// Definindo função para validar o nome de usuário:
function validaName(name) {
   var mensagemErro = document.getElementById('erroNome');
   mensagemErro.innerHTML = "";
   var regex = new RegExp('[a-zA-ZçÁáÊêÉéÓóÍí]{1}[a-zA-ZçÁáÊêÉéÓóÍí]+\\s[a-zA-Z\\sçÁáÊêÉéÓóÍí]+');
   if (!regex.test(name)) {
      mensagemErro.innerHTML = "<p>É necessário informar seu nome e sobrenome para efeturar o cadastro</p>"
   };
}
// Vamos chamar a função quando o campo de nome no HTML for preenchido e for clicado fora desse campo:  
var nome = document.getElementById('nome');
nome.addEventListener("focusout", () => validaName(nome.value));


// Definindo função para validar a idade do usuário:
function validaDataNascimento(data) {
   var mensagemErro = document.getElementById('erroData');
   mensagemErro.innerHTML = "";
   const dataNascimento = new Date(data);
   const dataMais18 = new Date(dataNascimento.getUTCFullYear() + 18, dataNascimento.getUTCMonth(), dataNascimento.getUTCDate());
   const dataAtual = new Date();
   console.log(dataAtual, dataMais18)
   if (dataMais18 >= dataAtual) {
      mensagemErro.innerHTML = 'Ahhh, não deu certo! É necessário ser maior que 18 anos para se cadastrar :(';
   }
}
// Vamos chamar a função quando o campo de data de nasacimento no HTML for preenchido e for clicado fora desse campo:
var data = document.getElementById('nascimento');
data.addEventListener("focusout", () => validaDataNascimento(data.value));


// Definindo função para validar o telefone do usuário, checando o seu DDD e identificando o seu estado:
async function validaTelefone(telefone) {
   // Puxando elementos HTML:
   var mensagemErro = document.getElementById('erroCel');
   var regiaoDDD = document.getElementById('DDD');
   mensagemErro.innerHTML = "";
   // Deixando apenas números:
   telefone = telefone.replace(/\D/g, '');

   // verificando se tem a qtde de numero correto:
   if (!(telefone.length >= 10 && telefone.length <= 11)) {
      mensagemErro.innerHTML = "<p>Número de telefone inválido: dígito o número entre 10 (residêncial) e 11 (celular) dígitos, incluindo o DDD.</p>";
      return;
   };

   // Se tiver 11 caracteres, verificar se começa com 9 o celular:
   if (telefone.length == 11 && parseInt(telefone.substring(2, 3)) != 9) {
      mensagemErro.innerHTML = "<p>Número de telefone inválido: verifique se o celular está começando com o dígito 9.</p>";
      return;
   };

   // Obtendo o DDD: 
   const ddd = parseInt(telefone.substring(0, 2))

   // Comunicação com a API, conversando da resposta para Json e preenchimento dinâmico dos elementos HTML:
   try {
      var consultaCel = await fetch(`https://brasilapi.com.br/api/ddd/v1/${ddd}`);

      if (consultaCel.status == 404) {
         throw Error('DDD não existente!');
      };

      var consultaCelJson = await consultaCel.json();
      regiaoDDD.innerHTML = consultaCelJson.state;
      return consultaCelJson;

   // Caso a Promisse seja rejeitada, temos um DDD não encontrado:
   } catch (erro) {
      regiaoDDD.innerHTML = "";
      mensagemErro.innerHTML = "<p>DDD não encontrado. Tente novamente!</p>"
      console.log(erro);
   }
   
};
// Vamos chamar a função assíncrona de comunicação com a API quando o campo de contato no HTML for preenchido e for clicado fora desse campo:
var cel = document.getElementById('telefone');
cel.addEventListener("focusout", () => validaTelefone(cel.value));

// Definindo função para validar o email do usuário, checando o seu domínio:
async function validaEmail(email) {
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
      console.log(consultaMailJson);

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
// Vamos chamar a função assíncrona de comunicação com a API quando o campo de contato no HTML for preenchido e for clicado fora desse campo:
var email = document.getElementById('email');
email.addEventListener("focusout", () => validaEmail(email.value));


// Definindo função para validar o cpf do usuário, por meio de consulta na API da receita federal:
function validaCPF(CPF) {
   // Puxando elementos HTML:
   var mensagemErro = document.getElementById('erroCPF');
   mensagemErro.innerHTML = "";
   console.log(checkCpf(CPF))
};
// Vamos chamar a função assíncrona de comunicação com a API quando o campo de contato no HTML for preenchido e for clicado fora desse campo:
var cpf = document.getElementById('cpf');
cpf.addEventListener("focusout", () => validaCPF(cpf.value));


// Definindo uma função assincrona para fazer a comunicação com a API:
async function buscaEndereco(cep) {
   // Puxando elementos HTML:
   var mensagemErro = document.getElementById('erro');
   mensagemErro.innerHTML = "";
   var cidade = document.getElementById('cidade');
   var logradouro = document.getElementById('endereco');
   var estado = document.getElementById('estado');
   var bairro = document.getElementById('bairro');
   // Comunicação com a API, conversando da resposta para Json e preenchimento dinâmico dos elementos HTML:
   try {
      var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      var consultaCEPJson = await consultaCEP.json();

      if (consultaCEPJson.erro) {
         throw Error('CEP não existente!');
      };

      cidade.value = consultaCEPJson.localidade;
      logradouro.value = consultaCEPJson.logradouro;
      estado.value = consultaCEPJson.uf;
      bairro.value = consultaCEPJson.bairro;
      return consultaCEPJson;

   // Caso a Promisse seja rejeitada, podemos ter um Erro por digitação ou então um CEP não encontrado:
   } catch (erro) {
      if (erro.name == 'TypeError') {
         mensagemErro.innerHTML = "<p>CEP inválido. Dígite seu CEP com 8 dígitos e sem símbolos ou pontos!</p>"
      } else {
         mensagemErro.innerHTML = "<p>CEP não encontrado. Tente novamente!</p>"
      }
      // Limpando dados do HTML:
      cidade.value = "";
      logradouro.value = "";
      estado.value = "";    
      bairro.value = "";
      console.log(erro);
   };
};

// Vamos chamar a função assíncrona de comunicação com a API 
var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value));

