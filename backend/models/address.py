"""
# -*- coding: utf-8 -*-
@Time    : 11/11/2021 2:58 PM
@Author  : Harry Lee
@Email   : harrylee@nyu.edu
"""
from . import db


class Address:
    def __init__(self, name, phone, address, user_id, address_id=None):
        self.name = name
        self.phone = phone
        self.address = address
        self.user_id = user_id
        self.address_id = address_id

    def update_to_db(self):
        if self.address_id is None:
            with db.db.cursor() as cursor:
                cursor.execute("""
                    INSERT INTO address (name, phone, address, user_id)
                    VALUES (%s, %s, %s, %s)
                """, (self.name, self.phone, self.address, self.user_id))
            db.db.commit()
        else:
            with db.db.cursor() as cursor:
                cursor.execute("""
                    UPDATE address
                    SET name=%s, phone=%s, address=%s, user_id=%s
                    WHERE address_id=%s
                """, (self.name, self.phone, self.address, self.user_id, self.address_id))
            db.db.commit()

    def modify_address(self, name=None, phone=None, address=None, user_id=None):
        self.name = name if name is not None else self.name
        self.phone = phone if phone is not None else self.phone
        self.address = address if address is not None else self.address
        self.user_id = user_id if user_id is not None else self.user_id
        self.update_to_db()

    def get_info(self):
        out = {}
        out['name'] = self.name
        out['address'] = self.address
        out['phone'] = self.phone
        out['user_id'] = self.user_id
        out['address_id'] = self.address_id
        return out


class AddressController:
    def __init__(self, uid):
        self.uid = uid

    def add_new_address(self, name, phone, address):
        address = Address(name=name, phone=phone, address=address, user_id=self.uid)
        address.update_to_db()

    def get_address_by_address_id(self, address_id, get_address_class=False):
        with db.db.cursor() as cursor:
            cursor.execute("""
                SELECT *
                FROM address
                WHERE address_id=%s and user_id=%s
            """, [address_id, self.uid])
            result = cursor.fetchone()
        if result is None:
            return None
        address = Address(name=result['name'], phone=result['phone'], address_id=result['address_id'],
                          address=result['address'], user_id=result['user_id'])
        if get_address_class:
            return address
        return address.get_info()

    def get_my_addresses(self):
        with db.db.cursor() as cursor:
            cursor.execute("""
                SELECT *
                FROM address
                WHERE user_id=%s
            """, [self.uid])
            results = cursor.fetchall()
        out = []
        for result in results:
            address = Address(name=result['name'], phone=result['phone'], address_id=result['address_id'],
                              address=result['address'], user_id=result['user_id'])
            out.append(address.get_info())
        return out

    def delete_address(self, address_id):
        """
        NO authentication in this method, authentication should be in Route
        :param address_id:
        :return:
        """
        with db.db.cursor() as cursor:
            cursor.execute("""
                DELETE FROM address
                WHERE address_id=%s and user_id=%s
            """, [address_id, self.uid])
        db.db.commit()
