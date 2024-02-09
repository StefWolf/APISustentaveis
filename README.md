# PackLuzzer REST API 

  PackLuzzer is an initial extension of a project that combines Virtual Reality and Web. With it, data management between users and their intentions in the plugins will be given through its simple and initial architecture, developed with NestJs.

## Goal

### General:

Integrate gamified environments into web systems.

### Specific:

Create a shared environment on the network to store player data and their scores in plugins created in a Virtual Reality environment, for a web system.

## Usage

  This API follows the REST architecture pattern, separating each endpoint from its coherent methods and responses. Below is the table of current implemented endpoints:

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

### Ubuntu

```
git clone https://github.com/StefWolf/APISustentaveis.git

npm install 

npx prisma generate

npm start

```

### Upcoming features

- [ ] Create Middlwares VerifyUser and VerifyPluzzle



