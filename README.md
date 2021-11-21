# PigeonSale
Software engineering course project. Secondhand trading system.

## Environment
The following services are required to install on your machine:
* MySQL (XAMPP is recommended)
* [Redis](https://redis.io/download)
* Python 3
  * flask
  * redis
  * pymysql
* [React](https://reactjs.org/docs/getting-started.html)
* [MUI](https://mui.com/)
* [Sass](https://sass-lang.com/)


*Note: to simplify collaboration process, MySQL and Redis are already deployed on Harry's Tencent Cloud 
server. When backend starts, it will automatically connect to the cloud.
For more information, see [config.py](./backend/config.py) [Although it's not safe to do so].
## Get Started
* Admin password: `pigeon`


## Documentation
* [API documentation](./documentation/API_documentation.md): list of APIs
  * [Backend documentation](./backend/README.md): notes on how to establish backend server
  * [Frontend documentation](./frontend/README.md) : notes on how to establish frontend and general maintenance
* Contribution log: working record of each group member
  * [Cycle 1](./documentation/contribution_log/cycle_1.md)
  * [Cycle 2](./documentation/contribution_log/cycle_2.md)
  * [Cycle 3](./documentation/contribution_log/cycle_3.md)
  * [Cycle 4](./documentation/contribution_log/cycle_4.md)
  * [Post Cycle 4](./documentation/contribution_log/cycle_5.md)
* [Project highlights](./documentation/highlights.md): a record of some excellent parts in this project
## Release History
None

## Iteration Goals

### Cycle 1
Oct 17 to Oct 30.
* Base code
  * Establishing backend code base
  * Establishing frontend code base
  * Create database and sample data in the database
* Authentication class
  * Login page
  * Password reset page
  * Backend support
* User class
  * User bio page
  * Backend support

### Cycle 2
Oct 31 to Nov 13.
* Post class
    * Show all the posts
    * Show single post
    * Query page for posts
* Address
  * Add address page 

### Cycle 3
Nov 14 to Nov 27.
* Deal
  * Deal confirmation page
* Image class
  * Modify the original text editor to support image
* Staff
  * Modify the original user pages to support staff actions
* User order page
    * My orders
    * Bought
    * Sell
### Cycle 4
Nov 28 to Dec 11.
* Chat
  * Establish web socket
  * Start chat at
    * Post
    * Search user
    * ...
* Rate
  * Page for rate after deal
* Admin
  * Page to manage staffs

