"""
# -*- coding: utf-8 -*-
@Time    : 11/1/2021 8:04 AM
@Author  : Harry Lee
@Email   : harrylee@nyu.edu
"""
import hashlib
from backend import config
from flask import json, request

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

if __name__ == '__main__':
    print(encrypt_password('001'))
    print(encrypt_password('002'))
    print(encrypt_password('003'))
    print(encrypt_password('004'))