"""
# -*- coding: utf-8 -*-
@Time    : 11/1/2021 8:49 AM
@Author  : Harry Lee
@Email   : harrylee@nyu.edu
"""
from flask import Blueprint, session
from models import *

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
    if 'birthday' not in req:
        req['birthday'] = None
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
