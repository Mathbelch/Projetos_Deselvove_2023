// Definindo função para validar a idade do usuário:
export default function validaDataNascimento(data) {
   var mensagemErro = document.getElementById('erroData');
   mensagemErro.innerHTML = "";
   const dataNascimento = new Date(data);
   const dataMais18 = new Date(dataNascimento.getUTCFullYear() + 18, dataNascimento.getUTCMonth(), dataNascimento.getUTCDate());
   const dataAtual = new Date();
   if (dataMais18 >= dataAtual) {
      mensagemErro.innerHTML = 'Ahhh, não deu certo! É necessário ser maior que 18 anos para se cadastrar :(';
   }
}