import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from 'recoil';
import Rodape from "./Rodape";
import { useListaParticipantes } from "../../state/hooks/useListaParticipantes";

jest.mock('../../state/hooks/useListaParticipantes', () => {
   return {
      useListaParticipantes: jest.fn()
   }
})

const mockNavegacao = jest.fn();
const mockSorteio = jest.fn();

jest.mock('react-router-dom', () => {
   return {
      useNavigate: () => mockNavegacao
   }
});

jest.mock('../../state/hooks/useSorteador', () => {
   return {
      useSorteador: () => mockSorteio
   }
});

describe('Quando não existem participantes suficientes', () => {
   beforeEach(() => {
      (useListaParticipantes as jest.Mock).mockReturnValue([])
   })
   test('Não é possível iniciar o sorteio', () => {
      render(<RecoilRoot>
         <Rodape />
      </RecoilRoot>);
      const botao = screen.getByRole('button');
      expect(botao).toBeDisabled();
   })
})

describe('Quando existem participantes suficientes', () => {
   beforeEach(() => {
      (useListaParticipantes as jest.Mock).mockReturnValue(['Matheus', 'Renan', 'Yuri'])
   })
   test('É possível iniciar o sorteio', () => {
      render(<RecoilRoot>
         <Rodape />
      </RecoilRoot>);
      const botao = screen.getByRole('button');
      expect(botao).not.toBeDisabled();
   })
   test('Sorteio iniciado', () => {
      render(<RecoilRoot>
         <Rodape />
      </RecoilRoot>);
      const botao = screen.getByRole('button');
      fireEvent.click(botao);
      expect(mockNavegacao).toHaveBeenCalledTimes(1);
      expect(mockNavegacao).toHaveBeenCalledWith('/sorteio');
      expect(mockSorteio).toHaveBeenCalledTimes(1);
   })
})