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
    avatar   VARCHAR(150),
    gender   INT,
    birthday DATE,
    CHECK (gender in (0, 1, NULL)),
    PRIMARY KEY (user_id),
    INDEX (username)
);

CREATE TABLE Post
(
    post_id              INT AUTO_INCREMENT,
    post_content         VARCHAR(100),
    post_author_id       INT,
    post_author_username VARCHAR(20),
    post_status          INT,
    CHECK (post_status in (0, 1, 2)),
    post_product_price   NUMERIC(15, 2),
    post_product_status  INT,
    CHECK (post_product_status in (0, 1)),
    PRIMARY KEY (post_id),
    FOREIGN KEY (post_author_id) REFERENCES User (user_id)
        ON DELETE CASCADE,
    FOREIGN KEY (post_author_username) REFERENCES User (username)
        ON DELETE CASCADE
);

CREATE TABLE Image
(
    img_id         INT AUTO_INCREMENT,
    image_owner_id INT,
    image_url      VARCHAR(150),
    image_alt_text VARCHAR(100),
    post_id        INT,
    PRIMARY KEY (img_id),
    FOREIGN KEY (image_owner_id, post_id) REFERENCES Post(post_author_id, post_id)
        ON DELETE CASCADE,
);

CREATE TABLE Message
(
    msg_id      INT AUTO_INCREMENT,
    sender_id   INT,
    receiver_id INT,
    post_id     INT,
    send_time   TIMESTAMP,
    msg         VARCHAR(256),
    PRIMARY KEY (msg_id),
    FOREIGN KEY (receiver_id,post_id) REFERENCES Post (post_author_id,post_id)
        ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES User (user_id)
        ON DELETE CASCADE,
);

CREATE TABLE Address
(
    name    VARCHAR(15),
    phone   VARCHAR(20),
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
    price          NUMERIC(15, 2),
    sender_address VARCHAR(50),
    buyer_address  VARCHAR(50),
    payment_status INT,
    CHECK (payment_status in (0, 1)),
    package_status INT,
    CHECK (package_status in (0, 1)),
    PRIMARY KEY (deal_id),
    FOREIGN KEY (seller_id, sender_address) REFERENCES Address (user_id, address)
        ON DELETE CASCADE,
    FOREIGN KEY (buyer_id, buyer_address) REFERENCES Address (user_id, address)
        ON DELETE CASCADE,
    FOREIGN KEY (seller_id, post_id) REFERENCES Post(post_author_id, post_id)
        ON DELETE CASCADE,
);

CREATE TABLE Rate
(
    rate_id INT AUTO_INCREMENT,
    deal_id INT,
    rate    INT,
    comment VARCHAR(512),
    PRIMARY KEY (rate_id),
    FOREIGN KEY (deal_id) REFERENCES Deal (deal_id)
        ON DELETE CASCADE
);

CREATE TABLE Staff
(
    staff_id   INT AUTO_INCREMENT,
    staff_name VARCHAR(20),
    bio        VARCHAR(100),
    password   VARCHAR(50),
    email      VARCHAR(50) UNIQUE,
    avatar     VARCHAR(150),
    gender     INT,
    birthday   DATE,
    CHECK (gender in (0, 1, NULL)),
    PRIMARY KEY (staff_id)
);

CREATE TABLE Admin
(
    password VARCHAR(50)
)