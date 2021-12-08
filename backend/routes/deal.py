"""
# -*- coding: utf-8 -*-
@Time    : 11/21/2021 4:41 PM
@Author  : Harry Lee
@Email   : harrylee@nyu.edu
"""
from flask import Blueprint, session
from models import *

bp = Blueprint('deal', __name__, url_prefix='/deal')


@bp.route('', methods=['GET'])
@check_login_user_or_staff
def get_deal():
    req = get_data()
    if "deal_id" not in req:
        return api_fail("000", "Missing arguments")
    dealController = DealController(session['role'], session['uid'])
    deal = dealController.get_deal(req['deal_id'])
    if deal is False:
        return api_fail('009', "You do not have access to this deal")
    return api_success(deal.get_order_detail())


@bp.route('', methods=['POST'])
@check_login_user
def create_deal():
    req = post_data()
    if 'post_id' not in req:
        return api_fail("000", "Missing argument: post_id")
    if 'buyer_address' not in req:
        return api_fail("000", "Missing argument: buyer_address")
    if 'buyer_phone' not in req:
        return api_fail("000", "Missing argument: buyer_phone")
    if 'buyer_name' not in req:
        return api_fail("000", "Missing argument: buyer_name")
    dealController = DealController(session['role'], session['uid'])
    result = dealController.create_deal(
        post_id=req['post_id'], buyer_id=session['uid'], buyer_address=req['buyer_address'],
        buyer_phone=req['buyer_phone'], buyer_name=req['buyer_name']
    )
    if result == -1:
        return api_fail('011', "The post does not exist or is hidden")
    if result == -2:
        return api_fail('021', "Post status does not allow itself be turned into a deal. It might be already sold out.")
    if result == 0:
        return api_success()
    return api_fail("", "Unexpected error: failed to get a response")


@bp.route('', methods=['PUT'])
@check_login_user
def update_deal():
    req = post_data()
    if 'action' not in req:
        return api_fail("000", "Missing argument: action")
    if 'deal_id' not in req:
        return api_fail("000", "Missing argument: deal_id")
    if req['action'] not in ['express', 'confirm']:
        return api_fail("022", "Invalid action attribute, action must be 'express' or 'confirm'")
    dealController = DealController(session['role'], session['uid'])
    if req['action'] == 'express':
        if 'code' not in req:
            return api_fail("000", "Missing argument: code")
        result = dealController.update_express(req['deal_id'], req['code'])
        if result == -1:
            return api_fail("024", "Deal does not exist")
        if result == -2:
            return api_fail("009", "Not logged in as the seller or staff")
        if result == 0:
            return api_success()
    elif req['action'] == 'confirm':
        result = dealController.confirm_receipt(req['deal_id'])
        if result == -1:
            return api_fail("024", "Deal does not exist")
        if result == -2:
            return api_fail("009", "Not logged in as the buyer")
        if result == -3:
            return api_fail("018", "Receipt already confirmed")
        if result == 0:
            return api_success()
    return api_fail("", "Unexpected error: failed to get a response")


@bp.route('', methods=['DELETE'])
@check_login_user_or_staff
def cancel_deal():
    req = post_data()
    if 'deal_id' not in req:
        return api_fail("000", "Missing argument: deal_id")
    if 'reason' not in req:
        return api_fail("000", "Missing argument: reason")
    dealController = DealController(session['role'], session['uid'])
    result = dealController.cancel_receipt(req['deal_id'], req['reason'])
    if result == 0:
        return api_success()
    elif result == -1:
        return api_fail("024", "Deal does not exist")
    elif result == -2:
        return api_fail("009", "Not logged in as staff, buyer or seller")
    elif result == -3:
        return api_fail("025", "Deal already cancelled")
    elif result == -4:
        return api_fail("026", "Deal already finished, seller cannot cancel")
    elif result == -5:
        return api_fail("", "Unexpected error: failed to get a response (-5)")
    elif result == -6:
        return api_fail("027", "Deal already finished, buyer cannot cancel")
    elif result == -7:
        return api_fail("028", "Deal in delivering, buyer cannot cancel")
    elif result == -8:
        return api_fail("", "Unexpected error: failed to get a response (-8)")
    elif result == -9:
        return api_fail("", "Unexpected error: failed to get a response (-9)")
    else:
        return api_fail("", "Unexpected error: failed to get a response (-10)")


@bp.route('/my', methods=['GET'])
@check_login_user
def get_my_deal():
    dealController = DealController('user', get_uid())
    return api_success(dealController.get_my_deal())


@bp.route('/my/sold', methods=['GET'])
@check_login_user
def get_my_deal_sell():
    dealController = DealController('user', get_uid())
    return api_success(dealController.get_my_deal(bought=False))


@bp.route('/my/bought', methods=['GET'])
@check_login_user
def get_my_deal_bought():
    dealController = DealController('user', get_uid())
    return api_success(dealController.get_my_deal(sell=False))


@bp.route('/rate', methods=['GET'])
@check_login_user_or_staff
def get_one_rate():
    req = get_data()
    if 'deal_id' not in req:
        return api_fail('000', "Missing argument, deal_id")
    rateController = RateController(session['role'], get_uid())
    result = rateController.get_rate(req['deal_id'])
    if result == -1:
        return api_fail("029", "This is not your deal")
    if result == -2:
        return api_fail("030", "Seller and buyer haven't both finished rating, rate not visible")
    return api_success(result)


@bp.route('/rate', methods=['POST'])
@check_login_user
def post_rate():
    req = post_data()
    if 'deal_id' not in req:
        return api_fail('000', "Missing argument, deal_id")
    if 'rate' not in req:
        return api_fail('000', "Missing argument, rate")
    if 'comment' not in req:
        return api_fail('000', "Missing argument, comment")
    if req['rate'] not in [1, 2, 3, 4, 5]:
        return api_fail("032", 'Rate not valid, should be a integer in [1,5]')
    rateController = RateController(session['role'], get_uid())
    result = rateController.post_rate(req['deal_id'], req['rate'], req['comment'])
    if result == -1:
        return api_fail('009', "Staff cannot post")
    if result == -2:
        return api_fail("029", "Not your deal, cannot post")
    if result == -3:
        return api_fail("031", "Rate already exists")
    return api_success()

@bp.route('/rate', methods=['DELETE'])
@check_login_admin_or_staff
def del_rate():
    req = post_data()
    if 'deal_id' not in req:
        return api_fail('000', "Missing argument, deal_id")
    rateController = RateController(session['role'] if "role" in session is None else "guest", get_uid())
    result = rateController.del_rate(req['deal_id'])
    if result == 0:
        return api_success()
    return api_fail("-1", "Unknown Error")