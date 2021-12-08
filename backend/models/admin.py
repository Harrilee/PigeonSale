"""
# -*- coding: utf-8 -*-
@Time    : 11/6/2021 1:59 AM
@Author  : Harry Lee
@Email   : harrylee@nyu.edu
"""
from . import encrypt_password
from . import db


class AdminController():
    def check_password(self, pwd):
        """
        Check password for admin login
        :param pwd:
        :return: correct pwd: True; else False
        """
        with db.db.cursor() as cursor:
            cursor.execute("""
                SELECT password
                FROM admin
            """)
        password_encrypted = cursor.fetchone()['password']
        return password_encrypted == encrypt_password(pwd)