"""
# -*- coding: utf-8 -*-
@Time    : 11/4/2021 9:50 AM
@Author  : Harry Lee
@Email   : harrylee@nyu.edu
"""
from models.role import Role, RoleController


class Staff(Role):
    def __init__(self, user_id, username, bio, password_encrypted, avatar, email, birthday, gender):
        super().__init__(user_id, username, bio, password_encrypted, avatar, email, birthday, gender)
        self.role = 'staff'


class StaffController(RoleController):
    def __init__(self):
        super().__init__()
        self.role = 'staff'
        self.role_class = Staff
