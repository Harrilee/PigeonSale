"""
# -*- coding: utf-8 -*-
@Time    : 11/1/2021 8:49 AM
@Author  : Harry Lee
@Email   : harrylee@nyu.edu
"""
from flask import Blueprint, session
from models import *
import datetime

bp = Blueprint('account', __name__, url_prefix='/account')


@bp.route('/user', methods=['GET'])
def get_user():
    req = get_data()
    userController = UserController()
    if 'email' in req:
        user = userController.get_user_by_email(req['email'])
    elif 'user_id' in req:
        user = userController.get_user_by_uid(req['user_id'])
    else:
        return api_fail('000', 'Missing arguments')
    if user == -1:
        return api_fail('008', 'No such user')
    return api_success(user.get_info())


@bp.route('/user', methods=['POST'])
def add_user():
    req = post_data()
    userController = UserController()
    if 'username' not in req:
        return api_fail('000', 'Missing arguments: username')
    if 'password' not in req:
        return api_fail('000', 'Missing arguments: password')
    if 'email' not in req:
        return api_fail('000', 'Missing arguments: email')
    if 'bio' not in req:
        req['bio'] = ''
    if 'avatar' not in req:
        req['avatar'] = ''
    if 'gender' not in req:
        req['gender'] = None
    else:
        if req['gender'] not in [0, 1, '0', '1']:
            return api_fail('005', "Invalid gender")
    if 'birthday' not in req:
        req['birthday'] = None
    else:
        if not check_date_format(req['birthday']):
            return api_fail('004',
                            'Birthday format incorrect, received: {}, expected: YYYY-MM-DD'.format(req['birthday']))

    result = userController.add_new_user(username=req['username'], password=req['password'],
                                         email=req['email'], bio=req['bio'], avatar=req['avatar'],
                                         birthday=req['birthday'], gender=req['gender'])
    if result == 3:
        return api_fail('003', "Email already exists")
    return api_success()


@bp.route('/user', methods=['PUT'])
@check_login
def modify_user():
    req = post_data()
    userController = UserController()
    if 'gender' in req and req['gender'] not in [0, 1, '0', '1']:
        return api_fail('005', "Invalid gender")
    if 'birthday' in req and not check_date_format(req['birthday']):
        return api_fail('004',
                        'Birthday format incorrect, received: {}, expected: YYYY-MM-DD'.format(req['birthday']))
    if 'password' in req:
        if 'verification_code' not in req:
            return api_fail('000', "Missing argument, verification_code")
        verification = Verification()
        userController = UserController()
        user = userController.get_user_by_uid(session['uid'])
        if not verification.verify_code(user.email, req['verification_code']):
            return api_fail('010', "Incorrect verification code.")
    userController.update_user(
        username=req['username'] if 'username' in req else None,
        bio=req['bio'] if 'bio' in req else None,
        avatar=req['avatar'] if 'avatar' in req else None,
        birthday=req['birthday'] if 'birthday' in req else None,
        gender=req['gender'] if 'gender' in req else None,
        email=req['email'] if 'email' in req else None,
        password=req['password'] if 'password' in req else None,
    )
    return api_success()
