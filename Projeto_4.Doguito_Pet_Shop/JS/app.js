import { validacao } from './validacao.js';

// Criando lista com todos os inputs do DOM, pela atributo de tag input:
const inputs = document.querySelectorAll('input');

// Para cada input da lista chamamos a função de validação, no momento de envio (blur), passando o evento.target:
inputs.forEach(input => {
   input.addEventListener('blur', (evento) => {
      validacao(evento.target)
   })
})