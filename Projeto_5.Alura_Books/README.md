# Projeto Formulário Alura Books

## Objetivo: 
Aplicar validação de formulário na página de cadastro da empresa fícticia Alura Books, de forma a se garantir a obtenção de dados padronizados para posterior inclusão no banco de dados, além de melhorar a usabilidade da página por meio da exibição de mensagens de erro claras ao usuário em tempo real. Para isso ultilizou-se de diversos conceitos JS (Regex, fetch, assync/await, try/catch, modules) para validações e comunicações com diferentes APIs (Brasil API, Who is - Email Verification API, Via CEP);

## Requisitos do Projeto:

<ul>
   <li>Todos os campos do formulário são de preenchimento obrigatório, exceto o 'complemento' em endereço;</li>
   <li>O campo de nome completo deve contér ao menos duas palavras (nome e sobrenome), e apenas usuários maiores de idade podem se inscrever;</li>
   <li>O usuário deve fornecer telefone de contato e e-mail válidos;</li>
   <li>O CPF do usuário deve ser válidado com relação ao dígito verificador, mas outros erros podem ser informados ao usuário para melhorar a usabilidade;</li>
   <li>Na parte de endereço, apenas os campos de CEP, número e complemento devem permitir o preenchimento pelo usuário, sendo que os demais campos devem ser preenchidos automáticamente por meio de consulta do CEP informado;</li>
</ul>

## Estrutura do projeto:
<ul>
   <li><i>index.html</i>: Página HTML do formulário de cadastro, sendo que ao ser submetido (botão) ocorre o redirecionamento para a página cadastro-finalizado.html ;</li>
   <li><i>script.js</i>: Contém o código JS responsável por obter os elementos de input do formulário e chamar as diferentes funções de validações criadas;</li>
   <li><i>/Validadores</i>: Contém os arquivos JS das funções de validação para cada elemento de input do fomulário;
   <li><i>/img</i>: Contém as imagens exibidas na página HTML;</li>
   <li><i>/styles</i>: Contém os arquivos css da página, organizados por componente;</li>
</ul>


## Validações:
   <ul>
      <li><b>Nome:</b> validação com Regex, checando se o nome possui ao menos duas palavras (nome - espaço - sobrenome), tanto no pattern do HTML input (para não permitir envio fora do padrão) quanto em js para exibir mensagem de erro;</li>
      <li><b>Data de Nacimento:</b> Realizada da mesma forma que para o nome, de forma a permtir o cadastro apenas de maiores de 18 anos;</li>
      <li><b>Telefone de contato:</b> deve possuir formato válido (DDD + 8 ou 9 dígitos), sendo o DDD válidado e seu estado identificado por consulta GET com a <a href="https://brasilapi.com.br/" alt="_blank">Brasil API</a>;</li>
      <li><b>E-mail:</b> A validação do email foi feita pela própria tag HTML e pela consulta na API <a href="https://emailverification.whoisxmlapi.com/api" alt="_blank"> <i>Who is - Email Verification</i></a>, checando tanto pela sintaxe quanto pelo dominío do e-mail informado<sup>*</sup>;</li>
      <small>*É necessário possuir cadastro no sistema e uma chave de acesso (apiKey), a qual deve ser incluida no arquivo keys.js</small>
      <li><b>CPF:</b> Válidação realizada em código JS, verificando inicialmente se o valor informado possui 11 dígitos, se é formado apenas por números iguais (inválido) e, em seguida, são conferidos os dígitos verificadores<sup>*</sup>;</li>
      <small>* Para o 1° digito verificador, somamos os 9 primeiros dígitos multiplicados de 10 até 2 (10 * 1°) + (9 * 2°) + (8 * 3°) + ... + (2 * 9°) e aplicamos a fórmula em confirma dígito. Para o 2° digito multipicador, somamos os 10 primeiros dígitos multiplicados de 11 até 2 (11 * 1°) + (10 * 2°) + (9 * 3°) + ... + (3 * 10°), e aplicamos na fórmula confirma dígito.</small>
      <li><b>Endereço:</b> A validação do CEP foi feita pela pela consulta na API <a href="https://viacep.com.br/" alt="_blank"> <i>Via CEP</i></a>, já buscando e preenchendo as informações dos demais campos de endereço (exceto número e complemento);</li>
   </ul>

## Versão Final da Página: