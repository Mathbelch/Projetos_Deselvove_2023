import { listaDeEventosState } from "../atom";
import { useRecoilValue } from 'recoil';


const useListaDeEventos = () => {
   return useRecoilValue(listaDeEventosState);
}

export default useListaDeEventos;