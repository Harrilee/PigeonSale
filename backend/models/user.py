"""
# -*- coding: utf-8 -*-
@Time    : 10/18/2021 11:22 PM
@Author  : Harry Lee
@Email   : harrylee@nyu.edu
"""
from models.role import Role, RoleController


class User(Role):
    def __init__(self, user_id, username, bio, password_encrypted, avatar, email, birthday, gender):
        super().__init__(user_id, username, bio, password_encrypted, avatar, email, birthday, gender)
        self.role = 'user'


class UserController(RoleController):
    def __init__(self):
        super().__init__()
        self.role = 'user'
        self.role_class=User
