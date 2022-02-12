//Seteo del entorno del archivo para crear la ruta
const express = require("express");
const router = express.Router();
const path = require("path");

//Requerimiento de controlador
const controllersIndex = require(path.resolve(__dirname, "..", "controllers", "controllersIndex.js"));

//Creación de las rutas
router.get("/", controllersIndex.index);

//Exportamos el módulo
module.exports = router;