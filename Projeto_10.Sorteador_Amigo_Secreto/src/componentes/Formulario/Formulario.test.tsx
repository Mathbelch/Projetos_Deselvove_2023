import { render, screen } from '@testing-library/react';
import Formulario from './Formulario';

// Jest

test('quando o input estiver vazio, novos participantes não podem ser adicionados', () => {
   render(<Formulario />)
   // Buscar o input no DOM:
   const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
   // Buscar o botão:
   const botao = screen.getByRole('button');
   // Garantir que o input esteja no documento:
   expect(input).toBeInTheDocument();
   // Garantir que o botão esteja desabilitado:
   expect(botao).toBeDisabled();
})