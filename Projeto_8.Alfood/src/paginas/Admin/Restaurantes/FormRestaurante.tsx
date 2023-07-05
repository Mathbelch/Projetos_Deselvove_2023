import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";


const FormRestaurante = () => {

   const [nomeRestaurante, setNomeRestaurante] = useState('');
   

   const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      axios.post('http://localhost:8000/api/v2/restaurantes/', {
         nome: nomeRestaurante
      })
         .then(() => {
            alert('Restaurante cadastrado com sucesso')
         })
   }

   return(
      <form onSubmit={ onSubmitForm }>
         <TextField value={nomeRestaurante}
          onChange={event => setNomeRestaurante(event.target.value)}
          label="Nome do Restaurante" 
          variant="standard" />
         <Button type="submit" variant="outlined">Salvar</Button>
      </form>
   )
}

export default FormRestaurante;