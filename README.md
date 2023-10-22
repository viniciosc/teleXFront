# Telexfront

Telexfront é um projeto front-end desenvolvido para interagir com uma API em Node.js que se conecta a um bot do Telegram. Ele permite aos usuários receber mensagens enviadas ao bot e visualizar todas as mensagens enviadas a ele. Essa funcionalidade é essencial para interagir eficazmente com a comunidade conectada ao bot.

## Pré-requisitos

O cadastro do usuario precisa ser o mesmo nome do usuario do telegram para ele ser capaz de indentificar suas mensagems 

Antes de começar, certifique-se de ter as seguintes dependências instaladas:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/) (gerenciador de pacotes)
- [TypeScript](https://www.typescriptlang.org/)

## Tecnologias Utilizadas

- [Vue.js](https://vuejs.org/)
- [Vite](https://vitejs.dev/) (para o ambiente de desenvolvimento)
- [Vue Router](https://router.vuejs.org/) (para gerenciamento de rotas)
- [Axios](https://axios-http.com/) (para requisições HTTP)
- [Pinia](https://pinia.esm.dev/) (para gerenciamento de estado)
- [Socket.io-client](https://socket.io/docs/v4/client-api/) (para comunicação em tempo real)

## Instalação

Para começar, você precisa instalar as dependências do projeto. Use o seguinte comando:

```bash
npm install

Scripts
No diretório do projeto, você pode executar os seguintes scripts:

npm run dev: Inicia o servidor de desenvolvimento usando Vite.
npm run build: Compila o projeto para produção.
npm run preview: Visualiza a compilação de produção.
npm run build-only: Compila o projeto sem executar a verificação de tipos.
npm run type-check: Verifica os tipos do projeto usando Vue-TSC.
npm run lint: Executa o ESLint para verificar e corrigir problemas de código.
Uso
Para compilar o projeto e iniciar o servidor de desenvolvimento, utilize o seguinte comando: