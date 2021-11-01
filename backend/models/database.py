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
            self.db = pymysql.connect(
                host=config.DB_HOST,
                port=config.DB_PORT,
                user=config.DB_USER,
                database=config.DB_NAME,
                password=config.DB_PASSWORD,
                cursorclass=pymysql.cursors.DictCursor
            )

    def reset_database(self):
        """
        Create sql using schema.sql
        :return: None
        """
        print("Creating sql...")
        with self.db.cursor() as cursor:
            cursor.execute("DROP DATABASE IF EXISTS {};".format(config.DB_NAME))
            cursor.execute("CREATE DATABASE IF NOT EXISTS {}".format(config.DB_NAME))
            cursor.execute("USE {}".format(config.DB_NAME))
            with open(config.DB_SCHEMA) as f:
                sql = f.readlines()
                for line in sql:
                    if line == "":
                        continue
                    cursor.execute(line)
            cursor.commit()
        print("Database initialized")


if __name__ == '__main__':
    database = Database()
