"""
@author: Harry Lee
@email: harrylee@nyu.edu
@date: 12/8/2021 10:07 PM
"""
from models import *
from . import db


class Message:
    def __init__(self, s_role, s_uid, r_role, r_uid, post_id):
        """
        :param s_role: sender role staff/user
        :param s_uid: sender uid
        :param r_role: receiver role
        :param r_uid: receiver uid
        :param post_id: post_id
        """
        self.post_id = post_id
        self.r_uid = r_uid
        self.r_role = r_role
        self.s_role = s_role
        self.s_uid = s_uid
        if self.post_id == 'null':
            self.post_id = None

    def parse_a_message(self, entry: dict, i=-1) -> dict:
        """
        parse a message to be json serializable, delete unnecessary data
        :param i: key
        :param entry: DB dict of a message entry
        :return: parsed dict
        """
        entry['send_time'] = entry['send_time'].strftime("%Y-%m-%d %H:%M:%S")
        del entry['post_id']
        del entry['receiver_role']
        del entry['sender_role']
        if i != -1:
            entry['key'] = i
            del entry['msg_id']
        entry['is_send'] = True if entry['sender_id'] == self.s_uid else False
        del entry['sender_id']
        del entry['receiver_id']
        return entry

    def get_msg_list(self):
        """
        :return: a message list correspond to sender and receiver
        """
        with db.db.cursor() as cursor:
            if self.post_id is None:
                cursor.execute("""
                   SELECT * 
                   FROM message
                   WHERE ((sender_id=%s AND receiver_id=%s) OR (sender_id=%s AND receiver_id=%s)) AND post_id is NULL
                   ORDER BY send_time ASC 
                       """, (self.s_uid, self.r_uid, self.r_uid, self.s_uid))
            else:
                cursor.execute("""
                   SELECT * 
                   FROM message
                   WHERE ((sender_id=%s AND receiver_id=%s) OR (sender_id=%s AND receiver_id=%s)) AND post_id=%s
                   ORDER BY send_time ASC 
                       """, (self.s_uid, self.r_uid, self.r_uid, self.s_uid, self.post_id))
            result = cursor.fetchall()
        if result is None:
            result = []
        messages = []
        for i, each in enumerate(result):
            messages.append(self.parse_a_message(each, i))
        return messages

    def post_message(self, msg):
        """
        sender post a message
        :param msg: message content
        :return:
        """
        with db.db.cursor() as cursor:
            cursor.execute("""
                       INSERT INTO message(sender_id, sender_role, receiver_id, receiver_role, post_id, send_time, msg) 
                       VALUES (%s, %s, %s, %s, %s, NOW(), %s)
                   """, (self.s_uid, self.s_role, self.r_uid, self.r_role, self.post_id, msg))
            db.db.commit()


class MessageController:
    def __init__(self, uid, role, s_role, s_uid, r_role, r_uid, post_id=None):
        """
        :param s_role: sender role staff/user
        :param s_uid: sender uid
        :param r_role: receiver role
        :param r_uid: receiver uid
        :param post_id: post_id
        """
        self.post_id = post_id
        self.r_uid = r_uid
        self.r_role = r_role
        self.s_role = s_role
        self.s_uid = s_uid
        self.uid = uid
        self.role = role
        assert self.uid == self.s_uid  # staff and admin cannot see any private messages

    def get_msg(self):
        """
        Get avatar for both user, and message info
        :return: dict
        """
        output = {}
        message = Message(self.s_role, self.s_uid, self.r_role, self.r_uid, self.post_id)
        output["message"] = message.get_msg_list()
        if self.s_role == 'user':
            user = UserController()
            output["sender"] = user.get_user_by_uid(self.s_uid).get_info()
        elif self.s_role == 'staff':
            user = StaffController()
            output["sender"] = user.get_user_by_uid(self.s_uid).get_info()
        else:
            output["sender"] = None
        output["sender_role"] = self.s_role
        if self.r_role == 'user':
            user = UserController()
            output["receiver"] = user.get_user_by_uid(self.r_uid).get_info()
        elif self.r_role == 'staff':
            user = StaffController()
            output["receiver"] = user.get_user_by_uid(self.r_uid).get_info()
        else:
            output["receiver"] = None
        output["receiver_role"] = self.r_role
        output['post_id'] = self.post_id
        return output

    def post_message(self, msg):
        """
        sender post a message
        :param msg: message content
        :return: updated msg list
        """
        message = Message(self.s_role, self.s_uid, self.r_role, self.r_uid, self.post_id)
        message.post_message(msg)
        return self.get_msg()
