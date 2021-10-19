"""
# -*- coding: utf-8 -*-
@Time    : 10/16/2021 3:15 PM
@Author  : Harry Lee
@Email   : harrylee@nyu.edu
"""

import hashlib

from flask import json, request

import models.authentication
import config
import models.database
import models.user


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
    print(encrypt_password('dd010607'))
