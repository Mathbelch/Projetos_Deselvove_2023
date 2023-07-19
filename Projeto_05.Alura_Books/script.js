import validaName from './Validadores/Name.js';
import validaDataNascimento from './Validadores/DataNascimento.js';
import validaTelefone from './Validadores/Telefone.js';
import validaCPF from './Validadores/CPF.js';
import buscaEndereco from './Validadores/CEP.js';
import validaEmail from './Validadores/Email.js';

// Vamos chamar a função de validação de cada campo do input quando este for clicado/preenchido e em seguida for clicado fora desse campo:  

var nome = document.getElementById('nome');
nome.addEventListener("focusout", () => validaName(nome.value));

var data = document.getElementById('nascimento');
data.addEventListener("focusout", () => validaDataNascimento(data.value));

var cel = document.getElementById('telefone');
cel.addEventListener("focusout", () => validaTelefone(cel.value));

var email = document.getElementById('email');
email.addEventListener("focusout", () => validaEmail(email.value));

var cpf = document.getElementById('cpf');
cpf.addEventListener("focusout", () => validaCPF(cpf.value));

var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value));

