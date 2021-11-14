"""
# -*- coding: utf-8 -*-
@Time    : 10/16/2021 9:20 PM
@Author  : Harry Lee
@Email   : harrylee@nyu.edu
"""

# MySQL database configuration
DB_HOST = '42.192.232.121'
DB_PORT = 3306
DB_PASSWORD = 'LyGmETdLJ6zDrMMD'
DB_USER = 'pigeon'
DB_NAME = 'pigeon_sale'
DB_SCHEMA = './models/sql/schema.sql'
DB_INSERT = './models/sql/insert.sql'

# Redis database configuration
REDIS_HOST = '42.192.232.121'
REDIS_PWD = 'aicgasuicaskcjb'
REDIS_PORT = 6379
REDIS_DB = 0

# Email sender configuration
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

# Flask configuration
SECRET_KEY = '20210818SZ'

# Database password encryption
PWD_SALT = '202110181145'

# How many posts to show for on index page
RECENT_POSTS = 25

