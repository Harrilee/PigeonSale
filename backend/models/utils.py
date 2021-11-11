"""
# -*- coding: utf-8 -*-
@Time    : 11/1/2021 8:04 AM
@Author  : Harry Lee
@Email   : harrylee@nyu.edu
"""
import hashlib
import sys
import datetime

sys.path.append("..")
import config
from flask import json, request, session


def post_data():
    """
    Get all data in the POST body
    :return: a dictionary containing post body information
    """
    return json.loads(request.data.decode())


def get_data():
    """
    Get all data in the GET args
    :return: a dictionary containing GET arguments
    """
    return request.args


def api_success(data=''):
    """
    Parse data and success message
    :param data: optional, if there's data to get back
    :return: A string in the format of json, with data and status
    """
    return json.jsonify({
        "status": 1,
        "data": data
    })


def api_fail(code, msg):
    """
    Parse data and fail message
    :param code: error code
    :param msg: why it fails
    :return: A string in the format of json
    """
    return json.jsonify({
        "status": 0,
        "code": code,
        "msg": msg
    })


def encrypt_password(password):
    """
    encrypt user's password in MD5 with salt
    :param password: the original password user sent
    :return:
    """
    password = password + config.PWD_SALT
    return hashlib.md5(bytes(password, encoding='utf-8')).hexdigest()


def check_login_user(func):
    def wrapper_user(*args):
        if 'uid' in session and session['role'] == 'user':
            return func(*args)
        return api_fail('009', 'check_login: not logged in or logged in as a different role')

    wrapper_user.__name__ = func.__name__
    return wrapper_user


def check_login_staff(func):
    def wrapper_staff(*args):
        if 'uid' in session and session['role'] == 'staff':
            return func(*args)
        return api_fail('009', 'check_login: not logged in or logged in as a different role')

    wrapper_staff.__name__ = func.__name__
    return wrapper_staff


def check_login_admin(func):
    def wrapper_admin(*args):
        if session['role'] == 'admin':
            return func(*args)
        return api_fail('009', 'check_login: not logged in or logged in as a different role')

    wrapper_admin.__name__ = func.__name__
    return wrapper_admin

def get_uid():
    """
    :return: If logged in, uid, else -1
    """
    if 'uid' in session:
        uid = session['uid']
    else:
        uid = -1
    return int(uid)

def check_date_format(string):
    try:
        date = string.split('-')
        datetime.datetime(year=int(date[0]), month=int(date[1]), day=int(date[2]))
        return True
    except:
        return False


if __name__ == '__main__':
    print(encrypt_password('pigeon'))
