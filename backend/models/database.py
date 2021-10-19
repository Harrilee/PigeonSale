"""
# -*- coding: utf-8 -*-
@Time    : 10/16/2021 9:19 PM
@Author  : Harry Lee
@Email   : harrylee@nyu.edu
"""
import pymysql.cursors

import config


class Database:
    def __init__(self):
        self.db = pymysql.connect(
            host=config.DB_HOST,
            port=config.DB_PORT,
            user=config.DB_USER,
            password=config.DB_PASSWORD,
            cursorclass=pymysql.cursors.DictCursor
        )
        with self.db.cursor() as cursor:
            cursor.execute("""SHOW DATABASES;""")
            res = list(map(lambda x: x['Database'], cursor.fetchall()))
            if config.DB_NAME not in res:
                print("Database {} not found in mysql.".format(config.DB_NAME))
                self.reset_database()
                pass
            else:
                print("Database {} found in mysql.".format(config.DB_NAME))

    def reset_database(self):
        """
        Create sql using schema.sql
        :return: None
        """
        print("Creating sql...")
        with self.db.cursor() as cursor:
            cursor.execute("""
            DROP DATABASE IF EXISTS {};
            CREATE DATABASE IF NOT EXISTS {};
            USE {};
            """.format(config.DB_NAME, config.DB_NAME, config.DB_NAME))
            with open("sql/schema.sql") as f:
                sql = f.read()
                print(f)

        print("Database initialized")


if __name__ == '__main__':
    database = Database()
