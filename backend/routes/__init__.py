"""
# -*- coding: utf-8 -*-
@Time    : 10/16/2021 3:50 PM
@Author  : Harry Lee
@Email   : harrylee@nyu.edu
"""
import routes.hello
import routes.auth
import routes.account
import routes.posts
import routes.image
import routes.deal
import routes.admin

def init_app(app):
    app.register_blueprint(hello.bp)
    app.register_blueprint(auth.bp)
    app.register_blueprint(account.bp)
    app.register_blueprint(posts.bp)
    app.register_blueprint(image.bp)
    app.register_blueprint(deal.bp)
    app.register_blueprint(admin.bp)
