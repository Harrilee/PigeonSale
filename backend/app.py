"""
# -*- coding: utf-8 -*-
@Time    : 10/16/2021 1:53 PM
@Author  : Harry Lee
@Email   : harrylee@nyu.edu
"""
import os

from flask import Flask, g, session, request
from flask_cors import CORS
import config
from flask_socketio import SocketIO, emit
from flask_session import Session


app = Flask(__name__, instance_relative_config=True)
CORS(app, resources=r'/*', supports_credentials=True)
app.config['SESSION_TYPE'] = 'filesystem'
app.config["SECRET_KEY"] = "SECRET"
Session(app)
app.config.from_mapping(
    SECRET_KEY=config.SECRET_KEY,
)
socketio = SocketIO(app, cors_allowed_origins='*', manage_session=False)

try:
    os.makedirs(app.instance_path)
except OSError:
    pass
try:
    os.makedirs(config.IMAGE_STORAGE_PATH)
except OSError:
    pass
import routes, models
with app.app_context():
    routes.init_app(app)

@socketio.event
def connect(sid):
    pass

@socketio.event
def my_other_event(msg):
    print('my_other_event ', msg)
    emit("event2", "kakaakk")
    session['abc'] = 'abc'
    print('session:', session)

@app.route("/", methods=['GET'])
def hello():
    print(session)
    return ""

if __name__ == '__main__':
    socketio.run(app)



