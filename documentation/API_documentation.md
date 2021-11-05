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
     "code": "<error code>",
     "msg": "<reason for invalid request>"
  }
  ```
## API list

### ./hello
For test purpose
* `./hello`
  * Method  `GET`
    * Request
      * `prefix`*: String, the people who say 'Hello world!'
    * Response
      * `data`: String, the message to display
    * Error code
      * `000`: Missing arguments
  * Method `POST`
    * Request
      * `name`*: String, username
      * `email`*: String: email
    * Response
      * `data`: String, the message to display
    * Error code
      * `000`: Missing arguments

### ./auth
* `./auth/user/login`: user log in
  * Method `POST`
    * Request
      * `email`*: String, the email user used to register
      * `password`*: String, user's password
    * Response
      * `data`
        * `username`*: String, username to display
        * `avatar`: String, url of the user's profile photo
    * Error code
      * `000`: Missing arguments
      * `001`: Incorrect password
      * `002`: Email not registered

* `./auth/user/logout`: user log out
  * Method `POST`
    * Request: None
    * Response
      * `data`: Empty string

* `./auth/staff/login`: staff log in
  * Method `POST`
    * Request
      * `email`*: String, the email staff used to register
      * `password`*: String, user's password
    * Response
      * `data`
        * `username`: String, username to display
        * `avatar`: String, url of the staff's profile photo
    * Error code
      * `000`: Missing arguments
      * `001`: Incorrect password
      * `002`: Email not registered

* `./auth/staff/logout`: staff log out
  * Method `POST`
    * Request: None
    * Response
      * `data`: Empty string

* `./auth/admin/login`: admin log in
  * Method `POST`
    * Request
      * `password`*: String, user's password
    * Response
      * `data`: Empty string
    * Error code
      * `000`: Missing arguments
      * `001`: Incorrect password

* `./auth/admin/logout`: admin log out
  * Method `POST`
    * Request: None
    * Response
      * `data`: Empty string
* `./auth/code`
  * Method: `POST`: generate a verification code for staff/user
    * Request: 
      * `email`: the email to send to
    * Response
      * `data`: Empty string
    * Error code:
      * `000`: Missing arguments
### ./account
* `./account/user`
  * Method `POST`: add new user
    * Request
      * `username`*: String, nickname preferred by user
      * `email`*: String, email address, unique
      * `birthday`: String, date of birth, format 'YYYY-MM-DD'
      * `gender`: String, must in 'Male', 'Female', 'Other'
      * `bio`: String, an introduction of user 
      * `avatar`: File, an img of user's avatar (Can be ignored in cycle 1)
      * `password*`: String, user's password
    * Response
      * `data`: Empty string
    * Error code
      * `000`: Missing arguments
      * `003`: Email already registered
      * `004`: Birthday format incorrect
      * `005`: Gender not valid
      * `006`: Avatar file not valid
      * `007`: Password not valid
  * Method `PUT`: update user info
    * Request
      * `username`: String, nickname preferred by user
      * `email`: String, email address, unique
      * `birthday`: String, date of birth, format 'YYYY-MM-DD'
      * `gender`: String, must in 'Male', 'Female', 'Other'
      * `bio`: String, an introduction of user 
      * `avatar`: File, an img of user's avatar (Can be ignored in cycle 1)
      * `password`: String, user's password
      * `verification_code`: String, necessary if requests to change password
    * Response
      * `data`: Empty string
    * Error code
      * `000`: Missing arguments
      * `003`: Email already registered
      * `004`: Birthday format incorrect
      * `005`: Gender not valid
      * `006`: Avatar file not valid
      * `007`: Password not valid
      * `009`: Not logged in or not qualified
      * `010`: verification code not correct
  * Method `GET`: get one user info
    * Request: has at least 1 argument
      * `email`: email of the user
      * `user_id`: user_id
    * Response
      * `data`
        * `username`: String, nickname preferred by user
        * `email`: String, email address, unique
        * `birthday`: String, date of birth, format 'YYYY-MM-DD'
        * `gender`: String, must in 'Male', 'Female', 'Other'
        * `bio`: String, an introduction of user 
        * `avatar`: File, an img of user's avatar (Can be ignored in cycle 1)
        * `user_id`: the id of the user
    * Error code
      * `000` Missing arguments
      * `008` No such user

* `./account/staff`: add new staff
  * Method `POST`
    * Request
      * `username`*: String, nickname preferred by user
      * `email`*: String, email address, unique
      * `birthday`: String, date of birth, format 'YYYY-MM-DD'
      * `gender`: String, must in 'Male', 'Female', 'Other'
      * `bio`: String, an introduction of user 
      * `avatar`: File, an img of user's avatar (Can be ignored in cycle 1)
      * `password`*: String, user's password
    * Response
      * `data`: Empty string
    * Error code
      * `000`: Missing arguments
      * `003`: Email already registered
      * `004`: Birthday format incorrect
      * `005`: Gender not valid
      * `006`: Avatar file not valid
      * `007`: Password not valid
  * Method `PUT`: update staff info
    * Request
      * `username`: String, nickname preferred by user
      * `email`: String, email address, unique
      * `birthday`: String, date of birth, format 'YYYY-MM-DD'
      * `gender`: String, must in 'Male', 'Female', 'Other'
      * `bio`: String, an introduction of user 
      * `avatar`: File, an img of user's avatar (Can be ignored in cycle 1)
      * `password`: String, user's password
      * `verification_code`: String, necessary if requests to change password
    * Response
      * `data`: Empty string
    * Error code
      * `000`: Missing arguments
      * `003`: Email already registered
      * `004`: Birthday format incorrect
      * `005`: Gender not valid
      * `006`: Avatar file not valid
      * `007`: Password not valid 
      * `009`: Not logged in or not qualified
      * `010`: verification code not correct
  * Method `GET`: get one staff info
    * Request: has at least 1 argument
      * `email`: email of the staff
      * `staff_id`: staff_id
    * Response
      * `data`
        * `username`: String, nickname preferred by user
        * `email`: String, email address, unique
        * `birthday`: String, date of birth, format 'YYYY-MM-DD'
        * `gender`: String, must in 'Male', 'Female', 'Other'
        * `bio`: String, an introduction of user 
        * `avatar`: File, an img of user's avatar (Can be ignored in cycle 1)
        * `staff_id`: the id of the staff
    * Error code
      * `000` Missing arguments
      * `008` No such staff