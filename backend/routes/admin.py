"""
@author: Harry Lee
@email: harrylee@nyu.edu
@date: 12/8/2021 9:10 PM
"""
from flask import Blueprint, session
from models import *
import datetime

bp = Blueprint('admin', __name__, url_prefix='/admin')


@bp.route('/staff', methods=['GET'])
@check_login_admin
def get_staff():
    staffController = StaffController()
    staffs = staffController.get_all_user()
    return api_success({"staffs": staffs})


@bp.route('/staff', methods=['DELETE'])
@check_login_admin
def del_staff():
    req = post_data()
    if "staff_id" not in req:
        return api_fail("000", "Missing arguments: staff_id")
    staffController = StaffController()
    result = staffController.del_user(req['staff_id'])
    if result == 0:
        return api_success()
    return api_fail("-1", "Unknown Error")


@bp.route('/user', methods=['GET'])
@check_login_admin_or_staff
def get_user():
    userController = UserController()
    users = userController.get_all_user()
    return api_success({"users": users})


@bp.route('/user', methods=['DELETE'])
@check_login_admin_or_staff
def del_user():
    req = post_data()
    if "user_id" not in req:
        return api_fail("000", "Missing arguments: user_id")
    userController = UserController()
    result = userController.del_user(req['user_id'])
    if result == 0:
        return api_success()
    return api_fail("-1", "Unknown Error")

@bp.route('/all_deal', methods=['GET'])
@check_login_admin_or_staff
def get_all_deal():
    dealController = DealController('admin', -1)
    return api_success(dealController.get_all_deals())
