INSERT INTO users(firstname,lastname,username,password, usertype) VALUES ('Satoshi','Nakamoto','sato$hi','sifra1','admin');
INSERT INTO users(firstname,lastname,username,password, usertype) VALUES ('Kaz','Hirai','kaz','sifra1','regular');
INSERT INTO users(firstname,lastname,username,password, usertype) VALUES ('Gavin', 'Andresen','gav','sifra1', 'regular');

INSERT INTO languages(name) VALUES ('English');
INSERT INTO languages(name) VALUES ('French');
INSERT INTO languages(name) VALUES ('Serbian');
INSERT INTO languages(name) VALUES ('Japanese');
INSERT INTO languages(name) VALUES ('Russian');

INSERT INTO categories(name) VALUES('Engineering');
INSERT INTO categories(name) VALUES('Fiction');
INSERT INTO categories(name) VALUES('Non-fiction');
INSERT INTO categories(name) VALUES('Programming');

INSERT INTO ebooks(title, author, publicationyear, keywords, filename, thumbnailpath, user_id, category_id, language_id) VALUES('Pro Git', 'Scott Chacon, Ben Straub', 2018,'Git, Version control, Workflow' ,'progit_v2.1.3.pdf','progit2.png',1, 4, 1);
INSERT INTO ebooks(title, author, publicationyear, keywords,filename, thumbnailpath, user_id, category_id, language_id) VALUES('A First Course in Electrical and Computer Engineering', 'Louis Scharf', 2009, 'Complex numbers, Phasors, Linear Algebra, Vector graphics, Filtering','a-first-course-in-electrical-and-computer-engineering-2.3.pdf', 'a-first-course-in-electrical-and-computer-engineering.jpg',3, 1, 1);


