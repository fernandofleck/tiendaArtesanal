//Seteo del entorno del archivo para crear la ruta
const express = require("express");
const router = express.Router();
const path = require("path");

//Requerimiento de controlador
const controllersUsers = require(path.resolve(__dirname, "..", "controllers", "controllersUsers.js"));

//Creación de las rutas
router.get("/login", controllersUsers.login);
router.get("/register", controllersUsers.register);

//Exportamos el módulo
module.exports = router;