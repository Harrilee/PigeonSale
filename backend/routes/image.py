"""
# -*- coding: utf-8 -*-
@Time    : 11/21/2021 4:21 AM
@Author  : Harry Lee
@Email   : harrylee@nyu.edu
"""
from flask import Blueprint, session, request, send_file

import config
from models import *
import datetime
import os

bp = Blueprint('image', __name__, url_prefix='/image')


@bp.route('', methods=['POST'])
# @check_login_user
def receive_img():
    req = request.files
    if len(req) == 0:
        return api_fail("000", "No file found, getting 0 pictures")
    paths = []  # the list of urls to return
    for image in req:  # pre-check if every image is "qualified"
        file = req[image]
        extension = file.filename.split('.')[-1].lower()
        if extension not in config.ALLOWED_IMAGE_EXTENSIONS:
            return api_fail("022", "File extension not accepted. Received: {}, Allowed: {}".format(
                extension, str(config.ALLOWED_IMAGE_EXTENSIONS)))
    for image in req:
        file = req[image]
        filename = datetime.datetime.now().strftime("%Y%m%d%H%M%f") + '.' + file.filename.split('.')[-1].lower()
        path = os.path.join(config.IMAGE_STORAGE_PATH, filename)
        req[image].save(path)
        paths.append(config.IMAGE_GET_PATH_BASE + filename)

    return api_success({"urls": paths})


@bp.route('/<filename>', methods=['GET'])
def get_pic(filename):
    path = os.path.join(config.IMAGE_STORAGE_PATH, filename)
    if not os.path.isfile(path):
        return "File not found", 404
    return send_file(path)


@bp.route('/<filename>', methods=['DELETE'])
def del_pic(filename):
    pass
