import { realizarSorteio } from "./RealizarSorteio";

describe('Dado um sorteio de amigo secreto', () => {
   test('Cada participante não pode sorteiar o próprio nome', () => {
      const participantes = [
         'Matheus',
         'Renan',
         'Yuri',
         'Pedro',
         'Luiza',
         'Priscila'
      ];
      const sorteio = realizarSorteio(participantes);
      participantes.forEach(participante => {
         const amigoSecreto = sorteio.get(participante);
         expect(amigoSecreto).not.toEqual(participante);
      })
   })
})