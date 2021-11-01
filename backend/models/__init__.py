"""
# -*- coding: utf-8 -*-
@Time    : 10/16/2021 3:15 PM
@Author  : Harry Lee
@Email   : harrylee@nyu.edu
"""



import models.authentication
from models.utils import *
from models.database import Database
db = Database()
from models.user import User, UserController

if __name__ == '__main__':
    print(encrypt_password('0607'))
