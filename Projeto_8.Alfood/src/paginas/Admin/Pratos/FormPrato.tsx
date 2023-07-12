import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import http from "../../../http";
import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";
import { useParams } from "react-router-dom";
import IPrato from "../../../interfaces/IPrato";

const FormPrato = () => {

   const [nomePrato, setNomePrato] = useState('');
   const [descricaoPrato, setDescricaoPrato] = useState('');

   const [tag, setTag] = useState('');
   const [restaurante, setRestaurante] = useState('');

   const [imagem, setImagem] = useState<File | null>(null);

   const [tags, setTags] = useState<ITag[]>([]);
   const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

   useEffect(() => {
      http.get<{ tags: ITag[] }>('tags/')
         .then(resposta => setTags(resposta.data.tags));
         http.get<IRestaurante[]>('restaurantes/')
         .then(resposta => setRestaurantes(resposta.data))
   }, [])

   const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
      if (evento.target.files?.length) {
         setImagem(evento.target.files[0])
      } else {
         setImagem(null)
      }
   }

   const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append('nome', nomePrato);
      formData.append('descricao', descricaoPrato);
      formData.append('tag', tag);
      formData.append('restaurante', restaurante);
      if (imagem) {
         formData.append('imagem', imagem)
      }
      http.request({
         url: 'pratos/',
         method: 'POST',
         headers: {
            'Content-Type': 'multipart/form-data'
         },
         data: formData
      })
         .then(() => {
            setNomePrato('');
            setDescricaoPrato('');
            setTag('');
            setRestaurante('');
            setImagem(null);
            alert('Prato cadastrado com sucesso!');
         })
         .catch(erro => console.log(erro))
   }

   return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
         <Typography component="h1" variant="h6">Formulário de Pratos</Typography>
         <Box component='form' sx={{ width: '100%' }} onSubmit={onSubmitForm}>
            <TextField
               value={nomePrato}
               onChange={event => setNomePrato(event.target.value)}
               label="Nome do Prato"
               variant="standard"
               fullWidth
               required
               margin="dense"
            />
            <TextField
               value={descricaoPrato}
               onChange={event => setDescricaoPrato(event.target.value)}
               label="Descrição do Prato"
               variant="standard"
               fullWidth
               required
               margin="dense"
            />
            <FormControl margin='dense' fullWidth>
               <InputLabel id='select-tag'>Tag</InputLabel>
               <Select labelId="select-tag" value={tag} onChange={evento => setTag(evento.target.value)}>
                  {tags.map(tag => <MenuItem value={tag.value} key={tag.id}>
                     {tag.value}
                  </MenuItem>)}
               </Select>
            </FormControl>
            <FormControl margin='dense' fullWidth>
               <InputLabel id='select-restaurante'>Restaurante</InputLabel>
               <Select labelId="select-restaurante" value={restaurante} onChange={evento => setRestaurante(evento.target.value)}>
                  {restaurantes.map(restaurante => <MenuItem value={restaurante.id} key={restaurante.id}>
                     {restaurante.nome}
                  </MenuItem>)}
               </Select>
            </FormControl>
            <input type="file" onChange={selecionarArquivo}/>

            <Button sx={{ marginTop: 1 }} type="submit" variant="outlined" fullWidth>Salvar</Button>
         </Box>
      </Box>

   )
}

export default FormPrato;