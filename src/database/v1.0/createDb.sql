
mysql -u root -p Pwd@12345

create database address default character set utf8 collate utf8_general_ci;

CREATE USER 'address'@'%' IDENTIFIED BY '52oracle';

GRANT ALL ON address.* TO 'address'@'%';

mysql -u address -p 52oracle