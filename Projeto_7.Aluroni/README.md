# Projeto Aluroni:

## Objetivo: 
Implementação da página do restaurante fícticio 'Aluroni' por meio da biblioteca Creat React App (CRA), ultilizando TypeScript e Sass (CSS modules), ESLint e React Router DOM para estruturar o projeto em arquitetura SPA, renderizando os componentes sempre na mesma página HTML. 

## Requisitos do Projeto:
<ul>
   <li>Deve conter 3 'páginas': Inicio, Cardápio e Sobre, além de páginas sobre cada prato;</li>
   <li>Em 'Inicio' deve-se apresentar 3 sugestões de pratos, além do endereço do restaurante;</li>
   <li>Em 'Menu' devem ser listados todos os pratos do cardápio, junto de suas informações e imagem, além de opções para filtrar por categoria, para ordenar resultados e para buscar um nome de prato; </li>
   <li>Tanto em 'Menu' quanto em 'Inicio' o usuário deve ser capaz de entrar na 'página' do prato que desejar;</li>
   <li>Em sobre deve-se ter apenas uma imagem externa do local, o texto da empresa e imagens ilustrativas;</li>
   <li>Para todas as páginas deve-se ter um cabeçalho navegável com o ícone do restaurante e as páginas, a mesma foto e mensagem da marca, e um rodapé apenas com a logo;</li>
</ul>


## Estrutura do projeto:
<ul>
   <li><i>Assets</i>: Cntém os arquivos estáticos que serão utilizados em diferentes partes do projeto, como imagens png e svg;</li>
   <li><i>Components</i>: para ser possível reutilizar elementos de forma facilitada, foram criados componentes para o Footer, para o MenuLogo (cabeçalho), para as tags das refeições e para PatternPage (imagem com mensagem da empresa). Cada componente possui seu arquivo index.tsx e seu arquivo module.scss;</li>
   <li><i>Data</i>: Contém o arquivo menu.json, com todos os pratos do restaurante;</li>
   <li><i>Pages</i>: Contém as páginas propriamente ditas, tanto as páginas navegáveis pelo cabeçalho (Init, Menu e About), quanto uma página NotFound (para path não encontrado) e uma página 'Meal', que será renderizada quando o usuário clicar em um prato (seja pela página Init ou Menu). Cada 'page' possui seu arquivo index.tsx e seu arquivo module.scss;</li>
   <li><i>Componentes de Menu</i>: Dentro da page Menu foram colocados os componentes que são utilizados somente nessa page (Filters, Itens, Searcher e Sorter), cada um com seu arquivo tsx e seu arquivo module.scss. Dentro de Itens tem-se ainda o componente Item. Dentro de Sorter tem-se o arquivo options.json que contém as opções do ordenador;</li>
   <li><i>Styles</i>: Contém arquivos scss usados por diferentes páginas (variables, breakpoints e theme);</li>
   <li><i>Types</i>: Contém a tipagem de Menu (lista de objetos - todos os pratos) e de Meal (1 único prato/objeto de menu);</li>
   <li><i>src/index.css</i>: Base do CSS das páginas;</li>
   <li><i>src/index.tsx</i>: Base da renderização HTML das páginas, conectando-se com o React-DOM ao root do arquivo html da pasta 'public'; </li>
   <li><i>src/routes.tsx</i>: Arquivo onde são controladas as possíveis rotas da página, por meio do react-router-dom, sendo que basicamente teremos sempre a renderização do MenuLogo. Depois podemos ter a renderização de PatternPage junto da, de acordo com o path, renderização de Init, de Menu ou de About. Caso isso não ocorre tem-se a renderização da página de um prato (Meal) caso tenhamos o path correto com id. Em ultimo caso, tem-se a renderização da página NotFound. Por fim, para todos os caso possíveis, tem-se a renderização do footer.</li>
   <li><i>public/assets</i>: Para arquivos estatícos que devem ser renderizados dinâmicamente, como as imagens dos pratos.</li>
</ul>

<p>Versão Final da página:</p>

https://github.com/Mathbelch/Projetos_Deselvove_2023/assets/109366042/ed9bce3a-92d5-43a7-9e4e-13f4c090ed6e



