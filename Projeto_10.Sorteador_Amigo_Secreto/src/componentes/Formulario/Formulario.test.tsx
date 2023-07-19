import { act, fireEvent, render, screen } from '@testing-library/react';
import Formulario from './Formulario';
import { RecoilRoot } from 'recoil';

describe('Comportamento do Formulario.tsx', () => {
   test('Quando o input estiver vazio, novos participantes não podem ser adicionados', () => {
      render(<RecoilRoot>
         <Formulario />
      </RecoilRoot>)
      // Buscar o input no DOM:
      const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
      // Buscar o botão:
      const botao = screen.getByRole('button');
      // Garantir que o input esteja no documento:
      expect(input).toBeInTheDocument();
      // Garantir que o botão esteja desabilitado:
      expect(botao).toBeDisabled();
   });

   test('Adicionar participante caso exista um nome preenchido', () => {
      render(<RecoilRoot>
         <Formulario />
      </RecoilRoot>)
      // Buscar o input no DOM:
      const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
      // Buscar o botão:
      const botao = screen.getByRole('button');
      // Inserir valor no input:
      fireEvent.change(input, {
         target: {
            value: 'Nome do Participante'
         }
      });
      // Clique no botão de submit:
      fireEvent.click(botao);
      // Garantir que o input esteja com foco ativo:
      expect(input).toHaveFocus();
      // Garantir que o input esteja limpo após submissão:
      expect(input).toHaveValue('');
   });

   test('Nomes duplicados não podem ser adicionados na lista', () => {
      render(<RecoilRoot>
         <Formulario />
      </RecoilRoot>)
      // Buscar o input no DOM:
      const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
      // Buscar o botão:
      const botao = screen.getByRole('button');
      // Inserir valor no input:
      fireEvent.change(input, {
         target: {
            value: 'Nome do Participante'
         }
      });
      // Clique no botão de submit:
      fireEvent.click(botao);
      // Inserir valor repetido no input:
      fireEvent.change(input, {
         target: {
            value: 'Nome do Participante'
         }
      });
      // Clique no botão de submit:
      fireEvent.click(botao);
      // Mensagem de erro:
      const mensagemErro = screen.getByRole('alert');
      expect(mensagemErro.textContent).toBe('Nomes duplicados não são permitidos!')
   });

   test('Mensagem de erro deve sumir após os timers', () => {
      jest.useFakeTimers();
      render(<RecoilRoot>
         <Formulario />
      </RecoilRoot>)
      // Buscar o input no DOM:
      const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
      // Buscar o botão:
      const botao = screen.getByRole('button');
      // Inserir valor no input:
      fireEvent.change(input, {
         target: {
            value: 'Nome do Participante'
         }
      });
      // Clique no botão de submit:
      fireEvent.click(botao);
      // Inserir valor repetido no input:
      fireEvent.change(input, {
         target: {
            value: 'Nome do Participante'
         }
      });
      // Clique no botão de submit:
      fireEvent.click(botao);
      // Mensagem de erro:
      let mensagemErro = screen.queryByRole('alert');
      expect(mensagemErro).toBeInTheDocument();
      // Esperar N segundos:
      act(() => {
         jest.runAllTimers();
      });
      mensagemErro = screen.queryByRole('alert');
      expect(mensagemErro).toBeNull();
   });
})