"""
# -*- coding: utf-8 -*-
@Time    : 10/18/2021 11:22 PM
@Author  : Harry Lee
@Email   : harrylee@nyu.edu
"""


class User:
    def __init__(self, user_id, username, bio, password_encrypted, avatar):
        self.user_id = user_id
        self.username = username
        self.bio = bio
        self.password_encrypted = password_encrypted
        self.avatar = avatar

    def update_DB(self):
        """
        Update information to the sql
        :return: None
        """
        pass

    def update_bio(self):
        pass