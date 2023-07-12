# Projeto Alfood

## Objetivo: 
<p>Refatorar o site estático da empresa fictícia Alfood para um formato dinâmico, onde a renderização da página web seja feita com base em requisições a uma API. A aplicação em TypeScript básicamente funciona listando diferentes restaurantes e pratos.</p>
<p>Na versão estática, tem-se a renderização da página sendo feita por meio do acesso aos dados em um arquivo json. Dessa forma, sempre que for ser necessário alteração, ela deve ser feita no código, ou seja, deve-se ter uma pessoa desenvolvedora para isso. A melhor forma de resolver este problema seria então integrar essa aplicação à uma API e o usuário, por meio de uma interface administativa, poder cadastrar, editar e excluir restaurantes e pratos.</p>
 

## Requisitos do Projeto:
<ul>
   <li>A estilização da interface administrativa foi implementada por meio da biblioteca <a href="https://mui.com/" target="_blank">mui</a><sup>*</sup>, por meio do uso de seus componentes como Input, TextField, Button, Paper, Table(TableContainer, TableHead, TableRow, TableCell, TableBody), typography, Container, Box, AppBar, etc.;</li>
   <small>*npm install @mui/material @emotion/react @emotion/styled</small>
   <li>As requisições para a API foram feitas por meio da biblioteca <a href="https://github.com/axios/axios" target="_blank">axios</a><sup></sup>, a qual funciona de forma assíncrona;</li>
   <li>O controle da navegação entre rotas foi implementado por meio da biblioteca <a href="https://reactrouter.com/en/main" target="_blank">react-router-dom</a><sup>*</sup>, por meio de recursos como Link, Outlet, Routes e Route;</li>
   <li>Para a renderização dinâmica das páginas foi usado a bilbioteca <a href="https://react.dev/" target="_blank">React</a>, especialmente os recursos useState e useEffect;</li>
   <li>Para acessar a área administrativa é necessário inserir manualmente a rota usando /admin;</li>
</ul>


## Estrutura do projeto:
<ul>
   <li><i>restaurantes_api-master</i>: Contém a <a href="https://github.com/alura-cursos/restaurantes_api" target="_blank">API</a> que será integrada<sup>*</sup> à página web, tendo sido desenvolvida com a linguagem Python e implementada seguindo o padrão REST, que define a forma como os dados são estruturados e acessados;</li>
   <small>*No prompt no diretório da API o comando <code>docker-compose build</code> cria e configura a API, o comando <code>docker-compose up</code> efetivamente roda a API, indicando a porta (por padrão 8000) a ser acessada para visualizar a documentação (tudo relacionado a renderização está em V1 e tudo relativo a administração está em V2).</small>
   <li><i>src/componentes</i>: Contém os componentes das páginas abertas, implementados em tsx e estilizados com SCSS, sendo que o componente foi refatorado para a renderização dinâmica, tanto dos restaurantes quanto dos pratos. Além disso incluiu-se a opção do usuário ordenar os restaurantes e pesquisar por nome;</li>
   <li><i>src/http</i>: instância base do axios conténdo a url base para acesso a API. Assim, ao fazer as requisições usamos a constante 'http' e incluimos no path apenas a sequência após a url base, ao invés de termos que passar toda a url em todas as requisições;</li>
   <li><i>src/interfaces</i>: Contém as interfaces usadas nas páginas administrativas;</li>
   <li><i>src/paginas</i>: Contém as páginas abertas (Home e VitrineRestaurantes) e as páginas da área administrativa (Base, Pratos e Restaurantes, além dos formulários para inclusão ou edição de pratos e de restaurantes);</li>
   <li><i>src/App.tsx</i>: define as rotas da aplicação: home e restaurantes;</li>
</ul>

## Versão Final da página:

https://github.com/Mathbelch/Projetos_Deselvove_2023/assets/109366042/e62543a7-5043-4474-a4d0-0530665719e0







