 DROP TABLE IF EXISTS profile;
 CREATE TABLE profile (id INT, nickname VARCHAR(256), PRIMARY KEY(id));

 INSERT INTO profile (id, nickname) VALUES (0, 'Larry');
 INSERT INTO profile (id, nickname) VALUES (1, 'Josh');
 INSERT INTO profile (id, nickname) VALUES (2, 'Stephon');