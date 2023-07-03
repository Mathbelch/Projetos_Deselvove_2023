// Definindo função para validar o telefone do usuário, checando o seu DDD e identificando o seu estado:
export default async function validaTelefone(telefone) {
   // Puxando elementos HTML:
   var mensagemErro = document.getElementById('erroCel');
   var regiaoDDD = document.getElementById('DDD');
   mensagemErro.innerHTML = "";
   // Deixando apenas números:
   telefone = telefone.replace(/\D/g, '');

   if (telefone === "") {
      mensagemErro.innerHTML = "É necessário informar seu número de contato";
      return;
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