"""
# -*- coding: utf-8 -*-
@Time    : 11/21/2021 9:48 AM
@Author  : Harry Lee
@Email   : harrylee@nyu.edu
"""
from models.post import *


class Deal:
    def __init__(self, deal_id=None):
        self.deal_id = deal_id
        self.post_id = None
        self.seller_id = None
        self.buyer_id = None
        self.price = None
        self.buyer_address = None
        self.buyer_phone = None
        self.buyer_name = None
        self.payment_status = None
        self.package_status = None
        self.express_number = None
        self.create_time = None
        self.send_time = None
        self.cancel_time = None
        self.finish_time = None
        self.cancelled = None
        self.cancel_reason = None
        self.cancel_role = None
        if self.deal_id is not None:
            self.get_from_db()

    def get_from_db(self):
        """
        Update all information to class variables using self.deal_id from database
        :return: None
        """
        assert self.deal_id is not None, "deal_id not provided (None)"
        with db.db.cursor() as cursor:
            cursor.execute("""
                SELECT *
                FROM deal
                WHERE deal_id = %s; 
            """, [self.deal_id])
        data = cursor.fetchone()
        if data is None:
            return -1
        self.post_id = data['post_id']
        self.seller_id = data['seller_id']
        self.buyer_id = data['buyer_id']
        self.price = data['price']
        self.buyer_address = data['buyer_address']
        self.buyer_phone = data['buyer_phone']
        self.buyer_name = data['buyer_name']
        self.payment_status = data['payment_status']
        self.package_status = data['package_status']
        self.express_number = data['express_number']
        self.create_time = data['create_time'].strftime("%Y-%m-%d %H:%M:%S") if data[
                                                                                    'create_time'] is not None else None
        self.send_time = data['send_time'].strftime("%Y-%m-%d %H:%M:%S") if data['send_time'] is not None else None
        self.cancel_time = data['cancel_time'].strftime("%Y-%m-%d %H:%M:%S") if data[
                                                                                    'cancel_time'] is not None else None
        self.finish_time = data['finish_time'].strftime("%Y-%m-%d %H:%M:%S") if data[
                                                                                    'finish_time'] is not None else None
        self.cancelled = data['cancelled']
        self.cancel_reason = data['cancel_reason']
        self.cancel_role = data['cancel_role']

    def update_to_db(self):
        """
        Update all class variables to database (can not update to a non-existing entry)
        :return: None
        """
        with db.db.cursor() as cursor:
            cursor.execute("""
                UPDATE deal
                SET post_id=%s, seller_id=%s, buyer_id=%s, price=%s, buyer_address=%s, buyer_phone=%s, buyer_name=%s,
                payment_status=%s, package_status=%s, express_number=%s,  create_time=%s, send_time=%s, cancel_time=%s,
                finish_time=%s,cancelled=%s, cancel_reason=%s, cancel_role=%s
                WHERE deal_id=%s
            """, (
                self.post_id, self.seller_id, self.buyer_id, self.price, self.buyer_address, self.buyer_phone,
                self.buyer_name, self.payment_status, self.package_status, self.express_number, self.create_time,
                self.send_time, self.cancel_time, self.finish_time, self.cancelled, self.cancel_reason, self.cancel_role
            ))
        db.db.commit()

    def create_deal(self, post_id: int, buyer_id: int, buyer_address: str, buyer_phone: str, buyer_name: str):
        """
        the initial update to database
        :return: None
        """
        postController = PostController(buyer_id)
        post = postController.get_one_post(post_id, get_post_class=True)
        self.seller_id = post.post_author_id
        self.price = post.post_product_price
        self.post_id = post_id
        self.buyer_id = buyer_id
        self.buyer_address = buyer_address
        self.buyer_phone = buyer_phone
        self.buyer_name = buyer_name
        self.payment_status = True
        self.package_status = False
        self.cancelled = False
        with db.db.cursor() as cursor:
            cursor.execute("""
                INSERT INTO deal( post_id, seller_id, buyer_id, price, buyer_address, buyer_phone, buyer_name, 
                payment_status, package_status, express_number, create_time, send_time, cancel_time, finish_time, 
                cancelled, cancel_reason, cancel_role) 
                VALUES (%s, %s, %s, %s, %s, %s, %s, TRUE, FALSE, NULL, NOW(), NULL, NULL, NULL, FALSE, NULL, NULL)
            """, (
                self.post_id, self.seller_id, self.buyer_id, self.price, self.buyer_address, self.buyer_phone,
                self.buyer_name
            ))
        db.db.commit()

    def set_express_number(self, express_number: int):
        """
        Seller set express tracking number
        :return: None
        """
        self.express_number = express_number
        with db.db.cursor() as cursor:
            cursor.execute("""
                UPDATE deal
                SET express_number=%s,send_time=NOW()
                WHERE deal_id=%s
            """, (self.express_number, self.deal_id))
        db.db.commit()

    def confirm_receipt(self):
        """
        Buyer confirm receipt
        :return: None
        """
        with db.db.cursor() as cursor:
            cursor.execute("""
                        UPDATE deal
                        SET finish_time=NOW()
                        WHERE deal_id=%s
                    """, [self.deal_id])
        db.db.commit()

    def get_order_trace(self):
        """
        Generate a list of trace of the details of this deal, including timestamps and status updates
        :return: list
        """
        traces = []
        if self.create_time:
            traces.append({"time": self.create_time, "status": "Buyer paid {}$.".format(self.price)})
        if self.send_time:
            traces.append({"time": self.send_time,
                           "status": "Seller sent out package, tracking number: {}.".format(self.express_number)})
        if self.finish_time:
            traces.append({"time": self.finish_time, "status": "Deal is confirmed."})
        if self.cancel_time:
            traces.append({"time": self.cancel_time,
                           "status": "Deal cancelled by {}: {}".format(self.cancel_role, self.cancel_reason)})
        return traces

    def get_order_status(self):
        """
        Get order status
        :return: str
        """
        if not self.payment_status:
            return "Unpaid"
        if self.cancelled:
            if self.cancel_role == 'buyer':
                return "Cancelled by buyer"
            if self.cancel_role == 'seller':
                return "Cancelled by seller"
            if self.cancel_role == 'staff':
                return "Cancelled by staff"
        if self.finish_time is not None:
            return "Deal finished"
        if self.send_time is None:
            return "Shipment pending"
        return "Delivering"

    def get_order_detail(self):
        """
        Get order details for the frontend
        :return: dictionary
        """
        return ({
            "deal_id": self.deal_id,
            "post_id": self.post_id,
            "seller_id": self.seller_id,
            "buyer_id": self.buyer_id,
            "price": self.price,
            "status": self.get_order_status(),
            "buyer_address": self.buyer_address,
            "buyer_phone": self.buyer_phone,
            "order_trace": self.get_order_trace()
        })

    def cancel_deal(self, role, reason):
        """
        Cancel deal
        :param reason: str, reason to cancel
        :param role: str, must in {seller, buyer, staff}
        :return: bool
        """
        with db.db.cursor() as cursor:
            cursor.execute("""
                UPDATE deal
                SET cancel_role=%s,cancel_reason=%s,cancel_time=NOW()
                WHERE deal_id=%s
            """, (role, reason))
        db.db.commit()


