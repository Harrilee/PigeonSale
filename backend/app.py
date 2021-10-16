"""
# -*- coding: utf-8 -*-
@Time    : 10/16/2021 1:53 PM
@Author  : Harry Lee
@Email   : harrylee@nyu.edu
"""
import os

from flask import Flask
from flask_cors import CORS


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    CORS(app, resources=r'/*', supports_credentials=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
    )

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    import routes, models
    # db.init_app(app)
    routes.init_app(app)

    return app
