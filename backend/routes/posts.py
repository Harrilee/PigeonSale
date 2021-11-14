"""
# -*- coding: utf-8 -*-
@Time    : 11/11/2021 1:56 AM
@Author  : Harry Lee
@Email   : harrylee@nyu.edu
"""
from flask import Blueprint, session
from models import *
import datetime

bp = Blueprint('posts', __name__, url_prefix='/posts')


@bp.route('', methods=['GET'])
def get_posts():
    req = get_data()
    postController = PostController(get_uid())
    if 'post_id' in req:
        result = postController.get_one_post(req['post_id'])
        if result is None:
            return api_fail('011', 'The post does not exist or is deleted or hidden')
        return api_success(result)
    elif 'search' in req:
        return api_success(postController.search_post(req['search']))
    else:
        return api_success(postController.get_index_posts())
    return api_fail('000', "Missing arguments: 'post_id' or 'search'")


@bp.route('', methods=['POST'])
@check_login_user
def create_new_post():
    req = post_data()
    if 'post_title' not in req:
        return api_fail('000', 'Missing argument: post_title')
    if 'post_content' not in req:
        return api_fail('000', 'Missing argument: post_content')
    if 'post_status' not in req:
        return api_fail('000', 'Missing argument: post_status')
    if 'post_product_price' not in req:
        return api_fail('000', 'Missing argument: post_product_price')

    postController = PostController(get_uid())
    postController.create_new_post(
        req['post_title'], req['post_content'], req['post_status'], req['post_product_price']
    )
    return api_success()


@bp.route('', methods=['PUT'])
@check_login_user
def update_post():
    req = post_data()
    if 'post_id' not in req:
        return api_fail('000', 'Missing argument: post_id')
    postController = PostController(get_uid())
    post = postController.get_one_post(req['post_id'], get_post_class=True)
    print(56, int(post.post_author_id) != postController.uid)
    if not post or int(post.post_author_id) != postController.uid:
        return api_fail('009', "Access denied, your do not have access to this post")
    if post.post_product_status == 0:
        return api_fail('016', 'Product is sold, post is locked')
    if post.post_status == 0:
        return api_fail('016', 'Post is deleted and locked')
    if 'post_title' in req or 'post_content' in req or 'post_product_price' in req:
        if 'post_title' not in req:
            req['post_title'] = None
        if 'post_content' not in req:
            req['post_content'] = None
        if 'post_product_price' not in req:
            req['post_product_price'] = None
        post.update_info(post_title=req['post_title'], post_content=req['post_content'],
                         post_product_price=req['post_product_price'])
        post.update_description_to_db()
    if 'post_status' in req and int(req['post_status']) != post.post_status:
        if int(req['post_status']) == 1:
            post.set_post_to_public()
        elif int(req['post_status']) == 2:
            post.set_post_to_private()
        else:
            return api_fail('014', 'Invalid post_status')

    return api_success()


@bp.route('', methods=['DELETE'])
@check_login_user
def delete_post():
    req = post_data()
    if 'post_id' not in req:
        return api_fail('000', 'Missing argument: post_id')
    postController = PostController(get_uid())
    post = postController.get_one_post(req['post_id'], get_post_class=True)

    if not post or int(post.post_author_id) != postController.uid:
        return api_fail('009', "Access denied, your do not have access to this post")
    if post.post_product_status == 0:
        return api_fail('016', 'Product is sold, post is locked')
    if post.post_status == 0:
        return api_fail('017', 'Post is already deleted')
    post.delete_post()
    return api_success()


@bp.route('/my', methods=['GET'])
@check_login_user
def get_my_posts():
    postController = PostController(get_uid())
    return api_success(postController.get_user_posts(get_uid())
                       )
