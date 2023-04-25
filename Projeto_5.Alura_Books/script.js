async function buscaEndereco(cep) {
   var mensagemErro = document.getElementById('erro');
   mensagemErro.innerHTML = "";
   var cidade = document.getElementById('cidade');
   var logradouro = document.getElementById('endereco');
   var estado = document.getElementById('estado');
   var bairro = document.getElementById('bairro');
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
   } catch (erro) {
      if (erro.name == 'TypeError') {
         mensagemErro.innerHTML = "<p>CEP inválido. Dígite seu CEP com 8 dígitos e sem símbolos ou pontos!</p>"
      } else {
         mensagemErro.innerHTML = "<p>CEP não encontrado. Tente novamente!</p>"
      }
      cidade.value = "";
      logradouro.value = "";
      estado.value = "";    
      bairro.value = "";
      console.log(erro);
   };
};

var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value));

