"""
# -*- coding: utf-8 -*-
@Time    : 11/1/2021 8:49 AM
@Author  : Harry Lee
@Email   : harrylee@nyu.edu
"""
from flask import Blueprint, session
from models import *
import datetime

bp = Blueprint('account', __name__, url_prefix='/account')


@bp.route('/user', methods=['GET'])
def get_user():
    req = get_data()
    userController = UserController()
    if 'email' in req:
        user = userController.get_user_by_email(req['email'])
    elif 'user_id' in req:
        user = userController.get_user_by_uid(req['user_id'])
    else:
        return api_fail('000', 'Missing arguments')
    if user == -1:
        return api_fail('008', 'No such user')
    return api_success(user.get_info())


@bp.route('/user', methods=['POST'])
def add_user():
    req = post_data()
    userController = UserController()
    if 'username' not in req:
        return api_fail('000', 'Missing arguments: username')
    if 'password' not in req:
        return api_fail('000', 'Missing arguments: password')
    if 'email' not in req:
        return api_fail('000', 'Missing arguments: email')
    if 'bio' not in req:
        req['bio'] = ''
    if 'avatar' not in req:
        req['avatar'] = ''
    if 'gender' not in req:
        req['gender'] = None
    else:
        if req['gender'] not in [0, 1, '0', '1']:
            return api_fail('005', "Invalid gender")
    if 'birthday' not in req:
        req['birthday'] = None
    else:
        if not check_date_format(req['birthday']):
            return api_fail('004',
                            'Birthday format incorrect, received: {}, expected: YYYY-MM-DD'.format(req['birthday']))

    result = userController.add_new_user(username=req['username'], password=req['password'],
                                         email=req['email'], bio=req['bio'], avatar=req['avatar'],
                                         birthday=req['birthday'], gender=req['gender'])
    if result == 3:
        return api_fail('003', "Email already exists")
    return api_success()


@bp.route('/user', methods=['PUT'])
@check_login_user
def modify_user():
    req = post_data()
    userController = UserController()
    staff = userController.get_user_by_uid(session['uid'])
    if 'gender' in req and req['gender'] not in [0, 1, '0', '1']:
        return api_fail('005', "Invalid gender")
    if 'birthday' in req and not check_date_format(req['birthday']):
        return api_fail('004',
                        'Birthday format incorrect, received: {}, expected: YYYY-MM-DD'.format(req['birthday']))
    if 'password' in req:
        if 'verification_code' not in req:
            return api_fail('000', "Missing argument, verification_code")
        if not verification.verify_code(staff.email, req['verification_code']):
            return api_fail('010', "Incorrect verification code.")
    userController.update_user(
        username=req['username'] if 'username' in req else None,
        bio=req['bio'] if 'bio' in req else None,
        avatar=req['avatar'] if 'avatar' in req else None,
        birthday=req['birthday'] if 'birthday' in req else None,
        gender=req['gender'] if 'gender' in req else None,
        email=req['email'] if 'email' in req else None,
        password=req['password'] if 'password' in req else None,
    )
    return api_success()


@bp.route('/staff', methods=['GET'])
def get_staff():
    req = get_data()
    staffController = StaffController()
    if 'email' in req:
        staff = staffController.get_user_by_email(req['email'])
    elif 'user_id' in req:
        staff = staffController.get_user_by_uid(req['user_id'])
    else:
        return api_fail('000', 'Missing arguments')
    if staff == -1:
        return api_fail('008', 'No such user')
    return api_success(staff.get_info())


