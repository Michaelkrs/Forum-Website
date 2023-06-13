# API DOCUMENTATION

**_ LIST ENDPOINTS _**

- POST /register
- POST /login
- POST /login/google-login
- GET /
- POST /post
- GET /post/:id
- PUT /post/:id
- DELETE /post/:id
- GET /spotify
- GET /categories
- POST /comments
- PUT /comments/:id
- DELETE /comments/:id

> ## POST /register

- Registers a user into the database

_Response (201 - CREATED)_

```json
  {
    "username": string,
    "email": string,
    "password": string
  }
```

_Response (400 - BAD REQUEST)_

```json
  {
    "error": "Username is required"
  }
  OR
  {
    "error": "Username must be unique"
  }
  OR
  {
    "error": "Email is required"
  }
  OR
  {
    "error": "Email must be unique"
  }
  OR
  {
    "error": "Please enter a valid email address"
  }
  OR
  {
    "error": "Password is required"
  }
```

_Response (500 - Internal Server Error)_

```json
{
  "error": "Internal Server Error"
}
```

> ## POST /login

- Logs in a user to access the website

_Response (200 - OK)_

```json
  {
    "access_token": string,
    "id": integer,
    "email": string
  }
```

_Response (401 - BAD REQUEST)_

```json
{
  "error": "Username/Email or Password invalid"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "error": "Internal Server Error"
}
```

> ## POST /google-login

- Logs in a user to access the website using Google Account

_Response (200 - OK)_

```json
  {
    "access_token": string,
    "id": integer,
    "email": string
  }
```

_Response (401 - BAD REQUEST)_

```json
{
  "statusCode": 401,
  "error": "Username/Email or Password invalid"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "statusCode": 500,
  "error": "Internal Server Error"
}
```

> ## GET /posts

_Description_

- Get all posts data

_Response (200 - OK)_

```json
  {
    "statusCode": 200,
    "data": [
      {
        "id": Integer,
        "title": String,
        "content": String,
        "imgUrl": String,
        "categoryId": Integer,
        "authorId": Integer,
        "createdAt": Date,
        "updatedAt": Date,
        "User": Array,
        "Category": Array
      },
      ...
    ]
  }
```

_Response (401 - Unauthorized)_

```json
{
  "statusCode": 401,
  "error": "Username/Email or Password invalid"
}
```

_Response (404 - Page Not Found)_

```json
{
  "statusCode": 404,
  "error": "Page Not Found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "statusCode": 500,
  "error": "Internal Server Error"
}
```

> ## POST /posts

_Description_

- Create a new post data

_Response (201 - Created)_

```json
  {
    "statusCode": 201,
    "message": "Post Created Successfully",
    "data": {
        "id": Integer,
        "title": String,
        "content": String,
        "imgUrl": String,
        "categoryId": Integer,
        "authorId": Integer,
        "createdAt": Date,
        "updatedAt": Date
      }
  }
```

_Response (400 - Bad Request)_

```json
{
  "statusCode": 400,
  "error": "Title is required"
}
OR
{
  "statusCode": 400,
  "error": "Content is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "statusCode": 401,
  "error": "Username/Email or Password invalid"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "statusCode": 500,
  "error": "Internal Server Error"
}
```

> ## GET /posts/:id

_Description_

- Get post data by id

_Response (200 - OK)_

```json
  {
    "statusCode": 200,
    "data": {
        "id": Integer,
        "title": String,
        "content": String,
        "imgUrl": String,
        "categoryId": Integer,
        "authorId": Integer,
        "createdAt": Date,
        "updatedAt": Date
      }
  }
```

_Response (404 - Page Not Found)_

```json
{
  "statusCode": 404,
  "error": "Page Not Found"
}
```

_Response (401 - Unauthorized)_

```json
{
  "statusCode": 401,
  "error": "Username/Email or Password invalid"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "statusCode": 500,
  "error": "Internal Server Error"
}
```

> ## DELETE /posts/:id

_Description_

- Delete post data by id

_Response (200 - OK)_

```json
{
  "statusCode": 200,
  "message": `Post title with id:id has been deleted`
}
```

_Response (401 - Unauthorized)_

```json
{
  "statusCode": 401,
  "error": "Username/Email or Password invalid"
}
```

_Response (403 - Forbidden)_

```json
{
  "statusCode": 403,
  "error": "Unauthorized Access"
}
```

_Response (404 - Page Not Found)_

```json
{
  "statusCode": 404,
  "error": "Page Not Found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "statusCode": 500,
  "error": "Internal Server Error"
}
```

> ## GET /categories

_Description_

- Get all categories data

_Response (200 - OK)_

```json
{
  "statusCode": 200,
  "message": "Categories Read Successfully",
  "data": {
    "id": integer,
    "name": string,
    "createdAt": date,
    "updatedAt": date
    }
}
```

_Response (401 - Unauthorized)_

```json
{
  "statusCode": 401,
  "error": "Username/Email or Password invalid"
}
```

_Response (404 - Page Not Found)_

```json
{
  "statusCode": 404,
  "error": "Page Not Found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "statusCode": 500,
  "error": "Internal Server Error"
}
```
