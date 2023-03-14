# QandA-node-API

> By David Ondiege

## Tools:

- NodeJS
- ExpressJS
- Prisma (ORM)
- PostgreSQL
- JWT
- Mocha

ERD - http://bit.ly/3Zs1BRA

## Start Here🚀

### Prerequisites

- Have Node & PostgreSQL installed (v15) installed on your machine
- Have at least one PostgreSQL user created with a password

1. Clone the repository to your machine depending on your environment

```
https: https://github.com/david-commit/QandA-node-API.git
or
SSH: git@github.com:david-commit/QandA-node-API.git
```

2.  Create a new database instance on your machine by following the the steps below:
    <br /><strong>Note:</strong> Ignore the <> (angle brackets) when writing the commands.

    <ol type="i">
      <li>Open a new instance of terminal and run <code>psql -U postgres</code></li>
      <li>Create a new database by running <code>CREATE DATABASE < database_name >;</code>
        <br />
        Replace < database_name > with the name of your database
      </li>
      <li>Grant privilages on the database to the user. Run <code>GRANT ALL PRIVILEGES ON DATABASE < database_name > to < your_user >;</code>
        <br />
        Replace < your_user > with the name to your database user
      </li>
      <li>
        Create an <code>.env</code> file on the root directory and the following variables:
        <ol type="i">
          <li><code>PORT = < port-number > </code> <br />
          Provide a port-number of your choice e.g 8000</li>
          <li><code>SECRET = "any-random-string" </code> <br />
          Provide a string of your choice e.g "ineverthoughtbuildingnodeapiswouldbethisfun"</li>
          <li><code>DATABASE_URL = "postgresql://user:user_password@localhost:5432/mydb?schema=sample" </code> <br />
          Replace the user, user_password & mydb with your database specifics. Refer to <a href="https://www.prisma.io/docs/concepts/database-connectors/postgresql">Docs</a> for guidance.</li>
        </ol>
      </li>
    </ol>

3. Run `npm install` to install all required dependancies

4. Run `npm run dev` to start the server and make requests

5. Run `npx prisma migrate dev` to run run migrations to synchronize your database to the schema

    === <br />
    Currently working on seeding the database for first usage

## API Documentation

### Creating a user account

Route: `POST /auth/register`

```json
{
  "full_name": "Sheelah Waringa",
  "email": "sheelah@gmail.com",
  "phone": "+25475455568",
  "role": "Community Developer",
  "password": "sheelah"
}
```

Response:

```json
{
  "newUser": {
    "id": 8,
    "full_name": "Sheelah Waringa",
    "email": "sheelah@gmail.com",
    "phone": "+25475455568",
    "role": "Community Researcher",
    "password": "$2b...08q"
  },
  "token": "eyJhN...RCO4"
}
```

### Logging in to an existing user account

Route: `POST /auth/login`

```json
{
  "email": "sheelah@gmail.com",
  "password": "sheelah"
}
```

Response:

```json
{
  "token": "eyJhN...RCO4"
}
```

### Get all questions

Route: `GET /questions`

Response:

```json
[
  {
    "id": 1,
    "question": "How many students have adequate school textbooks?",
    "created_at": "2023-03-08T16:46:58.323Z",
    "user_id": 8,
    "answers": []
  },
  {
    "id": 2,
    "question": "When is the basketball court construction due?",
    "created_at": "2023-03-08T16:46:58.323Z",
    "user_id": 8,
    "answers": [
      {
        "id": 1,
        "answer": "The community sports center revovation was completed on Friday, the youth can now play basketball at the court.",
        "created_at": "2023-03-08T21:04:32.590Z",
        "updated_at": "2023-03-09T07:14:10.114Z",
        "question_id": 10
      }
    ]
  }
]
```

### Posting a question

Route: `POST /questions`

```json
{
  "question": "When is the community festival happenening?",
  "user_id": 8
}
```

Response:

```json
{
  "id": 2,
  "question": "When is the community festival happenening?",
  "created_at": "2023-03-08T16:15:04.823Z",
  "updated_at": "2023-03-08T16:15:04.823Z",
  "user_id": 8
}
```

### Get a specific question

Route: `GET /questions/:questionId`

Response:

```json
{
    "id": 2, //questionId
    "question": "When is the basketball court construction due?",
    "created_at": "2023-03-08T16:46:58.323Z",
    "user_id": 8,
    "answers": [
      {
        "id": 1,
        "answer": "The community sports center revovation was completed on Friday, the youth can now play basketball at the court.",
        "created_at": "2023-03-08T21:04:32.590Z",
        "updated_at": "2023-03-09T07:14:10.114Z",
        "question_id": 10
      }
    ]
  }
```

### Deleting an existing question

Route: `DELETE /questions/:questionId`

Response:

```json
{
  "msg": "Question deleted succesfully"
}
```

### Posting an answer to a question

Route: `POST /questions/:questionId/answers`

```json
{
  "question_id": 1,
  "answer": "The community sports center revovation was completed on Friday, the youth can now play basketball at the court."
}
```

Response:

```json
{
  "id": 11,
  "answer": "The festival sill start at 12",
  "created_at": "2023-03-09T07:57:17.223Z",
  "updated_at": "2023-03-09T07:57:17.223Z",
  "question_id": 1
}
```

### Updating an existing answer

Route: `PUT /questions/:questionId/answers/:answerId`

```json
{
  "answer": "The community sports center revovation was completed on Friday, the youth can now play basketball at the court."
}
```

Response:

```json
{
  "id": 5,
  "answer": "The community sports center revovation was completed on Friday, the youth can now play basketball at the court.",
  "created_at": "2023-03-08T21:04:32.590Z",
  "updated_at": "2023-03-09T07:00:06.782Z",
  "question_id": 10
}
```

### Deleting an existing answer

Route: `DELETE /questions/:questionId/answers/:answerId`

Response:

```json
{
  "msg": "Answer deleted succesfully"
}
```
