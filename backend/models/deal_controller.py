"""
@author: Harry Lee
@email: harrylee@nyu.edu
@date: 12/9/2021 4:36 AM
"""
from models import *
class DealController:
    def __init__(self, role, uid):
        self.role = role
        self.uid = uid

    def get_deal(self, deal_id):
        deal = Deal(deal_id=deal_id)
        if int(self.uid) in [deal.seller_id, deal.buyer_id] or self.role == 'staff':
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

    def get_my_deal(self, sell=True, bought=True):
        if sell == True and bought == True:
            with db.db.cursor() as cursor:
                cursor.execute("""
                    SELECT deal_id
                    FROM deal
                    WHERE buyer_id=%s OR seller_id=%s
                """, (self.uid, self.uid))
                result = cursor.fetchall()
        elif sell == True and bought == False:
            with db.db.cursor() as cursor:
                cursor.execute("""
                    SELECT deal_id
                    FROM deal
                    WHERE seller_id=%s
                """, [self.uid])
                result = cursor.fetchall()
        elif sell == False and bought == True:
            with db.db.cursor() as cursor:
                cursor.execute("""
                    SELECT deal_id
                    FROM deal
                    WHERE buyer_id=%s
                """, [self.uid])
                result = cursor.fetchall()
        else:
            result = None
        if result is None:
            return []
        deals = []
        for deal in result:
            deal = Deal(deal['deal_id'])
            deal.get_from_db()
            deals.append(deal.get_order_detail())
        return deals

    def get_all_deals(self):
        with db.db.cursor() as cursor:
            cursor.execute("""
                SELECT deal_id
                FROM deal
            """, )
            result = cursor.fetchall()
        if result is None:
            return []
        deals = []
        for deal in result:
            deal_info = {}
            deal = Deal(deal['deal_id'])
            deal.get_from_db()
            deal_info = deal.get_order_detail()

            rateController = RateController('admin', -1)
            rate_info = rateController.get_rate(deal_info['deal_id'])
            rate_info = None if rate_info == -2 else rate_info
            deal_info['rate'] = rate_info
            deals.append(deal_info)
        return deals