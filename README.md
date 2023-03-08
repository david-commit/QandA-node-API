# QandA-node-API

### ERD
http://bit.ly/3Zs1BRA

# API Documentation
## Creating a user account
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
## Logging in to an existing user account
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

## Get all questions
Route: `GET /questions`

Response:
```json
[
  {
    "id": 1,
    "question": "How many students have adequate school textbooks?",
    "user_id": 8,
    "answers": []
  }
]
```