from flask import Flask, render_template
from flask_socketio import SocketIO, emit
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins='*')

@app.route('/')
def index():
    return render_template('index.html')


@socketio.event
def connect(msg):
    print('connect ', msg)

@socketio.event
def my_other_event(msg):
    print('my_other_event ', msg)
    emit("event2", "kakaakk")
if __name__ == '__main__':
    socketio.run(app)