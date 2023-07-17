# Projeto Event Tracker

## Objetivo: 
<p>Refatorar a aplicação Event Tracker, cujo gerenciamento de estado está direto em App.tsx com uma lista de eventos, para obter uma aplicação de alta coesão e baixo acomplamento, de forma que seja possível seu crescimento de forma escalável.</p>
<br>
<p>O Event Tracker é uma aplicação que exibe eventos em um calendário, similar a uma agenda digital. Por meio dele, podemos adicionar, editar e remover eventos, além de marcar quando um evento for completado e filtrar os eventos exibidos por datas.</p>
<p> 
 

## Requisitos do Projeto:
<ul>
   <li>Projeto implementado em TS e React, tendo sido usado Node.JS na versão LTS e npm;</li>
   <li>Deve ser possível alterar data/horário do evento por meio de drag & drop;</li>
   <li>O usuário pode inserir um novo evento preenchendo o formulário, desde que a data do evento não seja anterior a data atual;</li>
   <li>O usuário pode deletar um evento por um button na listagem de eventos;</li>
   <li>O usuário pode marcar um evento como concluido e desfazer isso por meio de um checkbox na listagem de eventos;</li>
</ul>

## Refatoração:
<ul>
   <li>Ultilizou-se da biblioteca <a href="recoiljs.org/" target="_blank">Recoil</a> para fazer o gerenciamento de estados;</li>
   <li>Na versão inicial da aplicação, todo o gerênciamento de estado estava em App.tsx, o que - além de deixar o código confuso -, gera o chamado <i>Prop Drilling</i>, ou seja, ficamos passando Props de um lado para outro. Para contornar isso, a lista de eventos foi extraida para um átomo recoil, o qual pode então ser facilmente importado para os componentes que precisam ter acesso a ele;</li>
   <li>Ainda na versão inicial, os métodos de manipulação dos eventos estavam também em App.tsx. Esses métodos foram extraidos e encapsulados para Hooks recoil, que podem ser facilmente chamados nos componentes que os executam. Dessa forma, cada porção do nosso código está com uma responsabilidade bem definida, sendo que os componentes não precisam reconhecer o Recoil, deixando essa responsabilidade para os Hooks;</li>
   <li>Usando a biblioteca <a href="https://github.com/typicode/json-server#getting-started" target="_blank">Json-server</a> foi criada uma API REST simulada para que seja feita uma requisição ao iniciar a aplicação de forma a se obter os eventos base para teste;</li>
   <li>Visando otimizar a experiência do desenvolvedor, foram utilizadas ferramentas de depuração do Recoil para que mudanças nos estados dos eventos sejam registradas no console;</li>
</ul>

## Estrutura do projeto em 'src':
<ul>
   <li><i>App.tsx</i>: Arquivo que renderiza a aplicação, por meio da chamada dos componentes que irão ser necessários na página;</li>
   <li><i>index.tsx</i>: Arquivo que usa do React-dom para chamar app.tsx e renderizar a aplicação;</li>
   <li><i>util.ts</i>: Arquivo usado para atribuit IDs de forma automática aos eventos, de forma a ser possível realizar a manipulação destes;</li>
   <li><i>db.json</i>: Arquivo que vai conter os eventos bases da API json-server;</li>
   <li><i>components</i>: Contém os componentes da aplicação;</li>
   <li><i>interfaces</i>: Contém as interfaces de evento e filtros, usadas nos componentes;</li>
   <li><i>state</i>: Contém o átomo recoil, os seletores e os hooks usados pelos componentes;</li>

</ul>

## Versão Final da página:
<p>De forma geral, em App.tsx não temos mais nenhuma lógica de como lidar com a lista de eventos, condicionar eventos ou deletar eventos, não existe mais essa necessidade de termos tudo definido e sair passando para os componentes filhos por meio de Pops. Então agora, a aplicação está pronta para crescer, porque ela tem mecanismos que defendem o código. Se for necessário alteração, essa será feita de forma bem pontual. Para alterar o método que adiciona, por exemplo, mudamos somente esse Hook. Se for necessário alterar a ferramenta de Recoil para outra, alteramos também somente os hooks e não será necessário ficar procurando todos os componentes que estão acessando o Recoil diretamente.</p>

https://github.com/Mathbelch/Projetos_Deselvove_2023/assets/109366042/83174b65-76e4-47c0-b1da-eb07f4744673







