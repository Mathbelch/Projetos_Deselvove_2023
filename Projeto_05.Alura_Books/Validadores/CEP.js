// Definindo uma função assincrona para fazer a comunicação com a API:
export default async function buscaEndereco(cep) {
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