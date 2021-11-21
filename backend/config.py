"""
# -*- coding: utf-8 -*-
@Time    : 10/16/2021 9:20 PM
@Author  : Harry Lee
@Email   : harrylee@nyu.edu
"""
import os

"""
----------------------------------------------------
✨✨✨✨✨ MySQL database configuration ✨✨✨✨✨ 
----------------------------------------------------
"""
DB_HOST = '42.192.232.121'
DB_PORT = 3306
DB_PASSWORD = 'LyGmETdLJ6zDrMMD'
DB_USER = 'pigeon'
DB_NAME = 'pigeon_sale'
DB_SCHEMA = './models/sql/schema.sql'
DB_INSERT = './models/sql/insert.sql'
PWD_SALT = '202110181145'  # Database password encryption

"""
----------------------------------------------------
✨✨✨✨✨ Redis database configuration ✨✨✨✨✨ 
----------------------------------------------------
"""
REDIS_HOST = '42.192.232.121'
REDIS_PWD = 'aicgasuicaskcjb'
REDIS_PORT = 6379
REDIS_DB = 0

"""
----------------------------------------------------
✨✨✨✨✨ Email sender configuration ✨✨✨✨✨ 
----------------------------------------------------
"""
SENDER_ADDRESS = "noreply@violeter.xyz"
SENDER_PASSWORD = "h2dG7od7jE75RyV2"
SENDER_SERVER = "smtp.exmail.qq.com"
SENDER_MESSAGE = """
<p>Dear PigeonSale user,</p>
<div style="margin-left:1em">
    <p>Greetings!</p>
    <p>You requested a verification code at {} to {} at Pigeon Sale. Your code is:</p>
    <p style="color:#1890ff; font-size: xx-large;"><strong>{}</strong></p>
    <p>Please make sure it is your own operation. The code is valid in 5 minutes.</p>
</div>
<p>Sincerely,<br>
Pigeon Sale Team</p>
"""
SENDER_DEFAULT_SUBJECT = 'Verification Code'

"""
----------------------------------------------------
✨✨✨✨✨ Flask configuration ✨✨✨✨✨ 
----------------------------------------------------
"""
FLASK_PORT = 5000
DEPLOY_ENVIRONMENT = 'http://localhost'
SECRET_KEY = '20210818SZ'
IMAGE_FOLDER = 'image'
IMAGE_STORAGE_PATH = os.path.join(os.curdir, IMAGE_FOLDER)
IMAGE_GET_PATH_BASE = "{}:{}/{}/".format(DEPLOY_ENVIRONMENT,FLASK_PORT,IMAGE_FOLDER)
ALLOWED_IMAGE_EXTENSIONS = ['jpg', 'png', 'gif', 'jpeg', 'jfif', 'pjp', 'pjpeg']

"""
----------------------------------------------------
✨✨✨✨✨ Project settings ✨✨✨✨✨ 
----------------------------------------------------
"""
RECENT_POSTS = 25  # How many posts to show for on index page
