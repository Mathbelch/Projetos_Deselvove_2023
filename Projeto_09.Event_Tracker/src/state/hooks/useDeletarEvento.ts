import { IEvento } from "../../interfaces/IEvento";
import { listaDeEventosState } from "../atom";
import { useSetRecoilState } from 'recoil';

const useDeletarEvento = () => {
   const setListaDeEventos = useSetRecoilState<IEvento[]>(listaDeEventosState);
   return (evento: IEvento) => {
      return setListaDeEventos((listaAntiga) => [ ...listaAntiga.filter(evt => evento.id !== evt.id)])
   }
}

export default useDeletarEvento;