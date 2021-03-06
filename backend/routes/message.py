"""
@author: Harry Lee
@email: harrylee@nyu.edu
@date: 12/9/2021 12:05 AM
"""
from flask import Blueprint, session
from models import *

bp = Blueprint('msg', __name__, url_prefix='/msg')


@bp.route('', methods=['GET'])
@check_login_user_or_staff
def get_msg():
    req = get_data()
    if 'r_role' not in req:
        return api_fail("000", "Missing argument: r_role")
    if 'r_uid' not in req:
        return api_fail("000", "Missing argument: r_uid")
    post_id = req['post_id'] if "post_id" in req else None
    messageController = MessageController(get_uid(), session['role'], session['role'], get_uid(), req['r_role'],
                                          req['r_uid'], post_id)
    output = messageController.get_msg()
    return api_success(output)


@bp.route('', methods=['POST'])
@check_login_user_or_staff
def post_msg():
    req = post_data()
    if 'r_role' not in req:
        return api_fail("000", "Missing argument: r_role")
    if 'r_uid' not in req:
        return api_fail("000", "Missing argument: r_uid")
    post_id = req['post_id'] if "post_id" in req else None
    if 'msg' not in req:
        return api_fail("000", "Missing argument: msg")
    if req['msg']=='':
        return api_fail("040", "Empty message not allowed")
    messageController = MessageController(get_uid(), session['role'], session['role'], get_uid(), req['r_role'],
                                          req['r_uid'], post_id)
    output = messageController.post_message(req['msg'])
    return api_success(output)
