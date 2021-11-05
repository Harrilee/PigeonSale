"""
# -*- coding: utf-8 -*-
@Time    : 11/4/2021 10:26 PM
@Author  : Harry Lee
@Email   : harrylee@nyu.edu
"""
import redis
import config

import smtplib
import random
import time
from email.mime.text import MIMEText
from email.utils import formataddr


class Verification:
    def __init__(self):
        self.redis = redis.Redis(host=config.REDIS_HOST, port=config.REDIS_PORT, db=config.REDIS_DB,
                                 password=config.REDIS_PWD)

    def send_email(self, to, subject, html):
        ret = True
        try:
            msg = MIMEText(html, 'html', 'utf-8')
            msg['From'] = formataddr(("Pigeon Sale", config.SENDER_ADDRESS))
            msg['To'] = formataddr(("User", to))  # 括号里的对应收件人邮箱昵称、收件人邮箱账号
            msg['Subject'] = subject  # 邮件的主题，也可以说是标题

            server = smtplib.SMTP_SSL(config.SENDER_SERVER, 465)  # 发件人邮箱中的SMTP服务器，端口是25
            server.login(config.SENDER_ADDRESS, config.SENDER_PASSWORD)  # 括号中对应的是发件人邮箱账号、邮箱密码
            server.sendmail(config.SENDER_ADDRESS, [to, ], msg.as_string())  # 括号中对应的是发件人邮箱账号、收件人邮箱账号、发送邮件
            server.quit()  # 关闭连接
        except Exception as e:  # 如果 try 中的语句没有执行，则会执行下面的 ret=False
            ret = False
            print(e)
        return ret

    def send_code(self, to, purpose="verify your email", subject=config.SENDER_DEFAULT_SUBJECT):
        time_str = time.strftime("%m-%d %H:%M:%S", time.localtime(time.time()))
        code = str(random.randint(0, 999999)).zfill(6)
        self.redis.set(to, code, ex=300)
        msg = config.SENDER_MESSAGE.format(time_str, purpose, code)
        self.send_email(to, subject, msg)
        return True

    def verify_code(self, email, code):
        stored_code = self.redis.get(email)
        if stored_code is None or stored_code.decode() != code:
            return False
        self.redis.delete(email)
        return True


if __name__ == '__main__':
    v = Verification()
    v.send_code('hl3794@nyu.edu')
