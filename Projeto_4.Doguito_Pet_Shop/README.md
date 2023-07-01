# Projeto Doguito Pet Shop

## Objetivo: 
Desenvolver aplicação simples para controle administrativo interno de lojas da franquia de Pet Shop fictícia Doguito. O foco do projeto foi trabalhar com validação de formulários em HTML e JS, fluxos de telas em HTML, além de conceitos de controladores e servidores, por meio da implementação de operações de CRUD em API 'simulada'.

## Requisitos do Projeto:

<ul>
   <li>A página inicial deve conter um visual simples, apenas com a logo da Doguito e as informações do usuário de acesso (atende da Pet Shop);</li>
   <li>O usuário (atendente da Pet Shop) deve ser capaz de usar o sistema para poder cadastrar, de forma rápida, produtos que entrem na loja (informando o nome, descrição e valor). O usuário não terá acesso a essa base de dados, sendo restrita ao setor financeiro;</li>
   <li>O usuário (atendente da Pet Shop) deve ser capaz de usar o sistema para poder cadastrar clientes no Clube de Vantagens Doguito, devendo-se preencher o formulário com informaçoes do cliente: nome, email, senha (o cliente irá ser solicitado para alterar a senha depois), data de nascimento, cpf e endereço. O usuário não terá acesso a essa base de dados, sendo restrita a equipe coordenadora do Clube de Vantagens;</li>
   <li>O usuário (atendente da Pet Shop) deve ser capaz de usar o sistema para poder visualizar e manipular o banco de dados básico de clientes cadastrados em sua loja, podendo inserir novos clientes (nome e email) e também editar e excluir os clientes já cadastrados.</li>
   <li>Deve-se deixar uma página HTML chamada 'Pets' para posterior implementação, com um aviso de que a página está em construção;</li>
   <li></li>
   <li></li>
</ul>

## Estrutura do projeto:
<ul>
   <li><i>/Assets</i>: Arquivos css com estilos base (reset, variaveis e base), dos componentes usados em diversas páginas (botão, cabeçalho, cartão, inputs, modal e tabela) e com estilos das telas html. Tem-se ainda as imagens svg usadas;</li>
   <li><i>/Controller</i>: Contém os arquivos js dos controladores para atualizar os clientes, cadastar clientes e listar clientes, fazendo a intermediação entre a a API e a View;</li>
   <li><i>/JS</i>: Contém os arquivos JS app e validacao, responsáveis pelas validações de formulários;</li>
   <li><i>/Service</i>: Contém o arquivo cliente-service.js, responsavel pela comunicação com API;</li>
   <li><i>/Telas</i>: Contém os arquivos HTML da página inicial e das diferentes telas da aplicação, separados de acordo com seu fluxo de trabalho, além de uma página de erro genérica;</li>
</ul>

## Fluxos de Trabalho:
<ul>
   <li><i>Fluxo de Produtos</i>: Tela para cadastro de produtos no sistema com validação simples de formulário e redirecionamento para página de cadastro concluído;</li>
   <li><i>Fluxo do Clube de Vantagens</i>: Tela para cadastro de usuário no clube de vantagens com validação mais avançada de formulário e redirecionamento para página de cadastro concluído;</li>
   <li><i>Fluxo de Cliente</i>: Tela para listagem dos clientes no objeto profile (db.json), com opções de excluir ou editar um cliente (redireciona para tela de edição e, posteriormente de edição concluida), além da opção de cadastrar um novo cliente (redireciona para a tela de cadastro_concluido);</li>
   <li><i>Fluxo de Pets</i>: Fluxo em construção;</li>
</ul>

## Validação de formulários:

<ul>
   <li>O código JS responsável pela validação de formulários foi centralizado em app.js (resposável pela busca e obtenção dos elementos input do DOM), e em validacao.js (chamada para cada input obtido por app.js), a qual possui uma função genérica que recebe todos os inputs e checa seus tipos de dados, para então chamar a função de validação correspondente;</li>
   <li>Todos os campos de todos os formulários (exceto o complemento em endereço) são de preenchimento obrigatórios (required);</li> 
   <li>Campos de email contam apenas coma validação HTML padrão, enquanto outros campos possuem validação definida em validação.js:
      <ul>
         <li>Data de Nascimento - checagem se o cliente é maior de idade (18 anos);</li>
         <li>CPF - checagem se o CPF informado possui apenas digitos repetidos, se possui o tamanho adequado (11 dígitos) e checagem dos dois últimos dígitoa verificadores;</li>
         <li>CEP - validação pela API ViaCep, com preenchimento automático dos demais dados de endereço;</li>
      </ul>
   </li>
   <li>Senhas são válidadas na tag HTML com 'pattern' (Regex): A senha deve conter ao menos 1 letra minuscula, 1 letra maiuscula e 1 numero. Deve ter entre 6 e 12 caracteres e não deve conter símbolos;</li>
   <li>O formato do CEP também é validado previamente com Regex em pattern HTML antes de ser enviado para a função de validação e comunicação com API;</li>
   <li>O preço de produtos é validado preliminarmente pela aplicação de uma máscara monetária em app.js, garantindo formato correto do valor.</li>
</ul>

## Comunicação com API - Clientes:
   <p>Realizada por meio de requisições HTTP com Fetch (cliente-service.js) e intermediada pelos controladores, as seguintes operações de acesso a db.json:</p>
   <ul>
      <li>listaClientes (GET) -> Retorna para listaCliente-controller.js uma Promisse com o Json do objeto 'profile' da API db.json. O controlador chama função de criar linha e inserir essa linha na tabela HTML de lista_cliente.html, para todos os clientes no BD. Essa operação é chamada assim que se entra na página lista_cliente.html;</li>
      <li>criaCliente (POST)-> Registra um novo cliente em bd.json, sendo chamada ao submeter o formulário em cadastra_cliente.html;</li>
      <li>removeCliente (DELETE) -> Cliente excluido do BD com base em seu id, sendo chamada por listaClientes-controller.js ao se clicar em 'excluir';</li>
      <li>detalhaCliente (GET) -> Usada para se obter o nome e o email de um cliente a partir do id, retornando a resposta convertida para string, (exibida na em edita_cliente.html). É chamada por atualizaClientes-controller.js quando 'editar' é clicado na listagem de clientes;</li>
      <li>atualizaCliente (PUT) -> Recebe o id, nome e email e retorna um objeto json com o novo nome e email, salvo no BD;</li>
   </ul>

<p><b>obs:</b> Para simular hospedagem API em servidor local: npx json-server --watch db.json, rodar com browser sync ou liveServer. Dependência usada: "json-server": "^0.16.2". 


