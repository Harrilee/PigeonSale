DROP DATABASE pigeon_sale;
CREATE DATABASE pigeon_sale;
use pigeon_sale;

CREATE TABLE user
(
    user_id  INT AUTO_INCREMENT,
    username VARCHAR(20),
    bio      VARCHAR(100),
    password VARCHAR(50),
    email    VARCHAR(50) UNIQUE,
    avatar   VARCHAR(150),
    gender   INT,
    birthday DATE,
    CHECK (gender in (0, 1, NULL)),
    PRIMARY KEY (user_id),
    INDEX (username)
);

CREATE TABLE post
(
    post_id                INT AUTO_INCREMENT,
    post_title             VARCHAR(25),
    post_content           VARCHAR(1000),
    post_author_id         INT,
    post_status            INT,
    CHECK (post_status in (0, 1, 2)),
    post_product_price     NUMERIC(15, 2),
    post_product_status    INT,
    CHECK (post_product_status in (0, 1)),
    post_creation_time     DATETIME,
    post_modification_time DATETIME,
    PRIMARY KEY (post_id),
    FOREIGN KEY (post_author_id) REFERENCES user (user_id)
        ON DELETE CASCADE
);

CREATE TABLE image
(
    img_id         INT AUTO_INCREMENT,
    image_owner_id INT,
    image_url      VARCHAR(150),
    image_alt_text VARCHAR(100),
    post_id        INT,
    PRIMARY KEY (img_id),
    FOREIGN KEY (image_owner_id) REFERENCES user (user_id)
        ON DELETE CASCADE
);

CREATE TABLE message
(
    msg_id      INT AUTO_INCREMENT,
    sender_id   INT,
    receiver_id INT,
    post_id     INT,
    send_time   TIMESTAMP,
    msg         VARCHAR(256),
    PRIMARY KEY (msg_id),
    FOREIGN KEY (receiver_id) REFERENCES post (post_author_id)
        ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES user (user_id)
        ON DELETE CASCADE
);

CREATE TABLE address
(
    address_id INT AUTO_INCREMENT,
    name       VARCHAR(15),
    phone      VARCHAR(20),
    address    VARCHAR(50),
    user_id    INT,
    PRIMARY KEY (address_id),
    FOREIGN KEY (user_id) REFERENCES user (user_id)
        ON DELETE CASCADE
);

CREATE TABLE deal
(
    deal_id        INT AUTO_INCREMENT,
    post_id        INT,
    seller_id      INT,
    buyer_id       INT,
    price          NUMERIC(15, 2),
    buyer_address  VARCHAR(50),
    buyer_phone    VARCHAR(20),
    buyer_name     VARCHAR(15),
    payment_status INT,
    CHECK (payment_status in (0, 1)),
    package_status INT,
    CHECK (package_status in (0, 1, 2)),
    express_number VARCHAR(20),
    create_time    DATETIME,
    send_time      DATETIME,
    cancel_time    DATETIME,
    finish_time    DATETIME,
    cancelled      BOOLEAN,
    cancel_reason  VARCHAR(50),
    cancel_role    VARCHAR(10),
    CHECK (cancel_role IN ("buyer", "seller", "staff")),
    PRIMARY KEY (deal_id),
    FOREIGN KEY (seller_id, post_id) REFERENCES post (post_author_id, post_id)
        ON DELETE CASCADE
);

CREATE TABLE rate
(
    rate_id INT AUTO_INCREMENT,
    deal_id INT,
    rate    INT,
    comment VARCHAR(512),
    PRIMARY KEY (rate_id),
    FOREIGN KEY (deal_id) REFERENCES deal (deal_id)
        ON DELETE CASCADE
);

CREATE TABLE staff
(
    user_id  INT AUTO_INCREMENT,
    username VARCHAR(20),
    bio      VARCHAR(100),
    password VARCHAR(50),
    email    VARCHAR(50) UNIQUE,
    avatar   VARCHAR(150),
    gender   INT,
    birthday DATE,
    CHECK (gender in (0, 1, NULL)),
    PRIMARY KEY (user_id),
    INDEX (username)
);

CREATE TABLE admin
(
    password VARCHAR(50)
)