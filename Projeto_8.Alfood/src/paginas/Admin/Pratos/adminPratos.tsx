import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import IPrato from "../../../interfaces/IPrato";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import http from "../../../http";

const AdminPratos = () => {

   const [pratos, setPratos] = useState<IPrato[]>([]);

   useEffect(() => {
      http.get<IPrato[]>('pratos/')
         .then(resposta => setPratos(resposta.data));
   }, [])

   const excluir = (pratoExcluir: IPrato) => {
      http.delete(`pratos/${pratoExcluir.id}/`)
         .then(() => {
            const listaPrato = pratos.filter(prato => prato.id !== pratoExcluir.id)
            setPratos([...listaPrato])
         })
   }

   return (
      <TableContainer component={Paper}>
         <Table>
            <TableHead>
               <TableRow>
                  <TableCell>
                     Nome
                  </TableCell>
                  <TableCell>
                     Descrição
                  </TableCell>
                  <TableCell>
                     Tag
                  </TableCell>
                  <TableCell>
                     Imagem
                  </TableCell>
                  <TableCell>
                     Editar
                  </TableCell>
                  <TableCell>
                     Excluir
                  </TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {pratos.map(prato => <TableRow key={prato.id}>
                  <TableCell>
                     {prato.nome}
                  </TableCell>
                  <TableCell>
                     {prato.descricao}
                  </TableCell>
                  <TableCell>
                     {prato.tag}
                  </TableCell>
                  <TableCell>
                     <a href={prato.imagem} target="_blank" rel="noreferrer">Ver Imagem</a>
                  </TableCell>
                  <TableCell>
                     [<Link to={`/admin/pratos/${prato.id}`}>editar</Link>]
                  </TableCell>
                  <TableCell>
                     <Button variant="outlined" color="error" onClick={() => excluir(prato)}>
                        Excluir
                     </Button>
                  </TableCell>
               </TableRow>)}
            </TableBody>
         </Table>
      </TableContainer>
   )
}

export default AdminPratos;