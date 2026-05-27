CREATE DATABASE almoxarifado;

USE almoxarifado;

CREATE TABLE estoque (
		id INT PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR(255),
        qtde INT
        );
        
SELECT * FROM estoque;

INSERT INTO estoque (id, nome, qtde)
VALUES (3, "chave fenda", 12);
INSERT INTO estoque (id, nome, qtde)
VALUES (4, "alicate", 8);
        