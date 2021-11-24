"""
@author: Harry Lee
@email: harrylee@nyu.edu
@date: 11/24/2021 9:37 PM
"""

from models import *
from . import db


class Image:
    def __init__(self, img_id=None, image_owner_id=None, image_url=None, post_id=None):
        self.img_id = img_id
        self.image_owner_id = image_owner_id
        self.image_url = image_url
        self.post_id = post_id
        self.image_alt_text = None

    def insert_image_to_db(self):
        """
        Insert image_owner_id, image_url to database
        :return:
        """
        # Check if required items are not None
        if self.image_owner_id is None or self.image_url is None:
            return -1
        # Execute insert
        with db.db.cursor() as cursor:
            cursor.execute("""
                INSERT INTO image(image_owner_id, image_url)
                VALUES (%s, %s)
            """, (self.image_owner_id, self.image_url))
            db.db.commit()
        return 0

    def update_post_id(self):
        """
        Update post_id to database
        The function will NOT check if post author and image author matches,
        nor does this function check whether image author or logged in author matches
        :return:
        """
        # Check if required items are not None
        if self.image_url is None or self.image_owner_id is None or self.post_id is None:
            return -1
        with db.db.cursor() as cursor:
            cursor.execute("""
                UPDATE image
                SET post_id = %s
                WHERE img_url = %s
            """, (self.post_id, self.image_url))
            cursor.commit()
        return 0


class ImageController:
    def __init__(self, role, uid):
        self.role = role
        self.uid = uid

    def create_image(self, url):
        image = Image(image_owner_id=self.uid, image_url=url)
        result = image.insert_image_to_db()
        assert result==0
        return result

    def get_post_images(self, post_id):
        with db.db.cursor() as cursor:
            cursor.execute("""
                SELECT image_url
                FROM image
                WHERE post_id=%s
            """, [post_id])
            result = cursor.fetchall()
        if result is None:
            return []
        images = [each['image_url'] for each in result]
        return images
