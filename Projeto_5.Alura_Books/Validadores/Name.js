// Definindo função para validar o nome de usuário:
export default function validaName(name) {
   var mensagemErro = document.getElementById('erroNome');
   mensagemErro.innerHTML = "";
   var regex = new RegExp('[a-zA-ZçÁáÊêÉéÓóÍí]{1}[a-zA-ZçÁáÊêÉéÓóÍí]+\\s[a-zA-Z\\sçÁáÊêÉéÓóÍí]+');
   if (!regex.test(name)) {
      mensagemErro.innerHTML = "<p>É necessário informar seu nome e sobrenome para efeturar o cadastro</p>"
   };
}