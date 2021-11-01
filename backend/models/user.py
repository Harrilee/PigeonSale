"""
# -*- coding: utf-8 -*-
@Time    : 10/18/2021 11:22 PM
@Author  : Harry Lee
@Email   : harrylee@nyu.edu
"""
from flask import g
from . import encrypt_password
from . import db


class User:
    def __init__(self, user_id, username, bio, password_encrypted, avatar):
        self.user_id = user_id
        self.username = username
        self.bio = bio
        self.password_encrypted = password_encrypted
        self.avatar = avatar

    def update_to_db(self):
        """
        Update information to the sql
        :return: None
        """
        with db.db.cursor as cursor:
            cursor.execute("""
                SELECT COUNT(user_id)
                FROM user
                WHERE user_id = %s; 
            """, self.user_id)
        data = cursor.fetchone()
        print(data, 123)
        assert data in [0, 1]
        if data == 1:
            # If user_id exists
            with db.db.cursor as cursor:
                cursor.execute("""
                    UPDATE user
                    SET username=%s, bio=%s, password=%s, avatar=%s
                    WHERE user_id = %s; 
                """, (self.username, self.bio, self.password_encrypted, self.avatar, self.user_id))
                db.db.commit()
        elif data == 0:
            # If user_id does not exist
            with db.db.cursor as cursor:
                cursor.execute("""
                    INSERT INTO user(username, bio, password, avatar)
                    VALUES (%s, %s, %s, %s)
                """, (self.username, self.bio, self.password_encrypted, self.avatar))
                db.db.commit()

    def update_info(self, username=None, bio=None):
        """
        Update of normal attributes
        :return: None
        """
        self.username = username if username is not None else self.username
        self.bio = bio if bio is not None else self.bio
        self.update_to_db()

    def update_pwd(self, pwd):
        """
        Update user password
        :param pwd: the original password (not encrypted)
        :return:
        """
        pwd_encrypted = encrypt_password(pwd)
        self.password_encrypted = pwd_encrypted
        self.update_to_db()

    def check_password(self, pwd):
        """
        Check the
        :param pwd:
        :return:
        """
        return self.password_encrypted == encrypt_password(pwd)


class UserController:
    def check_password(self, email, pwd):
        with db.db.cursor() as cursor:
            cursor.execute("""
                SELECT * FROM user
                WHERE email=%s
            """, email)
            result = cursor.fetchone()
            if not result:
                return -1
        user = User(user_id=result['user_id'], username=result['username'], bio=result['bio'],
                    password_encrypted=result['password'], avatar=result['avatar'])
        return user.check_password(pwd)
