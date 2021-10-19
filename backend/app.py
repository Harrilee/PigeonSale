"""
# -*- coding: utf-8 -*-
@Time    : 10/16/2021 1:53 PM
@Author  : Harry Lee
@Email   : harrylee@nyu.edu
"""
import os

from flask import Flask, g
from flask_cors import CORS
from . import config


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    CORS(app, resources=r'/*', supports_credentials=True)
    app.config.from_mapping(
        SECRET_KEY=config.SECRET_KEY,
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
    g.db = models.database
    routes.init_app(app)

    return app
