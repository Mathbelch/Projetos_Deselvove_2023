// Definindo função para validar o cpf do usuário, por meio de consulta na API da receita federal:
export default function validaCPF(CPF) {
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