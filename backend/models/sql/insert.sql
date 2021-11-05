Insert into user values(NULL,"Tom","I'm Tom","e27ef5ef5ff1d3d09225887f5e2a0b07","hl3794+tom@nyu.edu","https://avatarfiles.alphacoders.com/838/thumb-1920-83876.jpg",0,'2001-05-18'); -- pwd 001
Insert into user values(NULL,"Jerry","I'm Jerry","b2a69d348c40484aa9663bbcf2e07a3d","hl3794+jerrymouse@nyu.edu","https://avatarfiles.alphacoders.com/838/thumb-1920-83876.jpg",0,'2001-05-08');-- pwd 002
Insert into user values(NULL,"Pigeon","I'm Pigeon","58aa87d89b40374f7292dd92f344f699","hl3794+bird@nyu.edu","https://avatarfiles.alphacoders.com/838/thumb-1920-83876.jpg",1,'2001-05-20');-- pwd 003
Insert into user values(NULL,"John","I'm John","8f2edca886227b39431b3b3ff662935f","hl3794+johnsmith@nyu.edu","https://avatarfiles.alphacoders.com/838/thumb-1920-83876.jpg",NULL,'2001-05-22');-- pwd 004

Insert into post values(NULL,"I am a cat, and I highly recommend this catfood brand", 1,  1, 50, 1);
Insert into post values(NULL,"I am a mouse, and I highly recommend this cheese brand", 2,  1, 25, 1);
Insert into post values(NULL,"*Trying to recommend you something in bird language*", 3,  1, 100, 1);
Insert into post values(NULL,"I am John Smith", 4,  1, 200, 1);

Insert into image values(NULL, 1,"https://www.meme-arsenal.com/memes/edd5044ccc889a3a93951130769bfc5e.jpg","Alt Text",1);
Insert into image values(NULL, 2,"https://pbs.twimg.com/media/EbxSrOUX0AMs3U3.jpg","Alt Text",2);
Insert into image values(NULL, 3,"https://i.pinimg.com/736x/34/23/98/34239816d1ec942aabbbe4da6f53f3fb.jpg","Alt Text",3);
Insert into image values(NULL, 4,"https://avatarfiles.alphacoders.com/226/thumb-22680.jpg","Alt Text",4);

Insert into message values(NULL, 1,1,1,'2021-08-15 09:00:30',"I'm interested with you-I mean, your cheese. Looking forward to hearing from you!");
Insert into message values(NULL, 2,2,3,'2021-08-01 09:00:30',"I can't understand a word you're talking about");
Insert into message values(NULL, 3,4,4,'2021-06-01 07:00:30',"*Pigeon's murmuring voice*");
Insert into message values(NULL, 4,1,1,'2021-06-03 08:00:30',"Are you really that Tom, from Tom and Jerry? I've been your fan since I was 4 years old!");

Insert into address values("tom's address",1234567,"Pine's Road",1);
Insert into address values("jer_address",142857,"Jerry's Home Sweet Home",2);
Insert into address values("pigeon_address",31415926,"Pigeonland",3);
Insert into address values("john's address",2718281828,"Piccadilly",4);

Insert into deal values(NULL, 1, 1, 4, 50, "Pine's Road", "Piccadilly", 1, 1);
Insert into deal values(NULL, 2, 2, 1, 25, "Jerry's Home Sweet Home", "Pine's Road", 0, 0);
Insert into deal values(NULL, 3, 3, 2, 100, "Pigeonland", "Jerry's Home Sweet Home", 1, 0);
Insert into deal values(NULL, 4, 4, 3, 200, "Piccadilly", "Pigeonland", 1, 1);

Insert into rate values(NULL, 3, 5, "The catfood is great! Topsy loves it!");
Insert into rate values(NULL, 3, 4, "The cheese is nice. Unfortunately it seems I'm a bit allergic to it.");
Insert into rate values(NULL, 2, 5, "Why is the package full of feathers?");
Insert into rate values(NULL, 4, 3, "*compliment with satisfication, in pigeon language*");

Insert into staff values(NULL, "Roy","I_Work_in_IT!", "e27ef5ef5ff1d3d09225887f5e2a0b07", "hl3794+staff1@nyu.edu", "https://pickaface.net/gallery/avatar/unr_tomcruise_170202_2128_r2nwsnv.png",1, "2003-05-28"); -- password 001
Insert into staff values(NULL, "Ben","I_Work_in_IT!", "e27ef5ef5ff1d3d09225887f5e2a0b07", "hl3794+staff2@nyu.edu", "https://pickaface.net/gallery/avatar/unr_tomcruise_170202_2128_r2nwsnv.png",1, "2003-05-22"); -- password 001
Insert into staff values(NULL, "Alice","I_Work_in_IT!", "e27ef5ef5ff1d3d09225887f5e2a0b07", "hl3794+staff3@nyu.edu", "https://pickaface.net/gallery/avatar/unr_tomcruise_170202_2128_r2nwsnv.png",0, "2003-05-25"); -- password 001
