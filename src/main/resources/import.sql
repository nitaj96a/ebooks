-- noinspection SqlNoDataSourceInspectionForFile

INSERT INTO users(firstname,lastname,username,password, usertype, enabled, last_password_reset_date) VALUES ('Satoshi','Nakamoto','sato$hi','$2a$10$URtJ7GsUZrDU2XEbI3AjpeZV/lynywiwcnH/QNA5hRQAEOg7fIQpK','admin', true, '2019-01-01 21:58:34.304-01');
INSERT INTO users(firstname,lastname,username,password, usertype, enabled, last_password_reset_date) VALUES ('Kaz','Hirai','kaz','$2a$10$URtJ7GsUZrDU2XEbI3AjpeZV/lynywiwcnH/QNA5hRQAEOg7fIQpK','regular', true, '2019-01-01 21:58:34.304-01');
INSERT INTO users(firstname,lastname,username,password, usertype, enabled, last_password_reset_date) VALUES ('Gavin', 'Andresen','gav','$2a$10$URtJ7GsUZrDU2XEbI3AjpeZV/lynywiwcnH/QNA5hRQAEOg7fIQpK', 'regular', true, '2019-01-01 21:58:34.304-01');
INSERT INTO users(firstname,lastname,username,password, usertype, enabled, last_password_reset_date) VALUES ('Pierre', 'Dubois','pier1','$2a$10$URtJ7GsUZrDU2XEbI3AjpeZV/lynywiwcnH/QNA5hRQAEOg7fIQpK', 'regular', true, '2019-01-01 21:58:34.304-01');
INSERT INTO users(firstname,lastname,username,password, usertype, enabled, last_password_reset_date) VALUES ('Klaus', 'Wagner','kwag','$2a$10$URtJ7GsUZrDU2XEbI3AjpeZV/lynywiwcnH/QNA5hRQAEOg7fIQpK', 'regular', true, '2019-01-01 21:58:34.304-01');

INSERT INTO AUTHORITY (id, name) VALUES (1, 'ROLE_USER');
INSERT INTO AUTHORITY (id, name) VALUES (2, 'ROLE_ADMIN');

INSERT INTO USER_AUTHORITY (user_id, authority_id) VALUES (1, 1);
INSERT INTO USER_AUTHORITY (user_id, authority_id) VALUES (1, 2);
INSERT INTO USER_AUTHORITY (user_id, authority_id) VALUES (2, 2);
INSERT INTO USER_AUTHORITY (user_id, authority_id) VALUES (3, 2);
INSERT INTO USER_AUTHORITY (user_id, authority_id) VALUES (4, 2);
INSERT INTO USER_AUTHORITY (user_id, authority_id) VALUES (5, 2);

INSERT INTO languages(name) VALUES ('English');
INSERT INTO languages(name) VALUES ('Serbian');
INSERT INTO languages(name) VALUES ('French');
INSERT INTO languages(name) VALUES ('German');

INSERT INTO categories(name) VALUES('Engineering');
INSERT INTO categories(name) VALUES('Science-Fiction');
INSERT INTO categories(name) VALUES('Programming');
INSERT INTO categories(name) VALUES('Fiction');
INSERT INTO categories(name) VALUES('History');
INSERT INTO categories(name) VALUES('For Kids');
INSERT INTO categories(name) VALUES('Philosophy');

