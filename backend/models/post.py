"""
# -*- coding: utf-8 -*-
@Time    : 11/6/2021 2:15 AM
@Author  : Harry Lee
@Email   : harrylee@nyu.edu
"""
from models import *
from . import db


class Post:
    def __init__(self, post_title, post_content, post_author_id, post_status, post_product_price,
                 post_product_status=1, post_id=None, post_creation_time=None, post_modification_time=None,
                 post_images=None):
        self.post_id = post_id
        self.post_title = post_title
        self.post_content = post_content
        self.post_author_id = post_author_id
        self.post_status = post_status
        self.post_product_status = post_product_status
        self.post_product_price = post_product_price
        self.post_creation_time = post_creation_time
        self.post_modification_time = post_modification_time
        self.images = post_images

    def get_info(self):
        """
        Get author information, image information, and also include its own information
        :return: the whole bunch of information as a Python dictionary
        """
        output = {'post_id': self.post_id, 'post_title': self.post_title, 'post_content': self.post_content,
                  'post_author_id': self.post_author_id, 'post_status': self.post_status,
                  'post_product_status': self.post_product_status, 'post_product_price': self.post_product_price,
                  'post_creation_time': self.post_creation_time, 'post_modification_time': self.post_modification_time}
        # Get author information
        user_controller = UserController()
        author = user_controller.get_user_by_uid(self.post_author_id)
        author_info = author.get_info()
        output['post_author_avatar'] = author_info['avatar']
        output['post_author_username'] = author_info['username']
        # Get image information
        image_controller = ImageController(role="user", uid=self.post_author_id)
        output['post_images'] = image_controller.get_post_images(self.post_id)

        return output

    def update_info(self, post_title=None, post_content=None, post_status=None, post_product_status=None,
                    post_product_price=None, post_images=None):
        """
        Update changeable attributes
        :param post_images:
        :param post_id:
        :param post_title:
        :param post_content:
        :param post_status:
        :param post_product_status:
        :param post_product_price:
        :return:
        """
        # It seem that the following 3 lines may have been badly writen, but anyway it works, so I will not change it
        self.post_title = post_title if post_title is not None else self.post_title
        self.post_content = post_content if post_content is not None else self.post_content
        self.post_product_price = post_product_price if post_product_price is not None else self.post_product_price
        self.images = post_images
        self.update_description_to_db()

    def set_post_to_public(self):
        self.post_status = 1
        self.update_post_status_to_db()

    def set_post_to_private(self):
        self.post_status = 2
        self.update_post_status_to_db()

    def delete_post(self):
        self.post_status = 0
        self.update_post_status_to_db()

    def set_post_to_sold(self):
        self.post_product_status = 0
        self.update_product_status_to_db()

    def set_post_to_selling(self):
        self.post_product_status = 1
        self.update_product_status_to_db()

    def update_description_to_db(self):
        """
        ONLY FOR CONTENT, TITLE, PRICE UPDATE!!!
        11/24/2021 UPDATE IMAGE
        :return:
        """
        # CONTENT, TITLE, PRICE
        with db.db.cursor() as cursor:
            if self.post_id is None:
                # Post not created
                cursor.execute("""
                    INSERT INTO post (post_title, post_content, post_author_id, post_status, post_product_price, 
                    post_product_status, post_creation_time, post_modification_time) 
                    VALUES (%s, %s, %s, %s, %s, 1, NOW(), NOW())
                """, (
                    self.post_title, self.post_content, self.post_author_id, self.post_status, self.post_product_price))
                cursor.execute("""
                    SELECT post_id
                    FROM post
                    WHERE post_id=@@identity 
                """)
                post_id = cursor.fetchone()['post_id']
                print(post_id)
                self.post_id = post_id
            else:
                # Post already exists
                cursor.execute("""
                    UPDATE post
                    SET post_title=%s, post_content=%s, post_product_price=%s, post_modification_time=NOW()
                    WHERE post_id=%s
                """, (
                    self.post_title, self.post_content, self.post_product_price, self.post_id))
            # IMAGES
            # Link all current ones
            print(self.images)
            if self.images is not None and len(self.images) > 0:
                # Unlink all previous ones
                cursor.execute("""
                        UPDATE image
                        SET post_id = NULL 
                        WHERE post_id = %s
                    """, [self.post_id])
                print(self.post_id)
                for img_url in self.images:
                    with db.db.cursor() as cursor:
                        cursor.execute("""
                            UPDATE image
                            SET post_id = %s 
                            WHERE image_url = %s
                        """, [self.post_id, img_url])
            db.db.commit()

    def update_post_status_to_db(self):
        with db.db.cursor() as cursor:
            cursor.execute("""
                UPDATE post
                SET post_status=%s
                WHERE post_id=%s
            """, (
                self.post_status, self.post_id))
        db.db.commit()

    def update_product_status_to_db(self):
        with db.db.cursor() as cursor:
            cursor.execute("""
                UPDATE post
                SET post_product_status=%s
                WHERE post_id=%s
            """, (
                self.post_product_status, self.post_id))
        db.db.commit()


