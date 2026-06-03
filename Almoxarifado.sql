CREATE DATABASE almoxarifado;

USE almoxarifado;

CREATE TABLE estoque (
    id INT PRIMARY KEY AUTO_INCREMENT,
    responsavel VARCHAR(100),
    nome VARCHAR(255),
    qtde INT,
    imagem VARCHAR(255)
);
        
SELECT * FROM estoque;

INSERT INTO estoque (responsavel, nome, qtde, imagem)
VALUES ("Róger", "Chave Fenda", 12, "/static/chave_fenda.jpg");
INSERT INTO estoque (responsavel, nome, qtde, imagem)
VALUES ("Viviane", "Alicate", 8, "/static/alicate.jpg");

TRUNCATE TABLE estoque;