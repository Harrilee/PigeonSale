"""
# -*- coding: utf-8 -*-
@Time    : 10/18/2021 11:22 PM
@Author  : Harry Lee
@Email   : harrylee@nyu.edu
"""
from flask import session
from . import encrypt_password
from . import db


class User:
    def __init__(self, user_id, username, bio, password_encrypted, avatar, email, birthday, gender):
        self.user_id = user_id
        self.username = username
        self.bio = bio
        self.password_encrypted = password_encrypted
        self.avatar = avatar
        self.email = email
        self.birthday = birthday
        self.gender = gender

    def update_to_db(self):
        """
        Update information to the sql
        :return: None
        """
        with db.db.cursor() as cursor:
            cursor.execute("""
                SELECT COUNT(user_id) AS COUNT
                FROM user
                WHERE user_id = %s; 
            """, [self.user_id])
        data = cursor.fetchone()
        assert data['COUNT'] in [0, 1]
        if data['COUNT'] == 1:
            # If user_id exists
            with db.db.cursor() as cursor:
                cursor.execute("""
                    UPDATE user
                    SET username=%s, bio=%s, password=%s, avatar=%s, email=%s, birthday=%s, gender=%s
                    WHERE user_id = %s; 
                """, (
                self.username, self.bio, self.password_encrypted, self.avatar, self.email, self.birthday, self.gender,
                self.user_id))
                db.db.commit()
        elif data['COUNT'] == 0:
            # If user_id does not exist
            with db.db.cursor() as cursor:
                cursor.execute("""
                    INSERT INTO user(username, bio, password, avatar, email, birthday, gender)
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                """, (
                self.username, self.bio, self.password_encrypted, self.avatar, self.email, self.birthday, self.gender))
                db.db.commit()
        else:
            raise Exception("No operation done to database")

    def update_info(self, username=None, bio=None, avatar=None, birthday=None, gender=None, email=None):
        """
        Update of normal attributes
        :return: None
        """
        self.username = username if username is not None else self.username
        self.bio = bio if bio is not None else self.bio
        self.avatar = avatar if avatar is not None else self.avatar
        self.birthday = birthday if birthday is not None else self.birthday
        self.gender = gender if gender is not None else self.gender
        self.email = email if email is not None else self.gender
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

    def get_info(self):
        output= {}
        output['username'] = self.username
        output['bio'] = self.bio
        output['avatar'] = self.avatar
        output['user_id'] = self.user_id
        output['birthday'] = self.birthday
        output['gender'] = "Male" if self.gender==1 else "Female" if self.gender==0 else "Other"
        return output


class UserController:
    def get_user_by_email(self, email):
        with db.db.cursor() as cursor:
            cursor.execute("""
                SELECT * FROM user
                WHERE email=%s
            """, email)
            result = cursor.fetchone()
        if not result:
            return -1
        user = User(user_id=result['user_id'], username=result['username'], bio=result['bio'],
                    password_encrypted=result['password'], avatar=result['avatar'], email=result['email'],
                    birthday=result['birthday'], gender=result['gender'])
        return user

    def get_user_by_uid(self, uid):
        with db.db.cursor() as cursor:
            cursor.execute("""
                SELECT * FROM user
                WHERE user_id=%s
            """, uid)
            result = cursor.fetchone()
        if not result:
            return -1
        user = User(user_id=result['user_id'], username=result['username'], bio=result['bio'],
                    password_encrypted=result['password'], avatar=result['avatar'], email=result['email'],
                    birthday=result['birthday'], gender=result['gender'])
        return user

    def check_password(self, email, pwd):
        user = self.get_user_by_email(email)
        return user.check_password(pwd), user.user_id

    def add_new_user(self, username, password, email, bio="", avatar='', birthday=None, gender=None):
        if not self.get_user_by_email(email):
            return 3  # Email exists
        user = User(username=username, bio=bio, email=email, birthday=birthday, gender=gender,
                    password_encrypted=encrypt_password(password), avatar=avatar, user_id=None)
        user.update_to_db()
        return True

    def update_user(self, username, password, email, bio="", avatar='', birthday=None, gender=None):
        user = self.get_user_by_uid(session['uid'])
        user.update_info(username=username, bio=bio, avatar=avatar, birthday=birthday, gender=gender, email=email)
        user.update_pwd(pwd=password)
        return True
