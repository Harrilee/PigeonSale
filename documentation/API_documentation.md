# API documentation

## ./auth
* `./auth/login`
  * Request: `POST`
  ```json
  {
     "email": "the email of the user",
     "password": "user's password"
  }
  ```
  * Response
    * Case: success
    ```json
       {
          "status": 1,
          "username": "the username",
          "avatar": "an url of user's profile photo"
       }
    ```
    * Case: fail
    ```json
       {
          "status": 0,
          "msg": "the reason why failed to login"
       }
    ```