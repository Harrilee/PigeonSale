"""
@author: Harry Lee
@email: harrylee@nyu.edu
@date: 12/4/2021 4:31 PM
"""
from models.deal import *
import numpy as np

class Rate:
    def __init__(self, deal_id):
        self.deal_id = deal_id
        self.buyer_rate = None
        self.buyer_comment = None
        self.seller_rate_time = None
        self.seller_rate = None
        self.seller_comment = None
        self.buyer_rate_time = None
        self.get_from_db()

    def get_from_db(self):
        """
        Update class information from database
        If information does not exist in database, just create a new entry
        :return:
        """
        with db.db.cursor() as cursor:
            cursor.execute("""
                SELECT *
                FROM rate
                WHERE deal_id = %s
            """, [self.deal_id])
            result = cursor.fetchone()
        if result is None:
            with db.db.cursor() as cursor:
                cursor.execute("""
                    INSERT INTO rate(deal_id)
                    VALUES (%s)
                """, [self.deal_id])
                db.db.commit()
        else:
            self.buyer_rate = result['buyer_rate']
            self.buyer_comment = result['buyer_comment']
            self.buyer_rate_time = result['buyer_rate_time'].strftime("%Y-%m-%d %H:%M:%S") \
                if result['buyer_rate_time'] is not None else None
            self.seller_rate = result['seller_rate']
            self.seller_comment = result['seller_comment']
            self.seller_rate_time = result['seller_rate_time'].strftime("%Y-%m-%d %H:%M:%S") \
                if result['seller_rate_time'] is not None else None

    def seller_post(self, rate, comment):
        if self.seller_rate is not None:
            return -1  # already posted
        self.seller_rate = rate
        self.seller_comment = comment
        with db.db.cursor() as cursor:
            cursor.execute("""
                UPDATE rate
                SET seller_rate = %s, seller_comment = %s, seller_rate_time = NOW()
                WHERE deal_id=%s
                   """, [rate, comment, self.deal_id])
            db.db.commit()

    def buyer_post(self, rate, comment):
        if self.buyer_rate is not None:
            return -1  # already posted
        self.buyer_rate = rate
        self.buyer_comment = comment
        with db.db.cursor() as cursor:
            cursor.execute("""
                       UPDATE rate
                       SET buyer_rate = %s, buyer_comment = %s, buyer_rate_time = NOW()
                       WHERE deal_id=%s
                   """, [rate, comment, self.deal_id])
            db.db.commit()

    def get_rate(self):
        return {
            "deal_id": self.deal_id,
            "buyer_rate": self.buyer_rate,
            "buyer_comment": self.buyer_comment,
            "buyer_rate_time": self.buyer_rate_time,
            "seller_rate": self.seller_rate,
            "seller_comment": self.seller_comment,
            "seller_rate_time": self.seller_rate_time
        }


class RateController:
    def __init__(self, role, uid):
        self.role = role
        self.uid = uid

    def get_rate(self, deal_id):
        if self.role == 'user':
            deal = Deal(deal_id=deal_id)
            if deal.seller_id != self.uid and deal.buyer_id != self.uid:
                return -1  # Not your deal
        rate = Rate(deal_id)
        if rate.buyer_rate is None or rate.seller_rate is None and self.role == 'user':
            return -2  # Rate not available
        return rate.get_rate()

    def post_rate(self, deal_id, rate, comment):
        if self.role == 'staff':
            return -1  # Staff cannot post
        deal = Deal(deal_id=deal_id)
        if deal.seller_id != self.uid and deal.buyer_id != self.uid:
            return -2  # Not your deal
        rate_ = Rate(deal_id)
        if deal.seller_id != self.uid:
            result = rate_.seller_post(rate, comment)
        else:
            result = rate_.buyer_post(rate, comment)
        if result == -1:
            return -3  # Already rated

    def get_user_rates(self, uid):
        with db.db.cursor() as cursor:
            cursor.execute("""
            -- As buyer
            (
                SELECT seller_rate as rate, seller_comment as comment, seller_rate_time as time
                FROM rate JOIN deal
                ON rate.deal_id = deal.deal_id
                WHERE buyer_rate IS NOT NULL AND seller_rate IS NOT NULL AND deal.buyer_id=%s
            )       
            UNION
            (
            -- as seller
                SELECT buyer_rate as rate, buyer_comment as comment, buyer_rate_time as time
                FROM rate JOIN deal
                ON rate.deal_id = deal.deal_id
                WHERE buyer_rate IS NOT NULL AND seller_rate IS NOT NULL AND deal.seller_id=%s
            )
            ORDER BY time DESC
            """, [uid, uid])
            result = cursor.fetchall()
        if result is None:
            return {
                'average_rate': -1,
                'details': []
            }
        average_rating = np.average([x['rate'] for x in result])
        return {
            'average_rate': average_rating,
            'details': result
        }

    def del_rate(self, deal_id):
        with db.db.cursor() as cursor:
            cursor.execute("""
            DELETE FROM rate
            WHERE deal_id=%s
            """, [deal_id])
            db.db.commit()
        return 0