"""
# -*- coding: utf-8 -*-
@Time    : 10/16/2021 3:50 PM
@Author  : Harry Lee
@Email   : harrylee@nyu.edu
"""
import routes.hello


def init_app(app):
    app.register_blueprint(hello.bp)