class PostController:
    def __init__(self, my_uid):
        self.uid = my_uid

    def get_user_posts(self, uid):
        """
        Only return public posts for others, return all except deleted for my
        :param my_uid:
        :return:
        """
        with db.db.cursor() as cursor:
            cursor.execute("""
                SELECT post_id
                FROM post
                WHERE post_author_id=%s AND post_status!=0 AND (%s=%s OR post_status=1)
            """, [uid, uid, self.uid])
            results = cursor.fetchall()
        print(results, uid)
        output = []
        print(output)
        for each in results:
            post = self.get_one_post(each['post_id'])
            if post is not None:
                output.append(post)
        return output

    def get_one_post(self, post_id, get_post_class=False) -> dict or None:
        """
        If the user is not logged in as the author, and the post is not public, then show nothing
        :param get_post_class:
        :param post_id:
        :return: None
        """
        with db.db.cursor() as cursor:
            cursor.execute("""
                SELECT *
                FROM post
                WHERE post_id=%s
            """, [post_id])
            result = cursor.fetchone()
        if result is None or int(result['post_status']) == 0 or (
                int(result['post_author_id']) != int(self.uid) and int(result['post_status'] != 1)):
            return None
        else:
            post = Post(post_id=result['post_id'], post_title=result['post_title'],
                        post_content=result['post_content'], post_author_id=result['post_author_id'],
                        post_status=result['post_status'], post_product_status=result['post_product_status'],
                        post_product_price=result['post_product_price'],
                        post_creation_time=result['post_creation_time'].strftime("%Y-%m-%d %H:%M"),
                        post_modification_time=result['post_modification_time'].strftime("%Y-%m-%d %H:%M"))
        if get_post_class:
            return post
        return post.get_info()

    def search_post(self, keyword):
        keywords = keyword.split()
        where_clause = "WHERE LOWER(post_title) LIKE %s OR LOWER(post_title) LIKE %s"
        arguments = ['%' + keywords[0] + '%', '%' + keywords[0] + '%']
        for i in range(1, len(keywords)):
            where_clause += " OR LOWER(post_title) LIKE %s OR LOWER(post_title) LIKE %s"
            arguments += ['%' + keywords[i] + '%', '%' + keywords[i] + '%']
        with db.db.cursor() as cursor:
            cursor.execute("""
                SELECT post_id
                FROM post 
                
            """ + where_clause, arguments)
            results = cursor.fetchall()
        output = []
        for each in results:
            post = self.get_one_post(each['post_id'])
            if post is not None:
                output.append(post)
        return output

    def get_index_posts(self):
        with db.db.cursor() as cursor:
            cursor.execute("""
                SELECT post_id
                FROM post 
                ORDER BY post_creation_time DESC
                LIMIT %s
            """, [config.RECENT_POSTS])
            results = cursor.fetchall()
        output = []
        for each in results:
            post = self.get_one_post(each['post_id'])
            if post is not None:
                output.append(post)
        return output

    def create_new_post(self, post_title, post_content, post_status, post_product_price, post_images):
        post = Post(post_author_id=self.uid, post_content=post_content, post_title=post_title,
                    post_status=post_status, post_product_price=post_product_price, post_images=post_images)
        post.update_description_to_db()