INSERT INTO ebooks(title, author, publicationyear, keywords, filename, mime, thumbnailpath, user_id, category_id, language_id) VALUES('Pro Git', 'Scott Chacon, Ben Straub', 2018,'Git, Version control, Workflow' ,'progit_v2.1.3.pdf','application/pdf','progit2.png',1, 3, 1);
INSERT INTO ebooks(title, author, publicationyear, keywords,filename, mime,thumbnailpath, user_id, category_id, language_id) VALUES('A First Course in Electrical and Computer Engineering', 'Louis Scharf', 2009, 'Complex numbers, Phasors, Linear Algebra, Vector graphics, Filtering','a-first-course-in-electrical-and-computer-engineering-2.3.pdf', 'application/pdf','a-first-course-in-electrical-and-computer-engineering.jpg',3, 1, 1);
INSERT INTO ebooks(title, author, publicationyear, keywords,filename, mime,thumbnailpath, user_id, category_id, language_id) VALUES('Erewhon', 'Samuel Butler', 1872, 'Machines, Evolution, AI, Utopia','erewhon.txt', 'text/plain;charset=utf-8','Erewhon_Cover.jpg',2, 2, 1);
INSERT INTO ebooks(title, author, publicationyear, keywords,filename, mime,thumbnailpath, user_id, category_id, language_id) VALUES('The Island of Doctor Moreau', 'H. G. Wells', 1896, 'Mad Scientist, Shipwrecked, Genetic Engineering','islandofdoctormoreau.txt', 'text/plain;charset=utf-8','IslandOfDrMoreau.jpg',3, 2, 1);
INSERT INTO ebooks(title, author, publicationyear, keywords,filename, mime,thumbnailpath, user_id, category_id, language_id) VALUES('An Introduction to Information Retrieval', 'Christopher D. Manning, Prabhakar Raghavan, Hinrich Schutze', 2009, 'IR, Index, Relevance Feedback, Text Classification, Clustering','irbook.pdf', 'application/pdf','iir.jpg',3, 3, 1);
--INSERT INTO ebooks(title, author, publicationyear, keywords,filename, mime,thumbnailpath, user_id, category_id, language_id) VALUES('On the Origin of Clockwork and the Compass', 'Derek J. de Solla Price', 2009, 'IR, Index, Relevance Feedback, Text Classification, Clustering','originofcpmdc.txt', 'text/plain;charset=utf-8','originofcpmdc.jpg',1, 1, 1);
INSERT INTO ebooks(title, author, publicationyear, keywords,filename, mime,thumbnailpath, user_id, category_id, language_id) VALUES('Dracula', 'Bram Stoker', 1897, 'Vampire, Van Helsing','dracula.txt', 'text/plain;charset=utf-8','dracula.jpg',3, 4, 1);
--INSERT INTO ebooks(title, author, publicationyear, keywords,filename, mime,thumbnailpath, user_id, category_id, language_id) VALUES('The Illiad', 'Homer', -1100, 'Trojan War, Greece, Achilles, Agamemnon','illiad.txt', 'text/plain;charset=utf-8','ILLIAS.gif',1, 5, 1);



INSERT INTO ebooks(title, author, publicationyear, keywords,filename, mime,thumbnailpath, user_id, category_id, language_id) VALUES('La comédie humaine volume I', 'Honoré de Balzac', 1830, '','la comedie humane.txt', 'text/plain;charset=utf-8','la comedie humaine.jfif',4, 4, 2);
INSERT INTO ebooks(title, author, publicationyear, keywords,filename, mime,thumbnailpath, user_id, category_id, language_id) VALUES('Les quatre livres de philosophie morale et politique', 'Confucius et Mencius', -553, 'to be indexed','Les quatre livres de philosophie morale et politique.txt', 'text/plain;charset=utf-8','Les quatre livres de philosophie morale et politique.jpg',4, 5, 2);
INSERT INTO ebooks(title, author, publicationyear, keywords,filename, mime,thumbnailpath, user_id, category_id, language_id) VALUES('Le Cardinal de Richelieu', 'Hyacinthe Corne', 1856, 'to be indexed','cardinal.txt', 'text/plain;charset=utf-8','cardinal.jpg',4, 5, 2);
INSERT INTO ebooks(title, author, publicationyear, keywords,filename, mime,thumbnailpath, user_id, category_id, language_id) VALUES('Jacques le fataliste et son maître', 'Denis Diderot', 1796, 'to be indexed','jacques.txt', 'text/plain;charset=utf-8','jacques.jpeg',4, 4, 2);

INSERT INTO ebooks(title, author, publicationyear, keywords,filename, mime,thumbnailpath, user_id, category_id, language_id) VALUES('Märchen für Kinder', 'Hans Christian Andersen', 2006, 'to be indexed','kinder.txt', 'text/plain;charset=utf-8','kinder.jpg',5, 6, 3);
INSERT INTO ebooks(title, author, publicationyear, keywords,filename, mime,thumbnailpath, user_id, category_id, language_id) VALUES('Kritik der reinen Vernunft', 'Immanuel Kant', 1781, 'to be indexed','kritik der reinen Vernunft.txt', 'text/plain;charset=utf-8','kritik der reinen Vernunft.jpg',5, 7, 3);
INSERT INTO ebooks(title, author, publicationyear, keywords,filename, mime,thumbnailpath, user_id, category_id, language_id) VALUES('Zwischen Himmel und Erde', 'Otto Ludwig', 1855, 'to be indexed','himmelunderde.txt', 'text/plain;charset=utf-8','himmelunderde.jpg',5, 4, 3);










