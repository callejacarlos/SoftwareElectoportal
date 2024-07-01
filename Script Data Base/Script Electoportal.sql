CREATE DATABASE electoportal;

USE electoportal;

CREATE TABLE Administradores(
	Cedula INT NOT NULL,
    Nombre VARCHAR(40) NOT NULL,
    Apellido VARCHAR(40) NOT NULL,
    Telefono VARCHAR(11) NOT NULL,
    Correo VARCHAR(40) NOT NULL,
	Contrasena VARCHAR(30) NOT NULL,
    PRIMARY KEY (Cedula)
);
-- Insertamos un administrador
INSERT INTO Administradores(Cedula, Nombre, Apellido, Telefono, Correo, Contrasena) VALUES (1003251, 'Carlos', 'Calleja', '3102323211', 'carlos@gmail.com', 'carlos12345');
-- Select
SELECT * FROM Administradores;

CREATE TABLE Digitadores(
	Cedula INT NOT NULL,
    Nombre VARCHAR(40) NOT NULL,
    Apellido VARCHAR(40) NOT NULL,
    Telefono VARCHAR(11) NOT NULL,
    Correo VARCHAR(40) NOT NULL,
    Contrasena VARCHAR (30) NOT NULL,
    PRIMARY KEY (Cedula),
    id_administrador INT,
    FOREIGN KEY (id_administrador) REFERENCES Administradores(Cedula)
);

-- INSERTAR DIGITADORES
INSERT INTO Digitadores (Cedula, Nombre, Apellido, Telefono, Correo, Contrasena, id_administrador) VALUES
 (1003252, 'Fabian', 'Perez', '3135433344', 'fabian@gmail.com', 'fabian12345', 1003251);

CREATE TABLE Callcenter(
	Cedula INT NOT NULL,
    Nombre VARCHAR(40) NOT NULL,
    Apellido VARCHAR(40) NOT NULL,
    Telefono VARCHAR(11) NOT NULL,
    Correo VARCHAR(40) NOT NULL,
    Contrasena VARCHAR(30) NOT NULL,
    PRIMARY KEY(Cedula),
    id_administrador INT,
    FOREIGN KEY (id_administrador) REFERENCES Administradores(Cedula)
);

INSERT INTO Callcenter(Cedula, Nombre, Apellido, Telefono, Correo, Contrasena, id_administrador) VALUES
 (1003253, 'Juliana', 'Torres', '3103334567','juliana@gmail.com', 'juliana12345', 1003251);

CREATE TABLE Lideres(
	Cedula INT NOT NULL,
    Nombre VARCHAR(40) NOT NULL,
    Apellido VARCHAR(40) NOT NULL,
    Telefono VARCHAR(11) NOT NULL,
    Correo VARCHAR(40) NOT NULL,
    PRIMARY KEY(Cedula),
    Id_barrio INT,
    Id_mesa_votacion INT,
    Id_puesto_votacion INT,
    Id_digitadores INT,
    FOREIGN KEY (Id_barrio) REFERENCES Barrios(Id_barrio),
    FOREIGN KEY (Id_mesa_votacion) REFERENCES Mesa_votacion(Id_mesa_votacion),
    FOREIGN KEY (Id_puesto_votacion) REFERENCES Puesto_votacion(Id_puesto_votacion), 
    FOREIGN KEY (Id_digitadores) REFERENCES Digitadores(Cedula)
);
-- INSERTAR LIDERES 
INSERT INTO Lideres (Cedula, Nombre, Apellido, Telefono, Correo, Id_barrio, Id_mesa_votacion, Id_puesto_votacion, Id_digitadores) VALUES
(1003255, 'Julian', 'Santos', '3125556789', 'julian@gmail.com', 1, 1, 1, 1003252);


