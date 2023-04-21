// Função genérica que recebe todos os inputs e checa seus tipos de dados:
export function valida(input) {
	const tipoDeInput = input.dataset.tipo;

	// Checando se o tipo de input recebido está dentro de validadores e, caso esteja, chamar a função de validação correspondente:
	if(validadores[tipoDeInput]) {
		validadores[tipoDeInput](input);
	};

	if(input.validity.valid) {
		input.parentElement.classList.remove("input-container--invalido");
		input.parentElement.querySelector('.input-mensagem-erro').innerHTML = '';
	} else {
		input.parentElement.classList.add("input-container--invalido");
		input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput, input);
	};

};

//Criando um vetor com strings identificando os tipos de erros que temos:
const tiposDeErro = [
	'customError',
	'valueMissing', 
	'typeMismatch', 
	'patternMismatch'
];

// Criando uma lista com os tipos de erros e mansagens para cada tipo de input do formulário:
const mensagensDeErro = {
	nome: {
		valueMissing: 'O campo nome não pode estar vazio.'
	},
	email: {
		valueMissing: 'O campo de email não pode estar vazio.',
		typeMismatch: 'O email digitado não é válido'
	},
	senha: {
		valueMissing: 'O campo de senha não pode estar vazio',
		patternMismatch: 'A senha deve conter ao menos 1 letra minuscula, 1 letra maiuscula e 1 numero. Deve ter entre 6 e 12 caracteres e não deve conter símbolos.'
	},
	dataNascimento: {
		valueMissing: 'O campo de data de nascimento não pode estar vazio',
		customError: 'Ahhh, não deu certo! É necessário ser maior que 18 anos para se cadastrar :('
	}	
};

// Objeto com os tipos de validadores do formulário:
const validadores = {
	dataNascimento:input => validaDataNascimento(input)
};

// Função que irá percorrer o vetor tipos de Erro e verifica se esse tipo de erro está no validity do input, retornando true ou false. Sendo true, a variável mensagem passa a ser o valor de erro dentro da propriedade do tipo de input do erro, no objeto mensagens de erro:
function mostraMensagemDeErro(tipoDeInput, input) {
	let mensagem = '';
	tiposDeErro.forEach(erro => {
		if(input.validity[erro]) {
			mensagem = mensagensDeErro[tipoDeInput][erro];
		}
	})
	
	return mensagem;
};

/* 'Pegando' a data de nascimento informada no formulário pelo id do input:
//const dataNacimento = document.querySelector('[#nascimento]'); */

/* Vamos adicionar um evento de blur (quando sair do foco) com a função de validação passando a data(evento.target):
dataNacimento.addEventListener('blur', (evento) => {
	validaDataNascimento(evento.target);
}) */

// A função de validação recebe a data informada no input do formulário, convertendo-a para um calendário tipo Date:
function validaDataNascimento(input) {
	const dataRecebida = new Date(input.value);
	let mensagem = "";
	
	// Checa se é maior de 18 anos:
	if (!maiorQue18(dataRecebida)) {
		mensagem = "Ahhh, não deu certo! É necessário ser maior que 18 anos para se cadastrar :(";
 	};

 	// Para o navegador saber que estamos trabalhando com validação do input, setamos o setCustomValidity que irá enviar uma mensagem vazia caso dê tudo certo, ou uma mensagem de erro caso o dado informado não passe na validação:
 	input.setCustomValidity(mensagem);
};

// Declarando função que receba uma data genérica para checar se o individuo é maior de idade:
function maiorQue18(data) {
	const dataAtual = new Date(); // Date sem parâmetros retorna a data atual.
	const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate()); // cada 'data.getUTC' retorna o ano, mês e dia da data passada à função, os quais devem ser tratados nessa ordem: aaaa mm dd.
	return dataMais18 <= dataAtual;
};