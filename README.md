# QandA-node-API

> By David Ondiege

## Tools:

- NodeJS
- ExpressJS
- Prisma (ORM)
- PostgreSQL
- JWT

ERD - http://bit.ly/3Zs1BRA

## Start Here🚀

### Prerequisites

- Have Node installed on your machine
- Have PostgreSQL installed (v15)
- Have a PostgreSQL user created with a password

1. Clone the repository to your machine depending on your environment

```
https: https://github.com/david-commit/QandA-node-API.git
or
SSH: git@github.com:david-commit/QandA-node-API.git
```

2.  Create a new database instance on your machine by following the the steps below:

    <ol type="i">
    <li>Open a new instance of terminal and run <strong>psql -U postgres</strong></li>
    <li>Create a new database by running <strong>CREATE DATABASE < database_name >;</strong>
    <br />
    Replace < database_name > with the name of your database
    </li>
    <li>Grant privilages on the database to the user. Run <strong>GRANT ALL PRIVILEGES ON DATABASE < database_name > to < your_user >;</strong></li>
    </ol>

Run `npm install` to install all required dependancies

Run `npm run dev` to start the server and make requests

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

Route: `POST /auth/register`

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

Route: `GET /questions/:question_id`

Response:

```json
{
  "id": 9, //:question_id
  "question": "When is today?",
  "created_at": "2023-03-08T16:46:58.323Z",
  "user_id": 8,
  "answers": []
}
```

### Deleting an existing question

Route: `DELETE /questions/:question_id`

Response:

```json
{
  "msg": "Question deleted succesfully"
}
```

### Posting an answer to a question

Route: `POST /questions/:question_id/answers`

```json
{
  "question_id": 1,
  "answer": "The community sports center revovation was completed on Friday, the youth can now play basketball at the cort."
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

Route: `PUT /questions/:question_id/answers/:answer_id`

```json
{
  "answer": "The community sports center revovation was completed on Friday, the youth can now play basketball at the cort."
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

Route: `DELETE /questions/:question_id/answers/:answer_id`

Response:

```json
{
  "msg": "Answer deleted succesfully"
}
```
