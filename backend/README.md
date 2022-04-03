# PigeonSale Backend

## Start the application
### Install dependencies
```
pip3 install -r requirements.txt
```
### Using Python
Launch `app.py` directly, or use `python3 app.py` in terminal.
### From terminal
You can directly start the backend using the following command

Bash/CMD/Powershell
```bash
cd backend
flask run
```
In addition, it is recommended to start the backend in development mode. 
In development mode, changes will immediately take effect.

Bash
```bash
export FLASK_ENV=development
flask run
```
CMD
```shell
set FLASK_ENV=development
flask run
```
Powershell
```shell
$env:FLASK_ENV = "development"
flask run
```

## Connect to APIs
One way of doing so is to open the browser, to test `GET` method, a starting example would be:

Go to `localhost:5000/hello?prefix=Ben`

Response:

```json
{
  "status": 1,
  "data": "Ben: Hello world!"
}
```

For testing purposes, it is recommended to use [postman](https://www.postman.com/) 
to test all APIs.

One testing example would be:

Request method `POST`:

```json
{
  "name": "Harry Lee",
  "email": "harrylee@nyu.edu"
}
```

Response:

```json
{
  "status": 1,
  "data": "The email address of Harry Lee is harrylee@nyu.edu"
}
```
