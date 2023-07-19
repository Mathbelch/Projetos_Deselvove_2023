import { listaParticipantesState } from "../atom";
import { useRecoilValue } from 'recoil';

export const useListaParticipantes = () => {
   return useRecoilValue(listaParticipantesState);
}