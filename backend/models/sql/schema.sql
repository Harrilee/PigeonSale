create table User
	(user_id		numeric(15,0),
	 username		varchar(20),
	 bio		varchar(15),
     password varchar(15),
	 primary key (user_id)
	);

create table Post
	(post_id		numeric(15,0),
	 post_content	varchar(100),
	 post_author_id		numeric(15,0),
     post_author_username		varchar(20),
     post_status		numeric(1,0),
     	check (post_status in (0, 1, 2)),
     post_product_price		numeric(15,0),
     post_product_status		numeric(1,0),
     	check (post_product_status in (0, 1)),
	 primary key (post_id),
	 foreign key (post_author_id) references User(user_id)
		on delete cascade,
     foreign key (post_author_username) references User(username)
		on delete cascade
	);

create table Image
	(image_owner_id		numeric(15,0),
	 image_url		varchar(100),
	 image_alt_text		varchar(100),
     post_id		numeric(15,0),
	 primary key (image_owner_id,image_url),
     foreign key (image_owner_id) references User(user_id)
		on delete cascade,
     foreign key (post_id) references Post(post_id)
		on delete cascade
	);

create table Message
	(sender_id		numeric(15,0),
	 receiver_id	numeric(15,0),
	 post_id		numeric(15,0),
     send_time		timestamp,
	 msg		varchar(100),
	 primary key (sender_id,receiver_id,send_time,msg),
	 foreign key (post_id) references Post(post_id)
		on delete cascade,
     foreign key (sender_id) references User(user_id)
		on delete cascade,
     foreign key (receiver_id) references User(user_id)
		on delete cascade
	);

create table Address
	(name		varchar(15),
	 phone		numeric(15,0),
	 address		varchar(50),
     uid		numeric(15,0),
	 user_id		numeric(15,0),
	 primary key (address,user_id),
     foreign key (user_id) references User(user_id)
		on delete cascade
	);

create table Deal
	(deal_id		numeric(15,0),
	 post_id		numeric(15,0),
	 seller_id		numeric(15,0),
     buyer_id		numeric(15,0),
     price		numeric(15,0),
	 sender_address		varchar(50),
     buyer_address		varchar(50),
     payment_status		numeric(1,0),
     	check (payment_status in (0, 1)),
     package_status		numeric(1,0),
     	check (package_status in (0, 1)),
	 primary key (deal_id),
     foreign key (seller_id) references Address(user_id)
		on delete cascade,
     foreign key (buyer_id) references Address(user_id)
		on delete cascade,
     foreign key (buyer_address) references Address(address)
		on delete cascade,
     foreign key (sender_address) references Address(address)
		on delete cascade
	);

create table Rate
	(deal_id		numeric(15,0),
	 rate		numeric(3,0),
	 comment		varchar(100),
	 primary key (deal_id,rate,comment),
     foreign key (deal_id) references Deal(deal_id)
		on delete cascade
	);

create table Staff
	(staff_id		numeric(15,0),
	 staff_name		varchar(20),
	 password		varchar(15),
	 primary key (staff_id)
	);