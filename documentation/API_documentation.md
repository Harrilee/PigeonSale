# API documentation

## Response definition

### Response for valid request
  ```json
  {
     "status": 1,
     "data": "<requested data>"
  }
  ```
### Response for invalid request
  ```json
  {
     "status": 0,
     "code": "<error code",
     "msg": "<reason for invalid request>"
  }
  ```
## API list

### ./hello
For test purpose
* `./hello`
  * Method  `GET`
    * Request
      * `prefix`: String, the people who say 'Hello world!'
    * Response
      * `data`: String, the message to display
    * Error code
      * `000`: Missing arguments
  * Method `POST`
    * Request
      * `name`: String, username
      * `email`: String: email
    * Response
      * `data`: String, the message to display
    * Error code
      * `000`: Missing arguments

### ./auth
* `./auth/user/login`
  * Method `POST`
    * Request
      * `email`: String, the email user used to register
      * `password`: String, user's password
    * Response
      * `data`
        * `username`: String, username to display
        * `avatar`: String, url of the user's profile photo
    * Error code
      * `000`: Missing arguments
      * `001`: Incorrect password
      * `002`: Email not registered


