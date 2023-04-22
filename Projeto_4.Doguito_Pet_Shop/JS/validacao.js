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
	},
	cpf: {
		valueMissing: 'O campo de CPF não pode estar vazio.',
		customError: 'O CPF digitado não é válido'
	},	
	cep: {
		valueMissing: 'O campo de CEP não pode estar vazio.',
		patternMismatch: 'O CEP digitado não é válido',
		customError: 'Não foi possível buscar seu CEP :('
	},
	logradouro: {
		valueMissing: 'O campo de logradouro não pode estar vazio.'
	},
	cidade: {
		valueMissing: 'O campo de cidade não pode estar vazio.'
	},
	estado: {
		valueMissing: 'O campo de estado não pode estar vazio.'
	},
	preco: {
		valueMissing: 'O campo de preço não pode estar vazio'
	}				
};

// Objeto com os tipos de validadores do formulário:
const validadores = {
	dataNascimento:input => validaDataNascimento(input),
	cpf:input => validaCPF(input),
	cep:input => recuperarCEP(input)
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

// Para validação do CPF, vamos primeiro formatar o input para termos apenas números, independentemente do formato de digitação usado pelo usuário. A partir disso podemos checar se uma das duas funções de verificações implementadas retornam false:

function validaCPF(input) {
	const cpfFormatado = input.value.replace(/\D/g, '');
	let mensagem = "";
	if(!checaCPFRepetido(cpfFormatado) || !checaEstruturaCPF(cpfFormatado) || !checaTamanhoCPF(cpfFormatado)) {
		mensagem = 'O CPF digitado não é válido';
	};
	input.setCustomValidity(mensagem);
}

// Primeira checagem para o CPF é verificar se este possui apenas números repetidos:
function checaCPFRepetido(cpf) {
	const valoresRepetidos = [
		'00000000000',
		'11111111111', 
		'22222222222',
		'33333333333',
		'44444444444',
		'55555555555',
		'66666666666',
		'77777777777',
		'88888888888',
		'99999999999'
	];
	let cpfValido = true;
	valoresRepetidos.forEach(valor => {
		if (valor == cpf) {
			cpfValido = false;
		}
	});
	return cpfValido;
}

// Segunda checagem é verificar a estrutura, ou seja, se os dígitos verificadores estão corretos:
function checaEstruturaCPF(cpf) {
	const multiplicador = 10;
	return checaDigitoVerificador(cpf, multiplicador);
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

// Terceira checagem para o CPF é verificar se foi inserido mais ou menos do que 11 dígitos:
function checaTamanhoCPF(cpf) {
	return cpf.length == 11;
};

// Primeiro vamos garantir que CEP seja somente de números (removendo o hífen, caso necessário) e dps chamamos a função fetch que connecta com a API passando a url da viacep (com o cep informado) e um objeto 'options', com as configurações da requisição (method GET - pois queremos obter dados da API, mode cors - pois é uma requisição entre APIs, headers - objeto que queremos de resposta, definindo seu tipo, nesse caso, um app json em chartset utf8). Só chamamos 'fetch' se o cep estiver correto, ou seja, sem a propriedade validity do intput (cep) ter nenhum dos erros declarados (patternMismatch ou valueMissing):
function recuperarCEP(input) {
	const cep = input.value.replace(/\D/g, '');
	const url = `https://viacep.com.br/ws/${cep}/json/`;
	const options = {
		method: 'GET',
		mode: 'cors',
		headers: {
			'content-type': 'application/json;charset=utf-8'
		}
	}

	// Se o formato de CEP estiver correto, chamamos 'fetch' para se connectar com a API, depois convertemos a resposta em um arquivo json e depois obtemos os dados desse objeto (informações retornadas da API). Caso de algum erro, o retorno será um objeto 'erro' true.
	if(!input.validity.patternMismatch && !input.validity.valueMissing){
		fetch(url, options).then(
			response => response.json()
		).then(
			data => {
				if(data.erro) {
					input.setCustomValidity('Não foi possível buscar seu CEP :(');
					return;
				}
				input.setCustomValidity('');
				preencheCamposComCEP(data);
				return;
				}
		)
	}

}

function preencheCamposComCEP(data) {
	const logradouro = document.querySelector('[data-tipo="logradouro"]');
	const cidade = document.querySelector('[data-tipo="cidade"]');
	const estado = document.querySelector('[data-tipo="estado"]');

	logradouro.value = data.logradouro;
	cidade.value = data.localidade;
	estado.value = data.uf;
}