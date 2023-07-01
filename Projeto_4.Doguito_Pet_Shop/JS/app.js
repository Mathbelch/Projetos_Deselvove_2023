import { valida } from './validacao.js';

// Criando lista com todos os inputs do DOM, pela atributo de tag input:
const inputs = document.querySelectorAll('input');

// Para cada input da lista chamamos a função de validação, no momento de envio (blur), passando o evento.target:
inputs.forEach(input => {
   if(input.dataset.tipo === 'preco') {
      // npm i simple-mask-money --save
      SimpleMaskMoney.setMask(input, {
         prefix: 'R$ ',
         fixed: true,
         fractionDigits: 2,
         decimalSeparator: ',',
         thousandsSeparator: '.',
         cursor: 'end'
      })
   }

   input.addEventListener('blur', (evento) => {
      valida(evento.target)
   });
});