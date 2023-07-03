import getApiKey from './keys.js';

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

   if (telefone === "") {
      mensagemErro.innerHTML = "É necessário informar seu número de contato";
   } else if (!(telefone.length >= 10 && telefone.length <= 11)) {
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
   const cpfFormatado = CPF.replace(/\D/g, '');
   var regex = new RegExp('[0]{11}|[1]{11}|[2]{11}|[3]{11}|[4]{11}|[5]{11}|[6]{11}|[7]{11}|[8]{11}|[9]{11}');
   const multiplicador = 10;
   if (cpfFormatado === "") {
      mensagemErro.innerHTML = "CPF deve ser preenchido";
   } else if (cpfFormatado.length !== 11) {
      mensagemErro.innerHTML = "Ops, parece que o CPF informado não possui 11 dígitos numéricos. Verifique e tente novamente.";
   } else if (regex.test(cpfFormatado)) {
      mensagemErro.innerHTML = "<p>O CPF não deve ter seus dígitos iguais. Revise e tente novamente</p>";
   } else if (!checaDigitoVerificador(cpfFormatado, multiplicador)) {
      mensagemErro.innerHTML = "<p>CPF inválido. Tente novamente.</p>"
   };
};

// Calculo matemático: para o 1° digito verificador, somar os 9 primeiros dígitos multiplicados de 10 até 2 (10 * 1°) + (9 * 2°) + (8 * 3°) + ... + (2 * 9°) e aplicar a fórmula em confirma dígito. Para o 2° digito multipicador, somar os 10 primeiros dígitos multiplicados de 11 até 2 (11 * 1°) + (10 * 2°) + (9 * 3°) + ... + (3 * 10°), e aplicar na fórmula confirma dígito:
function checaDigitoVerificador(cpf, multiplicador) {
	if(multiplicador >= 12) {
		return true;
	};
	let multiplicadorInicial = multiplicador;
	let soma = 0;
	const cpfSemDigitos = cpf.substr (0, multiplicador - 1).split('');
	const digitoVerificador = cpf.charAt(multiplicador - 1);

	for(let contador = 0; multiplicadorInicial > 1; multiplicadorInicial--) {
		soma = soma + cpfSemDigitos[contador] * multiplicadorInicial;
		contador++;
	}

	// Se o 1° dígito estiver correto, chamamos recursivamente a função para o 2° dígito verificador:
	if(digitoVerificador == confirmaDigito(soma)) {
		return checaDigitoVerificador(cpf, multiplicador + 1);
	};

	return false;

};

function confirmaDigito(soma) {
	return (11 - (soma % 11));
};

// Vamos chamar a função assíncrona de comunicação com a API quando o campo de cpf no HTML for preenchido e for clicado fora desse campo:
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

   if(cep === "") {
      mensagemErro.innerHTML = "<p>Informe seu CEP para continuar.</p>"
      return;
   }

   cep = cep.replace(/\D/g, '');

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
         mensagemErro.innerHTML = "<p>CEP inválido. Dígite seu CEP com 8 dígitos!</p>"
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

