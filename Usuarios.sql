USE almoxarifado;

CREATE TABLE IF NOT EXISTS usuarios (
    id      INT PRIMARY KEY AUTO_INCREMENT,
    nome    VARCHAR(100) NOT NULL,
    email   VARCHAR(255) NOT NULL UNIQUE,
    senha   VARCHAR(255) NOT NULL,
    perfil  VARCHAR(20) NOT NULL DEFAULT 'usuario'
);

INSERT INTO usuarios (nome, email, senha, perfil)
VALUES ('Administrador', 'admin@admin.com', 'admin123', 'admin');