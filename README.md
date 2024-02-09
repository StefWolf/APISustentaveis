# PackLuzzer REST API 

  PackLuzzer é uma extensão inicial de um projeto que merge Realidade Virtual e Web. Com ele a gestão de dados entre usuários e suas pontuações nos pluzzles serão dadas atravéz de sua arquitetura simples e inicial, desenvolvedida com NestJs.

## Goal

### General:

Integralizar ambientes gamificados em sistemas web.

### Specific:

Criar um ambiente compartilhado na rede para armazenar dados de jogadores e seus scores em pluzzles criados em um ambiente de Realidade Virtual, para um sistema web. 

## Usage

  Essa API segue o padrão de arquitetura REST, separando cada endpoint de seus métodos e respostas coerentes. Segue abaixo a tabela dos endpoints atuais implementados:

#### Endpoints Overview

- **User**

| Endpoint | Method | Param | Description |
|----------|--------|--------|------------|
| /user/{id} | GET | Id | find a user by id |
| /users | GET | - | find users |
| /user/delete/{id} | DELETE | id | delete a user by id |
| /user/update/{id} | PUT | id, name, email, code, xp | update user's data by id |
| /user/new | POST | name, email, code, xp, JWT:null | create a new user |
| /user/login | POST | name, code | login of user |

- **Pluzzle**

| Endpoint | Method | Param | Description |
|----------|--------|--------|------------|
| /pluzzle/{id} | GET | id | find a pluzzle by id |
| /pluzzles | GET | - | find pluzzles | 
| /pluzzle/new | POST | name | create a new pluzzle |
| /pluzzle/delete | DELETE | id | delete pluzzle |
| /pluzzle/update | PUT | id | update pluzzle's data |

- **UsersPluzzles**

| Endpoint | Method | Param | Description |
|----------|--------|--------|------------|
| /userPluzzle/update/{id} | PUT | id, pluzzleId, userId, xp | update relation between pluzzle and user |
| /userPluzzle/{userId}/{idPluzzle} | GET | userId, idPluzzle | find relation |
| /userPluzzle/new | POST | idUser, idPluzzle | create new relation

#### Middlewares

- **Auth** 
- **VerifyUser**
- **VerifyPluzzle** 

## Prerequisites

- NodeJs v20.3.1

## Installation

```
git clone https://github.com/StefWolf/APISustentaveis.git

npm install 

npx prisma generate

npm start

```

### License