@bp.route('/staff', methods=['POST'])
def add_staff():
    req = post_data()
    staffController = StaffController()
    if 'username' not in req:
        return api_fail('000', 'Missing arguments: username')
    if 'password' not in req:
        return api_fail('000', 'Missing arguments: password')
    if 'email' not in req:
        return api_fail('000', 'Missing arguments: email')
    if 'bio' not in req:
        req['bio'] = ''
    if 'avatar' not in req:
        req['avatar'] = ''
    if 'gender' not in req:
        req['gender'] = None
    else:
        if req['gender'] not in [0, 1, '0', '1']:
            return api_fail('005', "Invalid gender")
    if 'birthday' not in req:
        req['birthday'] = None
    else:
        if not check_date_format(req['birthday']):
            return api_fail('004',
                            'Birthday format incorrect, received: {}, expected: YYYY-MM-DD'.format(req['birthday']))

    result = staffController.add_new_user(username=req['username'], password=req['password'],
                                          email=req['email'], bio=req['bio'], avatar=req['avatar'],
                                          birthday=req['birthday'], gender=req['gender'])
    if result == 3:
        return api_fail('003', "Email already exists")
    return api_success()


@bp.route('/staff', methods=['PUT'])
@check_login_staff
def modify_staff():
    req = post_data()
    staffController = StaffController()
    staff = staffController.get_user_by_uid(session['uid'])
    if 'gender' in req and req['gender'] not in [0, 1, '0', '1']:
        return api_fail('005', "Invalid gender")
    if 'birthday' in req and not check_date_format(req['birthday']):
        return api_fail('004',
                        'Birthday format incorrect, received: {}, expected: YYYY-MM-DD'.format(req['birthday']))
    if 'password' in req:
        if 'verification_code' not in req:
            return api_fail('000', "Missing argument, verification_code")
        if not verification.verify_code(staff.email, req['verification_code']):
            return api_fail('010', "Incorrect verification code.")
    staffController.update_user(
        username=req['username'] if 'username' in req else None,
        bio=req['bio'] if 'bio' in req else None,
        avatar=req['avatar'] if 'avatar' in req else None,
        birthday=req['birthday'] if 'birthday' in req else None,
        gender=req['gender'] if 'gender' in req else None,
        email=req['email'] if 'email' in req else None,
        password=req['password'] if 'password' in req else None,
    )
    return api_success()


@bp.route('/user/posts', methods=['GET'])
def get_posts():
    req = get_data()
    if "user_id" not in req:
        return api_fail('000', "Missing argument, user_id")
    postController = PostController(get_uid())
    return api_success(postController.get_user_posts(req['user_id']))


@bp.route('/user/addresses', methods=['GET'])
@check_login_user
def get_my_address():
    addressController = AddressController(get_uid())
    return api_success(addressController.get_my_addresses())


@bp.route('/user/addresses', methods=['POST'])
@check_login_user
def add_an_address():
    req = post_data()
    if 'name' not in req or 'phone' not in req or 'address' not in req:
        return api_fail("000", "Missing arguments: name, phone or address")
    addressController = AddressController(get_uid())
    addressController.add_new_address(req['name'], req['phone'], req['address'])
    return api_success()


@bp.route('/user/addresses', methods=['PUT'])
@check_login_user
def modify_an_address():
    req = post_data()
    if 'address_id' not in req:
        return api_fail('000', "Missing arguments: address_id")
    if 'name' not in req:
        req['name'] = None
    if 'phone' not in req:
        req['phone'] = None
    if 'address' not in req:
        req['address'] = None
    addressController = AddressController(get_uid())
    address = addressController.get_address_by_address_id(req['address_id'], get_address_class=True)
    if address is None:
        return api_fail("009", "Access is denied to this address")
    address.modify_address(name=req['name'], phone=req['phone'], address=req['address'])
    return api_success()

@bp.route('/user/addresses', methods=['DELETE'])
@check_login_user
def delete_an_address():
    req = post_data()
    if 'address_id' not in req:
        return api_fail('000', "Missing arguments: address_id")
    addressController = AddressController(get_uid())
    address = addressController.get_address_by_address_id(req['address_id'], get_address_class=True)
    if address is None:
        return api_fail("009", "Access is denied to this address")
    addressController.delete_address(req['address_id'])
    return api_success()