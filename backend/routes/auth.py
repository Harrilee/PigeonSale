"""
# -*- coding: utf-8 -*-
@Time    : 10/31/2021 11:24 PM
@Author  : Harry Lee
@Email   : harrylee@nyu.edu
"""
from flask import Blueprint, session
from models import *

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/user/logout', methods=['POST'])
@bp.route('/staff/logout', methods=['POST'])
@bp.route('/admin/logout', methods=['POST'])
@bp.route('/logout', methods=['POST'])
def logout():
    del session['uid']
    del session['role']
    return api_success()

@bp.route('/user/login', methods=['POST'])
def user_login():
    req = post_data()
    userController = UserController()
    if 'email' not in req or 'password' not in req:
        return api_fail("000", "Missing arguments")
    check, uid = userController.check_password(req['email'], req['password'])
    if check == True:
        session['uid'] = uid
        session['role'] = 'user'
        return api_success()
    if check == -1:
        return api_fail("001", "Email not registered")
    if check == False:
        return api_fail("002", "In correct password")

@bp.route('/staff/login', methods=['POST'])
def staff_login():
    req = post_data()
    staffController = StaffController()
    if 'email' not in req or 'password' not in req:
        return api_fail("000", "Missing arguments")
    check, uid = staffController.check_password(req['email'], req['password'])
    if check == True:
        session['uid'] = uid
        session['role'] = 'staff'
        return api_success()
    if check == -1:
        return api_fail("001", "Email not registered")
    if check == False:
        return api_fail("002", "In correct password")

@bp.route('/admin/login', methods=['POST'])
def admin_login():
    req = post_data()
    adminController = AdminController()
    if 'password' not in req:
        return api_fail("000", "Missing arguments: password")
    if adminController.check_password(req['password']):
        session['uid'] = None
        session['role'] = 'admin'
        return api_success()
    return api_fail("002", "In correct password")


@bp.route('/code', methods=["POST"])
def get_code():
    req = post_data()
    if 'email' not in req:
        return api_fail('000', "Missing argument, email")
    verification.send_code(req['email'])
    return api_success()