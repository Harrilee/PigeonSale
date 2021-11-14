"""
# -*- coding: utf-8 -*-
@Time    : 11/6/2021 12:51 AM
@Author  : Harry Lee
@Email   : harrylee@nyu.edu
"""
"""
Role class is the parent class of user and staff
"""
from flask import session
from . import encrypt_password
from . import db


class Role:
    def __init__(self, user_id, username, bio, password_encrypted, avatar, email, birthday, gender):
        self.user_id = user_id
        self.username = username
        self.bio = bio
        self.password_encrypted = password_encrypted
        self.avatar = avatar
        self.email = email
        self.birthday = birthday
        self.gender = gender
        self.role = None

    def update_to_db(self):
        """
        Update information to the sql
        :return: None
        """
        with db.db.cursor() as cursor:
            cursor.execute("""
                SELECT COUNT(user_id) AS COUNT
                FROM {}
                WHERE user_id = %s; 
            """.format(self.role), [self.user_id])
        data = cursor.fetchone()
        assert data['COUNT'] in [0, 1]
        if data['COUNT'] == 1:
            # If user_id exists
            with db.db.cursor() as cursor:
                cursor.execute("""
                    UPDATE {}
                    SET username=%s, bio=%s, password=%s, avatar=%s, email=%s, birthday=%s, gender=%s
                    WHERE user_id = %s; 
                """.format(self.role), (
                    self.username, self.bio, self.password_encrypted, self.avatar, self.email, self.birthday,
                    self.gender,
                    self.user_id))
                db.db.commit()
        elif data['COUNT'] == 0:
            # If user_id does not exist
            with db.db.cursor() as cursor:
                cursor.execute("""
                    INSERT INTO {} (username, bio, password, avatar, email, birthday, gender)
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                """.format(self.role), (
                    self.username, self.bio, self.password_encrypted, self.avatar, self.email, self.birthday,
                    self.gender))
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
        output = {}
        output['username'] = self.username
        output['bio'] = self.bio
        output['avatar'] = self.avatar
        output['user_id'] = self.user_id
        output['birthday'] = self.birthday
        output['gender'] = "Male" if self.gender == 1 else "Female" if self.gender == 0 else "Other"
        return output


class RoleController:
    def __init__(self):
        self.role_class = None
        self.role = ''

    def get_user_by_email(self, email):
        with db.db.cursor() as cursor:
            cursor.execute("""
                SELECT * FROM {}
                WHERE email=%s
            """.format(self.role), email)
            result = cursor.fetchone()
        if not result:
            return -1
        if result['birthday']:
            result['birthday'] = result['birthday'].strftime("%Y-%m-%d")
        user = self.role_class(user_id=result['user_id'], username=result['username'], bio=result['bio'],
                               password_encrypted=result['password'], avatar=result['avatar'], email=result['email'],
                               birthday=result['birthday'], gender=result['gender'])
        return user

    def get_user_by_uid(self, uid):
        with db.db.cursor() as cursor:
            cursor.execute("""
                SELECT * FROM {}
                WHERE user_id=%s
            """.format(self.role), (uid))
            result = cursor.fetchone()
        if not result:
            return -1
        if result['birthday']:
            result['birthday'] = result['birthday'].strftime("%Y-%m-%d")
        user = self.role_class(user_id=result['user_id'], username=result['username'], bio=result['bio'],
                               password_encrypted=result['password'], avatar=result['avatar'], email=result['email'],
                               birthday=result['birthday'], gender=result['gender'])
        return user

    def check_password(self, email, pwd):
        """
        Verify if the password user sent is the same as what we stored
        :param email:
        :param pwd:
        :return:
        """
        user = self.get_user_by_email(email)
        if user == -1:
            return -1, -1
        return user.check_password(pwd), user.user_id

    def add_new_user(self, username, password, email, bio="", avatar='', birthday=None, gender=None):
        if self.get_user_by_email(email) != -1:
            return 3  # Email exists
        user = self.role_class(username=username, bio=bio, email=email, birthday=birthday, gender=gender,
                               password_encrypted=encrypt_password(password), avatar=avatar, user_id=None)
        user.update_to_db()
        return True

    def update_user(self, username, password, email, bio="", avatar='', birthday=None, gender=None):
        user = self.get_user_by_uid(session['uid'])
        user.update_info(username=username, bio=bio, avatar=avatar, birthday=birthday, gender=gender, email=email)
        if password is not None:
            user.update_pwd(pwd=password)
        return True