class DealController:
    def __init__(self, role, uid):
        self.role = role
        self.uid = uid

    def get_deal(self, deal_id):
        if self.role == 'staff':
            return True
        deal = Deal(deal_id=deal_id)
        if int(self.uid) in [deal.seller_id, deal.buyer_id]:
            return deal
        return False

    def create_deal(self, post_id, buyer_id, buyer_address, buyer_phone, buyer_name):
        postController = PostController(self.uid)
        post = postController.get_one_post(post_id, get_post_class=True)
        if post is None:
            return -1  # Not valid to access this post
        if post.post_status == 1 and post.post_product_status == 1:
            deal = Deal()
            deal.create_deal(post_id=post_id, buyer_id=buyer_id, buyer_address=buyer_address,
                             buyer_phone=buyer_phone, buyer_name=buyer_name)
            post.set_post_to_sold()
            return 0
        else:
            return -2  # The post status does not allow itself to be turned into a deal

    def update_express(self, deal_id, express):
        deal = Deal(deal_id=deal_id)
        if deal is None:
            return -1  # Deal does not exist
        # if being seller or staff
        if not (self.role == 'staff' or self.uid == deal.seller_id):
            return -2  # not the seller or staff
        deal.set_express_number(express)
        return 0

    def confirm_receipt(self, deal_id):
        deal = Deal(deal_id=deal_id)
        if deal is None:
            return -1  # Deal does not exist
        # if being seller or staff
        if not self.uid == deal.buyer_id:
            return -2  # not the buyer
        if deal.finish_time is not None:
            return -3  # deal already confirmed
        deal.confirm_receipt()
        return 0

    def cancel_receipt(self, deal_id, reason):
        deal = Deal(deal_id=deal_id)
        if deal is None:
            return -1  # Deal does not exist
        if not self.role != 'staff' and self.uid not in [deal.buyer_id, deal.seller_id]:
            return -2  # not the buyer, seller or staff
        if "Cancelled" in deal.get_order_status():
            return -3  # Deal already cancelled
        if self.role == 'staff':
            deal.cancel_deal('staff', reason)
            return 0
        if self.uid == deal.seller_id:  # as the seller
            if deal.get_order_status() in ["Unpaid", "Shipment pending", "Delivering"]:
                deal.cancel_deal('seller', reason)
                return 0
            elif deal.get_order_status() == "Deal finished":
                return -4
            else:
                return -5
        if self.uid == deal.buyer_id:  # as the buyer
            if deal.get_order_status() in ["Unpaid", "Shipment pending"]:
                deal.cancel_deal('seller', reason)
                return 0
            elif deal.get_order_status() == "Deal finished":
                return -6
            elif deal.get_order_status() == "Delivering":
                return -7
            else:
                return -8
        return -9
