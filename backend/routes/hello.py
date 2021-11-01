"""
# -*- coding: utf-8 -*-
@Time    : 10/16/2021 2:20 PM
@Author  : Harry Lee
@Email   : harrylee@nyu.edu
"""

from flask import Blueprint
from models import *

bp = Blueprint('hello', __name__, url_prefix='/hello')


@bp.route('', methods=['GET', 'POST'])
def hello_world():
    req = get_data()
    if request.method == 'GET':
        if 'prefix' in req:
            return api_success("{}: Hello world!".format(req['prefix']))
        return api_fail("000", "Error. Please include 'prefix' argument in your GET request.")
    if request.method == 'POST':
        req = post_data()
        print(req)
        if 'name' in req and 'email' in req:
            return api_success("The email address of {} is {}".format(req['name'], req['email']))
        else: 
            return api_fail("000", "Cannot find argument 'name' or 'email' within the request body.")