# Projeto Formulário Alura Bookd

## Objetivo: 
Aplicar validação de formulário na página de cadastro da empresa fícticia Alura Books, de forma a se garantir a obtenção de dados padronizados para posterior inclusão no Banco de Dados. As validações foram feitas tanto no html para não permitir a submissão de dados fora do padrão, quanto em script.js para exibir mensagens de erro ao usuário em tempo real. Além disso ultilizou-se conceitos JS (Regex, fetch, assync/await, try/catch) para validações e comunicações com diferentes APIs (Brasil API, Who is - Email Verification API,  );

## Requisitos do Projeto:

<ul>
   <li>Todos os campos do formulário são de preenchimento obrigatório, exceto o 'complemento' em enderesso;</li>
   <li>O campo de nome completo deve contér ao menos duas palavras (nome e sobrenome), e apenas usuários maiores de idade podem se inscrever;</li>
   <li>O usuário deve fornecer telefone de contato e e-mail válidos;</li>
   <li>;</li>
   <li>;</li>
</ul>

## Estrutura do projeto:
<ul>
   <li><i>index.html</i>: Página HTML do formulário de cadastro, sendo que ao ser submetido (botão) ocorre o redirecionamento para a página cadastro-finalizado.html ;</li>
   <li><i>script.js</i>: Contém o código JS das diferentes funções de validações criadas;</li>
   <li><i>img</i>: Contém as imagens exibidas na página HTML;</li>
   <li><i>styles</i>: Contém os arquivos css da página, organizados por componente;</li>
</ul>


## Validações:
   <ul>
      <li>Nome: validação com Regex, checando se o nome possui ao menos duas palavras (nome - espaço - sobrenome), tanto no pattern do HTML input (para não permitir envio fora do padrão) quanto em js para exibir mensagem de erro;</li>
      <li>Data de Nacimento: Realizada da mesma forma que para o nome, de forma a permtir o cadastro apenas de maiores de 18 anos;</li>
      <li>Telefone de contato: deve possuir formato válido (DDD + 8 ou 9 dígitos), sendo o DDD válidado e seu estado identificado por consulta GET com a <a href="https://brasilapi.com.br/" alt="_blank">Brasil API</a>;</li>
      <li>E-mail: A validação do email foi feita pela própria tag HTML e pela consulta na API <a href="https://emailverification.whoisxmlapi.com/api" alt="_blank"> <i>Who is - Email Verification</i></a>, checando tanto pela sintaxe quanto pelo dominío do e-mail informado;</li>
      <li>CPF: npm i check-cpf;</li>
      <li>Endereço: ;</li>
   </ul>


## Comunicação com APIs:

## Versão Final da Página: