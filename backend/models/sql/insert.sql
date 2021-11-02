Delete from Rate;
Delete from Deal;
Delete from Address;
Delete from Message;
Delete from Image;
Delete from Post;
Delete from User;
Delete from Staff;

ALTER TABLE User AUTO_INCREMENT = 0;
ALTER TABLE Post AUTO_INCREMENT = 101;
ALTER TABLE Deal AUTO_INCREMENT = 201;
ALTER TABLE Staff AUTO_INCREMENT = 301;

Insert into User values(NULL,"Tom","I'm Tom","e27ef5ef5ff1d3d09225887f5e2a0b07","hl3794+tom@nyu.edu",""); -- pwd 001
Insert into User values(NULL,"Jerry","I'm Jerry","b2a69d348c40484aa9663bbcf2e07a3d","hl3794+jerrymouse@nyu.edu","");-- pwd 002
Insert into User values(NULL,"Pigeon","I'm Pigeon","58aa87d89b40374f7292dd92f344f699","hl3794+bird@nyu.edu","");-- pwd 003
Insert into User values(NULL,"John","I'm John","8f2edca886227b39431b3b3ff662935f","hl3794+johnsmith@nyu.edu","");-- pwd 004

Insert into Post values(NULL,"I am a cat, and I highly recommend this catfood brand", 1, "Tom", 1, 50, 1);
Insert into Post values(NULL,"I am a mouse, and I highly recommend this cheese brand", 2, "Jerry", 1, 25, 1);
Insert into Post values(NULL,"*Trying to recommend you something in bird language*", 3, "Pigeon", 1, 100, 1);
Insert into Post values(NULL,"I am John Smith", 4, "John", 1, 200, 1);

Insert into Image values(1,"abc","mmmmmm",101);
Insert into Image values(2,"def","nnnnnn",102);
Insert into Image values(3,"ghi","oooooo",103);
Insert into Image values(4,"jkl","pppppp",104);

Insert into Message values(1,2,102,'2021-08-15 09:00:30',"I'm interested with you-I mean, your cheese. Looking forward to hearing from you!");
Insert into Message values(2,3,103,'2021-08-01 09:00:30',"I can't understand a word you're talking about");
Insert into Message values(3,4,104,'2021-06-01 07:00:30',"*Pigeon's murmuring voice*");
Insert into Message values(4,1,101,'2021-06-03 08:00:30',"Are you really that Tom, from Tom and Jerry? I've been your fan since I was 4 years old!");

Insert into Address values("tom's address",1234567,"Pine's Road",1);
Insert into Address values("jer_address",142857,"Jerry's Home Sweet Home",2);
Insert into Address values("pigeon_address",31415926,"Pigeonland",3);
Insert into Address values("john's address",2718281828,"Piccadilly",4);

Insert into Deal values(NULL, 101, 1, 4, 50, "Pine's Road", "Piccadilly", 1, 1);
Insert into Deal values(NULL, 102, 2, 1, 25, "Jerry's Home Sweet Home", "Pine's Road", 0, 0);
Insert into Deal values(NULL, 103, 3, 2, 100, "Pigeonland", "Jerry's Home Sweet Home", 1, 0);
Insert into Deal values(NULL, 104, 4, 3, 200, "Piccadilly", "Pigeonland", 1, 1);

Insert into Rate values(201, 100, "The catfood is great! Topsy loves it!");
Insert into Rate values(202, 99, "The cheese is nice");
Insert into Rate values(203, 80, "Why is the package full of feathers?");
Insert into Rate values(204, 90, "*compliment with satisfication, in pigeon language*");

Insert into Staff values(NULL, "Roy", "I_Work_in_IT!");
Insert into Staff values(NULL, "Moss", "MadeInBritain");
Insert into Staff values(NULL, "Jen", "Internet_Things");