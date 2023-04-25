async function buscaEndereco(cep) {
   try {
      var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      var consultaCEPJson = await consultaCEP.json();
      if (consultaCEPJson.erro) {
         throw Error('CEP não existente!')
      };
      console.log(consultaCEPJson);
      return consultaCEPJson;
   } catch (erro) {
      console.log(erro);
   };
};