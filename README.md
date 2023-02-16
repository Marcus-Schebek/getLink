# Documentação do projeto GetLink

### Introdução

  O projeto GetLink é um organizador de links que permite ao usuário salvar seus links favoritos para referência posterior. Além de permitir que os usuários adicionem novos links, eles também podem visualizar e editar links existentes. O projeto foi criado usando React, Typescript, Firebase e Axios. A aplicação consiste em duas páginas principais: a página de login e a página inicial.

### Instalação e Uso

Para executar o projeto, você precisará ter o Node.js e o NPM ou Yarn instalados em seu computador. Para instalá-los, siga as instruções no site oficial. Em seguida, execute os seguintes comandos no diretório do projeto:

        npm install ou yarn add
        npm start ou yarn dev

O primeiro comando instalará todas as dependências necessárias e o segundo comando iniciará o servidor local. Agora você pode acessar o aplicativo em http://localhost:3000

Atente-se que a aplicação utiliza dependências do Firebase, então existe variavéis de ambiente que não serão adquiridas por essa instação padrão. Por questões de segurança inicie o seu projeto Firebase e consiga suas próprias variavéis de ambiente para que a aplicação funcione corretamente.

## Arquivos do projeto

### AuthContext

O arquivo AuthContext.tsx é responsável por criar e exportar o contexto de autenticação do usuário. Este contexto é usado em vários componentes do aplicativo para permitir que o usuário faça login e logout, bem como para acessar informações sobre o usuário atual.

### index.tsx

O arquivo index.tsx é o arquivo principal do aplicativo. Ele renderiza o componente App, que é o componente raiz do aplicativo.

### App.tsx

O arquivo App.tsx é o componente raiz do aplicativo. Ele contém as rotas para as páginas de login e inicial e lida com a autenticação do usuário. As rotas foram desenvolvidas a partir da biblioteca React Router Dom.

### Login.tsx

O arquivo Login.tsx contém o componente para a página de login do aplicativo. Ele permite que o usuário faça login usando sua conta do Google. O Login é feito a partir do provider oferecida pelo próprio google utilizando o Firebase.

### Home.tsx

O arquivo Home.tsx contém o componente para a página inicial do aplicativo. Ele permite que o usuário adicione, visualize, edite e delete links existentes.

### link.services.ts

O arquivo link.services.ts contém os serviços para ações com os links, como adicionar, buscar todos ou deletar um link.

### LatteCard.tsx

O arquivo LatteCard.tsx contém o componente para renderizar um link na página inicial.

### webCrawler.services.py 

Este código é uma aplicação em Flask para fazer um web scraping básico em uma página web e retornar algumas informações em formato JSON.

A aplicação Flask possui uma única rota "/api/scraper" que recebe uma consulta de URL. A partir dessa consulta, a aplicação faz uma solicitação HTTP para a página web correspondente e armazena a resposta em um objeto.

Em seguida, a aplicação usa a biblioteca BeautifulSoup para analisar o HTML da página e extrair o título, subtítulo e imagem usando as funções find().

Por fim, a aplicação retorna um objeto JSON que contém as informações extraídas da página web. A função jsonify() é usada para converter o dicionário Python em um objeto JSON válido.

### Api.py 

Esse código utiliza a biblioteca Flask para criar um servidor web e expor uma API REST que, dado uma URL de uma página web, realiza o web scraping dessa página e retorna um JSON com o título, subtítulo e imagem de um relatório.

A função scraper é um endpoint da API, definida pela rota '/report/<string:url>' que recebe uma URL como parâmetro. Ao receber uma requisição GET para essa rota, o Flask chama a função scraper, que faz uma requisição GET para a URL recebida como parâmetro utilizando a biblioteca requests. A resposta da requisição é então processada pela biblioteca BeautifulSoup para extrair as informações desejadas.

Por fim, a função retorna um JSON com as informações extraídas em formato estruturado utilizando o método jsonify da biblioteca Flask. O servidor é iniciado chamando a função run do objeto app, caso o código seja executado diretamente (e não importado por outro módulo), com o parâmetro debug=True para permitir o rastreamento de erros no código.

### Conclusão 

O projeto GetLink é um organizador de links simples, mas eficaz, que permite que os usuários salvem seus links favoritos e os acessem facilmente mais tarde. Ele foi construído usando tecnologias modernas como React, Typescript, Firebase, Python, React Router Dom, SASS e Axios. Espero que esta documentação ajude a entender melhor como o projeto funciona e como você pode usá-lo. Se tiver alguma dúvida ou sugestão, sinta-se à vontade para entrar em contato.

### Experimente a aplicação:

Para visualizar a aplicação em funcionamento acesse: https://get-link-two.vercel.app/login

