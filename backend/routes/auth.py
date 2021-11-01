"""
# -*- coding: utf-8 -*-
@Time    : 10/31/2021 11:24 PM
@Author  : Harry Lee
@Email   : harrylee@nyu.edu
"""
from flask import Blueprint, session
from models import *

bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.route('/user/login', methods=['POST'])
def user_login():
    req = post_data()
    userController = UserController()
    if 'email' not in req or 'password' not in req:
        return api_fail("000", "Missing arguments")
    check = userController.check_password(req['email'], req['password'])
    if check == True:
        session['uid'] = True
        return api_success()
    if check == -1:
        return api_fail("001", "Email not registered")
    if check == False:
        return api_fail("002", "In correct password")


@bp.route('/user/logout', methods=['POST'])
@bp.route('/staff/logout', methods=['POST'])
@bp.route('/admin/logout', methods=['POST'])
@bp.route('/logout', methods=['POST'])
def logout():
    if 'logged_in' in session:
        del session['uid']
    return api_success()