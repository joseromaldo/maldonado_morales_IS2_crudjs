CREATE DATABASE tienda;
CREATE TABLE cliente(
cliente_id SERIAL,
cliente_nombre VARCHAR (50),
cliente_apellido VARCHAR (50),
cliente_situacion SMALLINT,
PRIMARY KEY (cliente_id)
);