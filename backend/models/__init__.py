"""
# -*- coding: utf-8 -*-
@Time    : 10/16/2021 3:15 PM
@Author  : Harry Lee
@Email   : harrylee@nyu.edu
"""

# The import order DOES MATTER!!!!!!!!!!!

from models.utils import *
from models.database import Database
db = Database()
from models.user import User, UserController
from models.verification import Verification
verification = Verification()
from models.staff import Staff, StaffController
from models.admin import AdminController
from models.image import Image, ImageController
from models.post import Post, PostController
from models.address import Address, AddressController

from models.deal import Deal
from models.rate import Rate, RateController
from models.deal_controller import DealController
from models.message import Message, MessageController


