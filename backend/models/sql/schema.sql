DROP DATABASE pigeon_sale;
CREATE DATABASE pigeon_sale;
use pigeon_sale;

CREATE TABLE User
(
    user_id  INT AUTO_INCREMENT,
    username VARCHAR(20),
    bio      VARCHAR(100),
    password VARCHAR(50),
    email    VARCHAR(50) UNIQUE,
    avatar   VARCHAR(50),
    PRIMARY KEY (user_id),
    INDEX (username)
);

CREATE TABLE Post
(
    post_id              INT AUTO_INCREMENT,
    post_content         VARCHAR(100),
    post_author_id       INT,
    post_author_username VARCHAR(20),
    post_status          NUMERIC(1, 0),
    CHECK (post_status in (0, 1, 2)),
    post_product_price   NUMERIC(15, 0),
    post_product_status  NUMERIC(1, 0),
    CHECK (post_product_status in (0, 1)),
    PRIMARY KEY (post_id),
    FOREIGN KEY (post_author_id) REFERENCES User (user_id)
        ON DELETE CASCADE,
    FOREIGN KEY (post_author_username) REFERENCES User (username)
        ON DELETE CASCADE
);

CREATE TABLE Image
(
    image_owner_id INT,
    image_url      VARCHAR(100),
    image_alt_text VARCHAR(100),
    post_id        INT,
    PRIMARY KEY (image_owner_id, image_url),
    FOREIGN KEY (image_owner_id) REFERENCES User (user_id)
        ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES Post (post_id)
        ON DELETE CASCADE
);

CREATE TABLE Message
(
    sender_id   INT,
    receiver_id INT,
    post_id     INT,
    send_time   TIMESTAMP,
    msg         VARCHAR(256),
    PRIMARY KEY (sender_id, receiver_id, send_time, msg),
    FOREIGN KEY (post_id) REFERENCES Post (post_id)
        ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES User (user_id)
        ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES User (user_id)
        ON DELETE CASCADE
);

CREATE TABLE Address
(
    name    VARCHAR(15),
    phone   NUMERIC(15, 0),
    address VARCHAR(50),
    user_id INT,
    PRIMARY KEY (address, user_id),
    FOREIGN KEY (user_id) REFERENCES User (user_id)
        ON DELETE CASCADE
);

CREATE TABLE Deal
(
    deal_id        INT AUTO_INCREMENT,
    post_id        INT,
    seller_id      INT,
    buyer_id       INT,
    price          NUMERIC(15, 0),
    sender_address VARCHAR(50),
    buyer_address  VARCHAR(50),
    payment_status NUMERIC(1, 0),
    CHECK (payment_status in (0, 1)),
    package_status NUMERIC(1, 0),
    CHECK (package_status in (0, 1)),
    PRIMARY KEY (deal_id),
    FOREIGN KEY (seller_id) REFERENCES Address (user_id)
        ON DELETE CASCADE,
    FOREIGN KEY (buyer_id) REFERENCES Address (user_id)
        ON DELETE CASCADE,
    FOREIGN KEY (buyer_address) REFERENCES Address (address)
        ON DELETE CASCADE,
    FOREIGN KEY (sender_address) REFERENCES Address (address)
        ON DELETE CASCADE
);

CREATE TABLE Rate
(
    deal_id INT AUTO_INCREMENT,
    rate    NUMERIC(5, 0),
    comment VARCHAR(100),
    PRIMARY KEY (deal_id, rate, comment),
    FOREIGN KEY (deal_id) REFERENCES Deal (deal_id)
        ON DELETE CASCADE
);

CREATE TABLE Staff
(
    staff_id   INT AUTO_INCREMENT,
    staff_name VARCHAR(20),
    password   VARCHAR(15),
    PRIMARY KEY (staff_id)
);