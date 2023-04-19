// Função genérica que recebe todos os inputs e checa seus tipos de dados:
export function validacao(input) {
	const tipoDeInput = input.dataSet.tipo;

	// Checando se o tipo de input recebido está dentro de validadores e, caso esteja, chamar a função de validação correspondente:
	if (validadores[tipoDeInput]) {
		validadores[tipoDeInput](input);
	}

};

// Objeto com os tipos de validadores do formulário:
const validadores = {
	dataNacimento:input => validaDataNascimento(input)
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
		mensagem = "Ahhh, não deu certo! É necessário ser maior que 18 anos para se cadastrar :("
 	}

 	// Para o navegador saber que estamos trabalhando com validação do input, setamos o setCustomValidity que irá enviar uma mensagem vazia caso dê tudo certo, ou uma mensagem de erro caso o dado informado não passe na validação:
 	input.setCustomValidity(mensagem)
};

// Declarando função que receba uma data genérica para checar se o individuo é maior de idade:
function maiorQue18(data) {
	const dataAtual = new Date(); // Date sem parâmetros retorna a data atual.
	const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate()); // cada 'data.getUTC' retorna o ano, mês e dia da data passada à função, os quais devem ser tratados nessa ordem: aaaa mm dd.
	return dataMais18 <= dataAtual

}