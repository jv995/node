CREATE DATABASE basedato_links;

USE dasedato_links;

--USERS TABLE
CREATE TABLE user(
    id INT(11) NOT NULL,
    usernombre VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE `user`
    ADD PRIMARY KEY (id);

 ALTER TABLE `basedato_links`.`users`
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;

--LINKS TABLE
CREATE TABLE links(
    id INT(11) NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    descripcion TEXT,
    user_id INT(11),
    creado_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE links
 ADD PRIMARY KEY (id);

 ALTER TABLE links
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

  DESCRIBE links;