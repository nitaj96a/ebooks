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

INSERT INTO ebooks(title, author, publicationyear, filename, user_id, category_id, language_id) VALUES('Pro Git', 'Scott Chacon, Ben Straub', 2018, 'progit_v2.1.3.pdf', 1, 4, 1);
INSERT INTO ebooks(title, author, publicationyear, filename, user_id, category_id, language_id) VALUES('A First Course in Electrical and Computer Engineering', 'Louis Scharf', 2009, 'a-first-course-in-electrical-and-computer-engineering-2.3.pdf', 3, 1, 1);
