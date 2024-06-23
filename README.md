# StudentFlow API

Bem-vindo à **StudentFlow API**. Este projeto é uma API desenvolvida para gerenciar informações de estudantes. Ela oferece endpoints para CRUD (Criar, Ler, Atualizar e Deletar) operações sobre estudantes e autenticação de usuários. A API está configurada para rodar em um ambiente Dockerizado.

## Stack utilizada

**Back-end:** Node e Express

## Funcionalidades

- CRUD completo para gerenciamento de estudantes.
- Autenticação e autorização de usuários com JWT.
- Endpoints seguros e protegidos por autenticação.
- Configuração fácil via Docker e Docker Compose.

## Instalação

Para configurar e rodar a **StudentFlow API**, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em seu sistema:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) (geralmente incluído com o Node.js)
- [Docker](https://www.docker.com/get-started) e [Docker Compose](https://docs.docker.com/compose/install/)
- [PostgreSQL](https://www.postgresql.org/)

### Passo a Passo

1. **Clone o repositório**

   Clone o repositório da API para seu ambiente local:

   ```bash
   git clone https://github.com/adrianogui02/StudentFlow_backend.git
   ```

1. **Navegue até o diretório do projeto**

   Entre no diretório do projeto clonado:

   ```bash
   cd StudentFlow_backend
   ```

1. **Configuração do Ambiente**

   Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

   ```bash
   DB_NAME=studentflow
   DB_USER=admin
   DB_PASS=admin
   DB_HOST=db
   PORT=3005
   NODE_ENV=development
   ```

1. **Usando Docker**

   Se preferir usar Docker, você pode seguir os passos abaixo para configurar e rodar a API usando Docker e Docker Compose:

   - Construa e Inicie os containers:

     ```bash
     docker-compose up -d --build
     ```

     Isso irá iniciar o serviço da API na porta 3005 e o PostgreSQL na porta 5432.

   - Verifique os logs dos containers::

     ```bash
     docker-compose logs -f
     ```

     Verifique se não há erros na inicialização e que a API está conectada ao banco de dados.

1. **Rodando Localmente (Sem Docker)**

Se você optar por rodar a aplicação localmente sem Docker, siga os passos abaixo:

- Instale as dependências:
  ```bash
  npm install
  ```
- Configure o banco de dados PostgreSQL:

  Certifique-se de que você tem o PostgreSQL instalado e em execução. Crie um banco de dados com as credenciais especificadas no arquivo .env:

  ```bash
  createdb studentflow
  ```

- Inicie a aplicação:

  ```bash
  npm start

  ```

## Documentação da API

Abaixo estão detalhes dos endpoints disponíveis na **StudentFlow API**

### Usuários

#### Registro de Usuário

```http
  POST /api/user/register
```

| Parâmetro  | Tipo     | Descrição                             |
| :--------- | :------- | :------------------------------------ |
| `username` | `string` | **Obrigatório**. Username do usuário. |
| `password` | `string` | **Obrigatório**. Senha do usuário.    |

- **Descrição:** Cria um novo usuário.
- **Body:** JSON contendo os campos do usuário
- **Exemplo de Body:**

  ```
  {
  "username": "adrianobre",
  "password": 13245364758697,
  }
  ```

- **Resposta de Sucesso:**
  - **Status:** 201 Created
  - **Body:** JSON com os dados do usuário criado.

#### Login de Usuário

```http
  POST /api/user/login
```

| Parâmetro  | Tipo     | Descrição                             |
| :--------- | :------- | :------------------------------------ |
| `username` | `string` | **Obrigatório**. Username do usuário. |
| `password` | `string` | **Obrigatório**. Senha do estudante.  |

- **Descrição:** Autentica um usuário e retorna um token de acesso JWT.
- **Body:** JSON contendo as credenciais de login (username e password).
- **Exemplo de Body:**

  ```
  {
  "username": "adrianobre",
  "password": 13245364758697,
  }
  ```

- **Resposta de Sucesso:**
  - **Status:** 200 OK
  - **Body:** JSON com o token de acesso JWT e os dados do usuário (exceto a senha).

### Estudantes

#### Retorna todos os estudantes

```http
  GET /api/student/students
```

- **Descrição:** Retorna uma lista de todos os estudantes cadastrados associados ao usuário autenticado.
- **Autenticação:** Este endpoint requer um token de autenticação JWT no header Authorization: Bearer {token}.
- **Resposta de Sucesso:**
  - **Status:** 200 OK
  - **Body:** JSON com a lista de estudantes.

#### Retorna um estudante pelo Id

```http
  GET /api/student/students/{id}
```

| Parâmetro | Tipo     | Descrição                                         |
| :-------- | :------- | :------------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do estudante que você quer. |

- **Descrição:** Retorna os detalhes de um estudante específico com base no ID fornecido.
- **Autenticação:** Este endpoint requer um token de autenticação JWT no header Authorization: Bearer {token}.
- **Resposta de Sucesso:**
  - **Status:** 200 OK
  - **Body:** JSON com os dados do estudante.

#### Adiciona um novo estudante

```http
  POST /api/student/students
```

| Parâmetro | Tipo     | Descrição                            |
| :-------- | :------- | :----------------------------------- |
| `name`    | `string` | **Obrigatório**. Nome do estudante.  |
| `age`     | `string` | **Obrigatório**. Idade do estudante. |
| `email`   | `string` | **Obrigatório**. Email do estudante. |
| `course`  | `string` | **Obrigatório**. Curso do estudante. |

- **Descrição:** Cria um novo registro de estudante.
- **Autenticação:** Este endpoint requer um token de autenticação JWT no header Authorization: Bearer {token}.
- **Body:** JSON contendo os campos do estudante
- **Exemplo de Body:**

  ```
  {
  "name": "Adriano Nobre",
  "age": 21,
  "email": adrianob@gmail.com
  "course": "Engenharia da Computação"
  }
  ```

- **Resposta de Sucesso:**
  - **Status:** 201 Created
  - **Body:** JSON com os dados do estudante criado.

#### Atualiza um estudante

```http
  PUT /api/student/students/{id}
```

| Parâmetro | Tipo     | Descrição                                            |
| :-------- | :------- | :--------------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do estudante a ser atualizado. |

- **Descrição:** Atualiza os dados de um estudante específico.
- **Autenticação:** Este endpoint requer um token de autenticação JWT no header Authorization: Bearer {token}.
- **Body:** JSON com os campos a serem atualizados.
- **Exemplo de Body:**

  ```
  {
  "name": "Adriano Nobre",
  "age": 21,
  "email": adrianobre02@gmail.com
  "course": "Engenharia da Computação"
  }
  ```

- **Resposta de Sucesso:**
  - **Status:** 200 OK
  - **Body:** JSON com os dados do estudante atualizado.

#### Deleta um estudante

```http
  DELETE /api/student/students/{id}
```

| Parâmetro | Tipo     | Descrição                                          |
| :-------- | :------- | :------------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do estudante a ser deletado. |

- **Descrição:** Remove um estudante específico.
- **Autenticação:** Este endpoint requer um token de autenticação JWT no header Authorization: Bearer {token}.
- **Body:** JSON com os campos a serem atualizados.
- **Resposta de Sucesso:**
  - **Status:** 204 No Content

## Autores

[@adrianogui02](https://github.com/adrianogui02)

## Licença

[MIT](https://choosealicense.com/licenses/mit/)