CREATE TABLE Votantes(
	Cedula INT NOT NULL,
    Nombre VARCHAR(40) NOT NULL,
    Apellido VARCHAR(40) NOT NULL,
    Telefono VARCHAR(11) NOT NULL,
    Correo VARCHAR(40) NOT NULL,
    PRIMARY KEY (Cedula),
    Id_barrio INT,
    Id_mesa_votacion INT,
    Id_puesto_votacion INT,
    Id_digitadores INT,
    FOREIGN KEY (Id_barrio) REFERENCES Barrios(Id_barrio),
    FOREIGN KEY (Id_mesa_votacion) REFERENCES Mesa_votacion(Id_mesa_votacion),
    FOREIGN KEY (Id_puesto_votacion) REFERENCES Puesto_votacion(Id_puesto_votacion),
    FOREIGN KEY (Id_digitadores) REFERENCES Digitadores(Cedula)
);
-- INSERTANDO VOTANTES
INSERT INTO Votantes (Cedula, Nombre, Apellido, Telefono, Correo, Id_barrio, Id_mesa_votacion, Id_puesto_votacion, Id_digitadores) VALUES
(1003256, 'Joseph', 'Amaya', '3112349867', 'joseph@gmail.com', 1, 1, 1, 1003252),
(1003257, 'Victor', 'Torres', '3126543223', 'joseph@gmail.com', 2, 2, 2, 1003252),
(1003258, 'Camilo', 'Acuña', '3229876655', 'camilo@gmail.com', 3, 3, 3, 1003252),
(1003259, 'Maria', 'Perez', '3154443323', 'maria@gmail.com', 2, 4, 2, 1003252);


CREATE TABLE Mesa_votacion(
	Id_mesa_votacion INT NOT NULL AUTO_INCREMENT,
    numero INT NOT NULL,
    PRIMARY KEY(Id_mesa_votacion)
);

-- INGRESAMOS DATOS A MESAS DE VOTACION
INSERT INTO Mesa_votacion (numero) VALUES 
(10),
(11),
(12),
(13),
(14),
(15),
(16),
(17);


CREATE TABLE Puesto_votacion(
	Id_puesto_votacion INT NOT NULL AUTO_INCREMENT,
    sede VARCHAR(40) NOT NULL,
    PRIMARY KEY(Id_puesto_votacion)
);

-- INGRESAMOS DATOS A PUESTOS DE VOTACION
INSERT INTO Puesto_votacion (sede) VALUES 
('Norte'),
('Centro'),
('Sur');


CREATE TABLE Barrios(
	Id_barrio INT NOT NULL AUTO_INCREMENT,
    Nombre_barrio VARCHAR(40) NOT NULL,
    comuna  VARCHAR(40) NOT NULL,
    PRIMARY KEY(Id_barrio)
);

-- INGRESAMOS DATOS A BARRIOS
INSERT INTO Barrios(Nombre_barrio, comuna) VALUES
('Mayales','comuna 12'),
('Guatapuri', 'comuna 13'),
('Centro','comuna 10');




-- -------------CONSULTAS----------------

-- MUESTRA TODOS LOS DATOaS DE LOS DIGITADORES Y EL ADMINISTRADOR ASOCIADO
SELECT D.Cedula, D.Nombre, D.Apellido, D.Telefono, D.Correo, D.Contrasena, A.Nombre FROM Digitadores D
INNER JOIN Administradores A
ON D.id_administrador = A.Cedula;

-- MUESTRA TODOS LOS DATOS DE LOS CALLCENTER Y EL ADMINISTRADOR ASOCIADO
SELECT C.Cedula, C.Nombre, C.Apellido, C.Telefono, C.Correo, C.Contrasena, A.Nombre FROM Callcenter C
INNER JOIN Administradores A
ON C.id_administrador = A.Cedula;


-- MUESTRA TODOS LOS LIDERES 
SELECT L.Cedula, L.Nombre AS NombreLideres, L.Apellido, L.Telefono, L.Correo, D.Nombre AS NombreDigitador FROM Lideres L
INNER JOIN Digitadores D
ON D.cedula = L.Id_digitadores;


-- MUESTRA TODOS LOS VOTANTES
SELECT V.Cedula, V.Nombre AS NombreVotantes, V.Apellido, V.Telefono, V.Correo, 
	B.Nombre_barrio AS NombreBarrio, M.Numero AS NumeroMesa, P.Id_puesto_votacion AS PuestoVotacion, D.Nombre AS NombreDigitador FROM Votantes V
INNER JOIN Barrios B
ON B.Id_barrio = V.Id_barrio 
INNER JOIN Mesa_votacion M
ON M.Id_mesa_votacion = V.Id_mesa_votacion
INNER JOIN Puesto_votacion P
ON P.Id_puesto_votacion = V.Id_puesto_votacion
INNER JOIN Digitadores D
ON D.cedula = V.Id_digitadores;


-- MUESTRA LAS MESAS DE VOTACION 
SELECT Numero FROM Mesa_votacion;

-- MUESTRA LOS PUESTOS DE VOTACION
SELECT Sede FROM Puesto_votacion;

-- MUESTRA LOS BARRIOS
SELECT Nombre_barrio FROM Barrios;



