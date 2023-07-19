import { render, screen } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import ListaParticipantes from "./ListaParticipantes";
import { useListaParticipantes } from "../../state/hooks/useListaParticipantes";

jest.mock('../../state/hooks/useListaParticipantes', () => {
   return {
      useListaParticipantes: jest.fn()
   }
})

describe('Lista vazia de participantes', () => {
   beforeEach(() => {
      (useListaParticipantes as jest.Mock).mockReturnValue([])
   })
   test('Deve ser renderizada sem elementos', () => {
      render(<RecoilRoot>
         <ListaParticipantes />
      </RecoilRoot>)
   
      const itens = screen.queryAllByRole('listitem');
      expect(itens).toHaveLength(0);
   })
})

describe('Lista preenchida de participantes', () => {
   const participantes = ['Matheus', 'Renan', 'Yuri'];
   beforeEach(() => {
      (useListaParticipantes as jest.Mock).mockReturnValue(participantes)
   })
   test('Deve ser renderizada com os participantes da lista', () => {
      render(<RecoilRoot>
         <ListaParticipantes />
      </RecoilRoot>)
   
      const itens = screen.queryAllByRole('listitem');
      expect(itens).toHaveLength(participantes.length);
   })
})