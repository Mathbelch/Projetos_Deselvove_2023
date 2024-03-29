import { Box, Button, TextField, Typography} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import http from "../../../http";


const FormRestaurante = () => {

   const parametros = useParams();
   useEffect(() => {
      if (parametros.id) {
         http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
            .then(resposta => setNomeRestaurante(resposta.data.nome))
      }
   }, [parametros]);

   const [nomeRestaurante, setNomeRestaurante] = useState('');


   const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (parametros.id) {
         http.put(`restaurantes/${parametros.id}/`, {
            nome: nomeRestaurante
         })
            .then(() => {
               setNomeRestaurante('');
               alert('Restaurante atualizado com sucesso')
            })
      } else {
         http.post('restaurantes/', {
            nome: nomeRestaurante
         })
            .then(() => {
               setNomeRestaurante('');
               alert('Restaurante cadastrado com sucesso')
            })
      }
   }

   return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
         <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
         <Box component='form' sx={{ width: '100%' }} onSubmit={onSubmitForm}>
            <TextField
               value={nomeRestaurante}
               onChange={event => setNomeRestaurante(event.target.value)}
               label="Nome do Restaurante"
               variant="standard"
               fullWidth
               required
            />
            <Button sx={{ marginTop: 1 }} type="submit" variant="outlined" fullWidth>Salvar</Button>
         </Box>
      </Box>

   )
}

export default FormRestaurante;