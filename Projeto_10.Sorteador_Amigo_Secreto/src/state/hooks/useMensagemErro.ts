import { erroState } from "../atom";
import { useRecoilValue } from 'recoil';

export const useMensagemErro = () => {
   const mensagem = useRecoilValue(erroState);
   return mensagem;
}